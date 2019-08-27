import React, { useEffect, useRef } from 'react'
// import clsx from 'clsx';
import { Redirect } from 'react-router-dom'
import Tenor from 'react-tenor'
import io from 'socket.io-client';
import { getSelectedGroup, getGroupMessages, getRooms, addMessage, createGeneral, addNewRoom, clearSelectedData, deleteRoom, leaveGroup, getEditInfo } from '../../Redux/groupReducer.js'
import { connect } from 'react-redux';
import moment from 'moment'
import './Group.css'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Toolbar from "@material-ui/core/Toolbar";
import SaveIcon from '@material-ui/icons/Save';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GifIcon from '@material-ui/icons/Gif';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'

const socket = io()

const useStyles = makeStyles(theme => ({
    root: {
        // margin: '20px 20px 10px 20px',
        height: '90vh'
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    groupTitle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: '10px'
    },
    currentRoom: {
        marginLeft: '15px'
    },
    avatar: {
        margin: 5,
        width: 55,
        height: 55,
        border: '1px solid rgba(189, 195, 199, 0.7)'
    },
    bigAvatar: {
        margin: 5,
        width: 65,
        height: 65
    },
    topicsWindow: {
        width: '20%',
        ['@media (max-width:768px)']: {
            width: '33%',
            display: 'none'
        },
        height: '82vh',
        borderRight: '1px solid rgba(0, 0, 0, 0.3)'
    },
    fab: {
        marginRight: '10px',
        marginTop: '7px'
    },
    chatWindow: {
        width: '100%',
        height: '76.5vh',
        // padding: '20px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse'
    },
    chatBox: {
        width: '90%',
        marginLeft: '15px',
        ['@media (max-width:1024px)']: {
            width: '84%',
            marginLeft: '5px'
        },
        ['@media (max-width:750px)']: {
            width: '70%',
            marginLeft: '5px'
        },
        ['@media (max-width:375px)']: {
            width: '68%',
            marginLeft: '5px'
        },
        paddingBottom: 5
    },
    button: {
        width: '10%',
        height: '40px'
    },
    textField: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        minHeight: '53px',
        ['@media (max-width:750px)']: {
            minHeight: '44px',
            maxHeight: '44px'
        },
    },
    message: {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        padding: '5px 10px',
        // borderTop: '1px solid grey',
        borderRadius: '5px',

    },
    messageContent: {
        marginLeft: '5px'
    },
    chip: {
        marginRight: '5px',
        backgroundColor: '#4d92e0',
        color: '#fff'
    },
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        },
        hr: {
            width: '60%',
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    }
}));


