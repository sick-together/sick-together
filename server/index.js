require('dotenv').config({ path: __dirname + '/../.env' })
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const ac = require('./controllers/authController')
const gc = require('./controllers/groupController')
const initSession = require('./middleware/initSession');
const authCheck = require('./middleware/authCheck');
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env
//socket require
const socket = require('socket.io');
const app = express()

//used in the socket
const io= socket(app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`)))


app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}))

//allow joining a chat
io.on('join room', async data => {
    let { room } = data; 
    const db = app.get('db'); 
    console.log("You just joined ", room); 
    const [existingRoom] = await db.look_for_room(room); 
    console.log('exist', existingRoom); 
    if(!existingRoom) await db.create_room(room); 
    let messages = await db.get_messages(room); 
    console.log('messages', messages); 
    socket.join(room); 
    io.in(room).emit('room entered', messages); 
}); 

//send messages
io.on('send message', async data => {
    const { room, message, sender } = data; 
    console.log(room, message, sender); 
    const db = app.get('db'); 
    await db.send_message(room, message, sender)
    let messages = await db.get_messages(room); 
    if(messages.length <= 1) io.to(room).emit('room entered', messages); 
    console.log('messages', messages); 
    io.to(data.room).emit('message sent', messages); 
}); 

//disconnected
io.on('disconnect', () => {
    console.log('Disconnected from room'); 
}); 



massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('DB Connected')
})

app.use(initSession)



app.post('/api/login', ac.login)
app.post('/api/signup', ac.signup)
app.get('/api/user', authCheck, ac.getUser)
app.delete('/api/logout', ac.logout)

app.get('/api/getgroups', gc.getGroups)
app.get('/api/selected/:groupId', gc.getSelected)


app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))


