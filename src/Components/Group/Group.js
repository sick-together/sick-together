import React, { useEffect, useState } from 'react'
import { getSelectedGroup, getGroupMessages, getRooms, addMessage, createGeneral } from '../../Redux/groupReducer.js'
import { connect } from 'react-redux';
import './Group.css'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import io from 'socket.io-client';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(0, 0, 3, 0),
        margin: '20px',
        // height: '50vh'
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    groupTitle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    currentRoom: {
        marginLeft: '15px'
    },
    bigAvatar: {
        margin: 10,
        width: 55,
        height: 55,
    },
    topicsWindow: {
        width: '20%',
        height: '500px',
        borderRight: '1px solid grey'
    },
    fab: {
        marginLeft: '20px',
        marginTop: '7px'
    },
    chatWindow: {
        width: '100%',
        height: '450px',
        // padding: '20px',
        overflowY: 'auto'
    },
    chatBox: {
        width: '100%'
    },
    button: {
        width: '10%'
    },
    textField: {
        width: '90%',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        marginLeft: '25px'
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        padding: '15px 10px',
        borderTop: '1px solid grey',
        borderRadius: '5px'
    },
    messageContent: {
        marginLeft: '5px'
    },
    chip: {
        marginRight: '5px',
        backgroundColor: '#4d92e0',
        color: '#fff'
    }
}));



function Group(props) {
    let { selectedGroup, groupMessages, rooms } = props.groups
    const classes = useStyles()
    console.log('selected group:', selectedGroup);
    const [textValue, changeTextValue] = React.useState('')
    const [currentRoom, changeCurrentRoom] = React.useState('general')

    useEffect(() => {
        if (selectedGroup && selectedGroup[0]) {
            let { group_id } = selectedGroup[0]
            props.getGroupMessages(+group_id)
            props.getRooms(+group_id)
            if (!rooms.length) {
                props.createGeneral(group_id)
            }
        }
    }, [selectedGroup[0]])

    function insertMessage(newMessage, groupId, currentRoom) {
        rooms.map(room => {
            if (room.room_name === currentRoom) {
                let roomId = +room.room_id
                props.addMessage(newMessage, groupId, roomId)
                changeTextValue('')
            }
        })

    }


    if (selectedGroup && selectedGroup[0]) {
        let { group_name, group_picture, description, group_id } = selectedGroup[0]
        return (

            <div className='Group'>
                <Paper className={classes.root}>
                    <Paper>
                        <section className={classes.flex}>
                            <Avatar alt="Group Avatar" src={group_picture} className={classes.bigAvatar} />
                            <div className={classes.groupTitle}>
                                <Typography variant='h5' component='h5'>
                                    {group_name}
                                </Typography>
                                <Typography variant='p'>
                                    #{currentRoom}
                                </Typography>
                            </div>
                        </section>

                    </Paper>

                    <section className={classes.flex}>
                        <div className={classes.topicsWindow}>
                            <List>
                                {
                                    rooms.map(topic => (
                                        <ListItem button key={topic.room_id} onClick={() => changeCurrentRoom(topic.room_name)}>
                                            <ListItemText>#{topic.room_name}</ListItemText>
                                        </ListItem>
                                    ))
                                }
                                <Fab color="primary" aria-label="add" size='small' className={classes.fab}>
                                    <AddIcon />
                                </Fab>
                            </List>
                        </div>
                        <div style={{ width: '100%', position: 'relative', height: '500px' }}>
                            <section className={classes.chatWindow}>
                                {groupMessages && groupMessages.length ?
                                    groupMessages.map((message, index) => {
                                        if (message.room_name === currentRoom) {
                                            return (
                                                <div className={classes.message} key={index}>
                                                    <Chip label={message.username} avatar={<Avatar alt={message.username} src={message.profile_pic} />} className={classes.chip} />
                                                    <Typography varient='p' className={classes.messageContent}>
                                                        {message.message}
                                                    </Typography>
                                                </div>
                                            )
                                        } else return null
                                    }) : <Typography varient='p'>
                                        This chat is empty!
                                    </Typography>
                                }

                            </section>
                            <section className={classes.textField}>
                                <TextField
                                    id="standard-name"
                                    label="Send a message!"
                                    className={classes.chatBox}
                                    value={textValue}
                                    onChange={e => changeTextValue(e.target.value)}
                                    margin="normal"
                                />
                                <Button variant="contained" color="primary" className={classes.button} onClick={() => insertMessage(textValue, group_id, currentRoom)}>
                                    Send
                            <Icon className={classes.rightIcon}>send</Icon>
                                </Button>
                            </section>
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
    { getSelectedGroup, getGroupMessages, getRooms, addMessage, createGeneral }
)(Group);

