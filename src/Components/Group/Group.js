import React, { Component } from "react";
import { getSelectedGroup } from '../../Redux/groupReducer.js'
import { connect } from 'react-redux';
import io from 'socket.io-client';

class Group extends Component {
    state = {
            input: '', 
            messages: [], 
            room: '', 
            joined: false
        }; 


    componentDidMount() {
        this.socket = io(); 
        this.socket.on('room joined', data => {
            this.joinSuccess(data)
        })

        this.socket.on('message dispatched', data => {
            console.log(data)
            this.updateMessages(data); 
        })
    }

    componentWillUnmount() {
        this.socket.disconnect(); 
    }

    sendMessage() {
        this.socket.emit('message sent', {
            message: this.state.input, 
            room: this.state.room
        })
        this.setState({
            input: ''
        })
    }

    updateMessages(messages) {
        this.setState ({
            messages
        })
    }

    joinRoom() {
        if(this.state.room) {
            this.socket.emit('join room', {
                room: this.state.room
            })
        }
    }

    joinSuccess(messages) {
        this.setState({
            joined: true, 
            messages
        })
    }

    render() {
        let { selectedGroup } = this.props.groups
        console.log('selected group:', selectedGroup);
        if (selectedGroup && selectedGroup[0]) {
            let { group_name, group_picture, description } = selectedGroup[0]
        console.log(this.state.messages)
        return (
            <div className="App">
                <div>
                {group_name}
                <img src={group_picture} alt='Group' />
                {description}
            </div>

                {this.state.joined ?
                <h1> My Room: {this.state.room}</h1>
            : null}

            <div>
                {this.state.messages.map(messageObj => 
                    <h2 key={messageObj.id}>
                        {messageObj.message}
                    </h2>)}
            </div>
            {this.state.joined ?
            <div>
                <input value={this.state.input} onChange={e => {
                    this.setState({
                        input: e.target.value
                    })
                }}/>
                <button onClick={this.sendMessage}>Send</button>
                </div> 
                : 
                <div>
                    <input value={this.state.room} onChange={e => {
                        this.setState({
                            room: e.target.value
                        })
                    }} />
                    <button onClick={this.joinRoom}>Join</button>
                    </div>
                }
            </div>
        ); 
    }
    }
}


function mapStateToProps(state) {
    return {
        user: state.user,
        groups: state.groups
}; 
}
    

export default connect(
    mapStateToProps,
    { getSelectedGroup }
)(Group);
