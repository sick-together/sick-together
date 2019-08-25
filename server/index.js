require('dotenv').config({ path: __dirname + '/../.env' })
const express = require('express')
const massive = require('massive')
const session = require('express-session')
//socket require
const socket = require('socket.io');
const ac = require('./controllers/authController')
const gc = require('./controllers/groupController')
const initSession = require('./middleware/initSession');
const authCheck = require('./middleware/authCheck');
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env


const app = express()

//used in the socket
const io = socket(app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`)))


app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('DB Connected')
})

app.use(initSession)



app.post('/api/login', ac.login)
app.post('/api/signup', ac.signup)
app.get('/api/user', authCheck, ac.getUser)
app.delete('/api/logout', ac.logout)

app.post('/api/creategroup', authCheck, gc.createGroup)
app.post('/api/creategeneral/:groupId', gc.createGeneral)
app.post('/api/createroom/:groupId', gc.createRoom)
app.get('/api/getgroups', gc.getGroups)
app.get('/api/searchgroups', gc.searchGroups)
app.get('/api/selected/:groupId', gc.getSelected)
app.get('/api/getgroupmessages/:groupId', gc.getGroupMessages)
app.get('/api/getrooms/:groupId', gc.getRooms)
app.post('/api/addmessage', gc.addMessage)
app.delete('/api/deletegroup/:group_id', authCheck, gc.deleteGroup)


io.on("connection", socket => {
    console.log("User Connected");

    socket.on('join room', async data => {
        let { group, groupName } = data
        const db = app.get('db');
        console.log("You just joined:", groupName);
        let messages = await db.get_messages(group);
        // console.log('messages', messages);
        socket.join(group);
        io.to(group).emit('room joined', messages);

    })
    //send messages
    socket.on('message sent', async data => {
        const { message, roomId, groupId, userId, timeStamp } = data;
        console.log(message, roomId, groupId, userId)
        const db = app.get('db');
        await db.add_message(message, groupId, roomId, userId, timeStamp)
        let messages = await db.get_messages(groupId);
        if (messages.length <= 1) io.to(groupId).emit('room joined', messages);
        // console.log('messages', messages);
        io.in(groupId).emit('message dispatched', messages);
    });

    socket.on('delete message', async data => {
        const {messageId, groupId} = data
        const db = app.get('db')
        await db.delete_message(messageId)
        let messages = await db.get_messages(groupId)
        io.in(groupId).emit('message dispatched', messages)
    })

    socket.on('edit message', async data => {
        const {messageId, newMessage, groupId} = data
        const db = app.get('db')
        await db.edit_message(messageId, newMessage)
        let messages = await db.get_messages(groupId)
        io.in(groupId).emit('message dispatched', messages)
    })

    //disconnected
    socket.on('disconnect', () => {
        console.log('Disconnected from room');
    });

})







