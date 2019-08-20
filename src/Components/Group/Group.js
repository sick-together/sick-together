import React, { Component } from 'react';
import io from 'socket.io-client';

class Group extends Component {
    consturctor () {
        super(); 
        this.state = {
            input: '', 
            messages: [], 
            room: '', 
            joined: false
        }
        this.joinRoom = this.joinRoom.bind(this); 
        this.joinSuccess = this.joinSuccess.bind(this); 
        this.sendMessage = this.sendMessage.bind(this); 
        this.updateMessages = this.updateMessages.bind(this); 
    }
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
        console.log(this.state.messages)
        return (
            <div className="App">
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