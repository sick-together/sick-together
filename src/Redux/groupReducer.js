import axios from 'axios'
import { CREATE_GROUP } from './actionTypes'

const initialState = {
    groups: [],
    error: false
}

export function createGroup(group_name, user_id, group_picture, description) {
    let data = axios.post('/api/groups', { group_name, user_id, group_picture, description })
    .then(res => res.data)
    return {
        type: CREATE_GROUP,
        payload: data
    }
}

export default function groupReducer(state = initialState, action) {
    let {type, payload} = action
    switch(type) {
        case CREATE_GROUP + '_FULFILLED':
            return {...state, groups: payload}
        case CREATE_GROUP + '_REJECTED':
            return {...state, error: payload}
            default: return state
    }
}