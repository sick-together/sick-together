import axios from 'axios';
import { GET_GROUPS, GET_SELECTED_GROUP, GET_GROUP_MESSAGES, ADD_MESSAGE } from './actionTypes';

const initialState = {
    groups: [],
    selectedGroup: {},
    groupMessages: {}
}

export const getGroups = () => {
    let data = axios.get('/api/getgroups')
        .then(res => res.data)
    console.log('Groups:', data)
    return {
        type: GET_GROUPS,
        payload: data
    }
}

export const getSelectedGroup = (groupId) => {
    let data = axios.get(`/api/selected/${groupId}`)
        .then(res => res.data)
    console.log('Selected Group:', data)
    return {
        type: GET_SELECTED_GROUP,
        payload: data
    }
}

export const getGroupMessages = (groupId) => {
    let data = axios.get(`/api/getgroupmessages/${groupId}`)
        .then(res => res.data)
    console.log('Group Messages:', data)
    return {
        type: GET_GROUP_MESSAGES,
        payload: data
    }
}

export const addMessage = (newMessage, groupId) => {
    let data = axios.post('/api/addmessage', { newMessage, groupId })
        .then(res => res.data)
    return {
        type: ADD_MESSAGE,
        payload: data
    }

}


export default function (state = initialState, action) {
    let { type, payload } = action
    switch (type) {
        case GET_GROUPS + '_FULFILLED':
            return {
                ...state,
                groups: payload
            }
        case GET_SELECTED_GROUP + '_FULFILLED':
            return {
                ...state,
                selectedGroup: payload
            }
        case GET_GROUP_MESSAGES + '_FULFILLED':
            return {
                ...state,
                groupMessages: payload
            }
        case ADD_MESSAGE + '_FULFILLED':
            return {
                ...state,
                groupMessages: payload
            }

        default:
            return state
    }
}