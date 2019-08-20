import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField';

export class CreateGroup extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField onChange={this.handleChange} />
            </form>
        )
    }
}