function Group(props) {
    //Our state
    const fileInput = useRef(null);
    const sendButton = useRef(null)

    const [textValue, changeTextValue] = React.useState('')
    const [currentRoom, changeCurrentRoom] = React.useState('general')
    const [editing, flipEdit] = React.useState(false)
    const [editMessage, handleEditMessage] = React.useState(false)
    const [newMessage, changeNewMessage] = React.useState('')
    const [editId, changeEditId] = React.useState(null)
    const [newRoom, changeNewRoom] = React.useState('')
    const [joined, setJoined] = React.useState(false)
    const [messages, setMessages] = React.useState([])
    const [currentGroup, changeCurrentGroup] = React.useState('')
    const [currentGroupId, changeCurrentGroupId] = React.useState(null)
    const [gifSearchToggled, toggleGifSearch] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    function fileUploadHandler(filename) {
        let { user } = props
        firebase.storage().ref('uploads').child(filename).getDownloadURL()
            .then(url => sendUpload(url))
    }
    function sendUpload(url) {
        changeTextValue(url)
        sendButton.current.click()

    }
    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function youtubeParser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (
            (match && match[7].length == 11) ?
                (<iframe width="400" height="250" src={`https://www.youtube.com/embed/${match[7]}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowFullScreen" ></iframe>) : null
        )
    }
    //Destructuring
    let { selectedGroup, groupMessages, rooms } = props.groups
    let { user } = props.user
    const classes = useStyles()
    console.log('selected group:', selectedGroup);


    useEffect(() => {

        if (selectedGroup && selectedGroup[0]) {
            let { group_id, group_name } = selectedGroup[0]
            props.getGroupMessages(+group_id)
            props.getRooms(+group_id)
            joinGroup(+group_id, group_name)
            console.log(moment().toISOString());
        }

    }, [selectedGroup[0]])

    useEffect(() => {
        if (selectedGroup && selectedGroup[0]) {
            let { group_id } = selectedGroup[0]
            props.getRooms(+group_id)
        }
    }, [rooms.length])

    useEffect(() => {

        socket.on('room joined', data => {
            joinSuccess(data)
        })
        socket.on('message dispatched', data => {
            console.log('data returned after new msg', data)
            updateMessages(data)
        })

    }, [])

    useEffect(() => {

        return () => {
            console.log('Group unmounted')
            props.clearSelectedData()
        }
    }, []);




    function joinSuccess(messages) {
        setJoined(true)
        setMessages(messages)
        console.log('Current Group Messages:', messages)
    }

    function updateMessages(messages) {

        setMessages(messages)
    }

    function sendMessage() {
        let { group_id } = selectedGroup[0]
        rooms.map(room => {
            if (room.room_name === currentRoom) {
                let roomId = +room.room_id
                var timeStamp = moment().toISOString();
                socket.emit('message sent', {
                    message: textValue,
                    roomId,
                    groupId: group_id,
                    userId: user.id,
                    timeStamp
                })
                changeTextValue('')
            }
        })
    }

    function enterMessage(e) {
        let { group_id } = selectedGroup[0]
        if (e.keyCode === 13) {
            rooms.map(room => {
                if (room.room_name === currentRoom) {
                    let roomId = +room.room_id
                    var timeStamp = moment().toISOString();
                    socket.emit('message sent', {
                        message: textValue,
                        roomId,
                        groupId: group_id,
                        userId: user.id,
                        timeStamp
                    })

                    changeTextValue('')
                }
            })
        }

    }
    function deleteMessage(messageId) {
        let { group_id } = selectedGroup[0]
        socket.emit('delete message', {
            messageId,
            groupId: group_id
        })
    }
    function setEditMsg(messageId) {
        handleEditMessage(!editMessage)
        changeEditId(messageId)
    }
    function saveMessageChanges(messageId) {
        let { group_id } = selectedGroup[0]
        handleEditMessage(!editMessage)
        if (newMessage !== '') {
            socket.emit('edit message', {
                messageId,
                newMessage,
                groupId: group_id
            })
        }
        changeNewMessage('')
        changeEditId(null)
    }
    function enterMessageChanges(e) {
        if (e.keyCode === 13) {
            let { group_id } = selectedGroup[0]
            handleEditMessage(!editMessage)
            if (newMessage !== '') {
                socket.emit('edit message', {
                    messageId: editId,
                    newMessage,
                    groupId: group_id
                })
            }
            changeNewMessage('')
            changeEditId(null)
        }
    }

    function menuRoomChange(roomName) {
        changeCurrentRoom(roomName)
        handleClose()
    }

    function removeRoom(roomId, groupId) {
        props.deleteRoom(roomId, groupId)
        changeCurrentRoom('general')
    }

    function joinGroup(groupId, groupName) {
        console.log('hit join group')
        socket.emit('join room', {
            group: groupId,
            groupName: groupName
        })
    }
    function handleGifSelect(result) {
        toggleGifSearch(!gifSearchToggled)
        changeTextValue(result)
        setTimeout(function () { sendButton.current.click() }, 300);
    }


    function addNewRoom(e) {
        let { group_id } = selectedGroup[0]
        if (e.keyCode === 13) {
            props.addNewRoom(newRoom, group_id)
            changeNewRoom('')
            flipEdit(!editing)
        }
    }

    if (selectedGroup && selectedGroup[0]) {
        let { group_name, group_picture, description, group_id, user_id } = selectedGroup[0]
        console.log('GROUP USER ID:', user_id, 'CURRENT USER ID:', user.id)
        return (
            <div className='Group'>
                {!user.loggedIn ? <Redirect to='/' /> : null}
                <Paper className={classes.root}>
                    <Paper style={{ borderBottom: '.5px solid rgba(189, 195, 199, 0.5)' }}>
                        <section className={classes.flex} style={{ padding: '10px', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar alt="Group Avatar" src={group_picture} className={classes.bigAvatar} />
                                <div className={classes.groupTitle}>
                                    <Typography variant='h5' component='h5'>
                                        {group_name}
                                    </Typography>
                                    <Typography component='p'>
                                        #{currentRoom}
                                    </Typography>
                                </div>
                            </div>
                            <div style={{ float: 'right' }}>
                                <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <a href='#/dashboard' onClick={() => props.leaveGroup(group_id)}><MenuItem>Leave Group</MenuItem></a>
                                    {user.id === user_id ? (<a href={"#/editgroup/" + group_id} onClick={() => props.getEditInfo(group_id)}><MenuItem>Edit Group</MenuItem></a>) : null}

                                    <Divider style={{ width: '100%' }} />
                                    {rooms.map(topic => {
                                        return (
                                            <div>
                                                {topic.room_name === currentRoom ? (<ListItem button style={{ backgroundColor: '#E8E8E8' }} key={topic.room_id} onClick={() => menuRoomChange(topic.room_name)}>
                                                    <ListItemText>#{topic.room_name}</ListItemText>
                                                </ListItem>) : (<ListItem button key={topic.room_id} onClick={() => menuRoomChange(topic.room_name)}>
                                                    <ListItemText>#{topic.room_name}</ListItemText>
                                                </ListItem>)}

                                            </div>
                                        )

                                    })}


                                </Menu>
                            </div>
                        </section>
                    </Paper>

                    <section className={classes.flex}>
                        <Paper className={classes.topicsWindow} >
                            <List>
                                {
                                    rooms.map(topic => {
                                        return (
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                                                {topic.room_name === currentRoom ? (<ListItem button style={{ backgroundColor: '#E8E8E8' }} key={topic.room_id} onClick={() => changeCurrentRoom(topic.room_name)}>
                                                    <ListItemText>#{topic.room_name}</ListItemText>
                                                    {user.id === user_id && topic.room_name !== 'general' ? (<IconButton aria-label='delete' fontSize='small' style={{ padding: '5px 5px' }} onClick={() => removeRoom(topic.room_id, topic.group_id)}><DeleteIcon /></IconButton>) : null}
                                                </ListItem>) : (<ListItem button key={topic.room_id} onClick={() => changeCurrentRoom(topic.room_name)} >
                                                    <ListItemText>#{topic.room_name}</ListItemText>
                                                    {user.id === user_id && topic.room_name !== 'general' ? (<IconButton aria-label='delete' fontSize='small' style={{ padding: '5px 5px' }} onClick={() => removeRoom(topic.room_id, topic.group_id)}><DeleteIcon /></IconButton>) : null}
                                                </ListItem>)}




                                            </div>
                                        )

                                    })
                                }
                                {user_id === user.id ? (
                                    <ListItem style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        < Fab color="primary" aria-label="add" size='small' className={classes.fab} onClick={() => flipEdit(!editing)}>
                                            {!editing ? (<AddIcon />) : (<ArrowBackIcon />)}
                                        </Fab>
                                        {!editing
                                            ? <ListItemText>
                                                <p style={{ fontSize: '13px' }}>Add a room!</p>
                                            </ListItemText>
                                            : <TextField
                                                id="standard-bare"
                                                className={classes.textField}
                                                style={{ width: '85%' }}
                                                placeholder='Enter room name..'
                                                margin="normal"
                                                inputProps={{ 'aria-label': 'bare' }}
                                                onChange={e => changeNewRoom(e.target.value)}
                                                onKeyDown={addNewRoom}
                                            />
                                        }
                                    </ListItem>) : null}
                            </List>
                        </Paper>
                        <div style={{ width: '100%', position: 'relative', height: '82vh' }}>
                            <section className={classes.chatWindow}>
                                {messages && messages.length ?

                                    messages.map(message => {
                                        if (message.room_name === currentRoom && message) {
                                            return (
                                                <div className={classes.message} key={message.message_id} >
                                                    <Paper style={{ display: 'flex', justifyContent: 'space-between', borderRadius: 0, background: '#f8f8f8' }}>
                                                        <section style={{ display: 'flex' }}>
                                                            <Avatar alt={message.username} src={message.profile_pic} className={classes.avatar} />
                                                            <Typography variant='p' style={{ display: 'flex', alignItems: 'center' }}>{message.username}</Typography>
                                                        </section>
                                                        {message.userid === user.id ?
                                                            (<div style={{ position: 'sticky', right: '0', marginRight: '10px', display: 'flex' }}>

                                                                {!editMessage ? (<IconButton aria-label='edit' fontSize='small' style={{ padding: '5px 5px' }} onClick={() => setEditMsg(message.message_id)}><EditIcon /></IconButton>) : (<IconButton aria-label='edit' fontSize='small' style={{ padding: '5px 5px' }} onClick={() => saveMessageChanges(message.message_id)}><SaveIcon /></IconButton>)}

                                                                <IconButton aria-label='delete' fontSize='small' style={{ padding: '5px 5px' }} onClick={() => deleteMessage(message.message_id)}><DeleteIcon /></IconButton>
                                                            </div>) : message.edited === true ? (<p style={{ display: 'flex', alignItems: 'center', marginRight: '5px', color: '#555962', fontSize: '12.5px' }}>(edited)</p>) : null}
                                                    </Paper>
                                                    <Paper style={{ display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'space-between', minHeight: 34, borderRadius: 0, borderBottomRightRadius: 4, borderBottomLeftRadius: 4, padding: '0px 7px', position: 'relative' }}>
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            {!editMessage && message.message.startsWith('https://media') ? (<div ><img className='chat-image' alt='' src={message.message} /></div>) : !editMessage && message.message.startsWith('https://www.youtube') ? (
                                                                <div className='yt-link'>
                                                                    {youtubeParser(message.message)}
                                                                </div>
                                                            ) : !editMessage && message.message.startsWith('http') ? (
                                                                <div ><img className='chat-image' alt='' src={message.message} /></div>
                                                            )
                                                                    : !editMessage && !message.message.startsWith('http') ?
                                                                        (<Typography variant='p' className={classes.messageContent}>
                                                                            {message.message}
                                                                        </Typography>) : editMessage && editId === message.message_id ? (<input
                                                                            style={{ width: '30vw' }}
                                                                            defaultValue={message.message}
                                                                            margin="normal"
                                                                            onChange={e => changeNewMessage(e.target.value)}
                                                                            onKeyDown={enterMessageChanges} />)
                                                                            : editMessage && message.message.startsWith('http') ? (<div ><img className='chat-image' alt='' src={message.message} /></div>) : (<Typography variant='p' className={classes.messageContent}>
                                                                                {message.message}
                                                                            </Typography>)}
                                                        </div>
                                                        <div style={{ position: 'absolute', bottom: 0, right: 0, padding: 10 }}>
                                                            <Typography variant='p' style={{ color: '#555962', fontSize: '12.5px', display: 'flex' }}>
                                                                {moment(message.timestamp).calendar()}
                                                            </Typography>
                                                        </div>
                                                    </Paper>
                                                </div>
                                            )
                                        } else return null
                                    }) : <Typography varient='p' style={{ marginBottom: '10px', marginLeft: '10px' }}>
                                        This chat is empty!
                                    </Typography>
                                }
                            </section>
                            <Paper className={classes.textField} style={{ borderTop: '0.5px solid rgba(189, 195, 199, 0.5)', borderRadius: 0, borderBottomRightRadius: 4, borderBottomLeftRadius: 4 }}>
                                {!gifSearchToggled ?
                                    (
                                        <TextField
                                            id="standard-name"
                                            label="Send a message!"
                                            className={(classes.chatBox)}
                                            margin="dense"
                                            variant="outlined"
                                            value={textValue}
                                            autoComplete='off'
                                            onChange={e => changeTextValue(e.target.value)}
                                            onKeyDown={enterMessage}
                                            style={{ maxHeight: '44px', padding: 0 }}
                                        />) : (<Tenor token="BH9EX9JC7WAE" onSelect={result => handleGifSelect(result.media[0].gif.url)} />)}
                                <div style={{ position: 'absolute', right: 0, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', maxHeight: '44px', marginRight: '10px' }}>
                                    <Button variant="contained" color="primary" ref={sendButton} className={classes.button}
                                        onClick={sendMessage}
                                    >
                                        Send
                                     <i style={{ marginLeft: '3px' }} className="fas fa-comment-medical" />
                                    </Button>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <label style={{ display: 'none' }} ref={fileInput}><FileUploader
                                            hidden='true'
                                            accept='image/*'
                                            name='fileSelected'
                                            storageRef={firebase.storage().ref('uploads')}
                                            onUploadSuccess={fileUploadHandler} />
                                        </label>
                                        <i className="fas fa-upload" style={{ color: 'darkslateblue' }} onClick={() => fileInput.current.click()} title='Upload' />
                                        <GifIcon onClick={() => toggleGifSearch(!gifSearchToggled)} title='Search GIFs' />

                                    </div>
                                </div>
                            </Paper>
                        </div>

                    </section>
                </Paper>
            </div >
        )
    } else return null
}

function mapStateToProps(state) {
    return {
        user: state.user,
        groups: state.groups
    }
}
export default connect(
    mapStateToProps,
    { getSelectedGroup, getGroupMessages, getRooms, addMessage, createGeneral, addNewRoom, clearSelectedData, deleteRoom, leaveGroup, getEditInfo }
)(Group);
