import axios from 'axios';
import { GET_GROUPS, GET_SELECTED_GROUP, GET_GROUP_MESSAGES, GET_ROOMS, ADD_MESSAGE, CREATE_GROUP, CREATE_GENERAL } from './actionTypes';

const initialState = {
    groups: [],
    selectedGroup: {},
    groupMessages: {},
    rooms: [],
    lastGroupId: null
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

export const getRooms = (groupId) => {
    let data = axios.get(`/api/getrooms/${groupId}`)
        .then(res => res.data)
    console.log('Rooms:', data)
    return {
        type: GET_ROOMS,
        payload: data
    }
}

export const addMessage = (newMessage, groupId, roomId) => {
    let data = axios.post('/api/addmessage', { newMessage, groupId, roomId })
        .then(res => res.data)
    return {
        type: ADD_MESSAGE,
        payload: data
    }

}

export function createGroup(group_name, group_picture, description) {
    let data = axios
        .post("/api/creategroup", { group_name, group_picture, description })
        .then(res => res.data);
    return {
        type: CREATE_GROUP,
        payload: data

    };
}

export function createGeneral(groupId) {
    let data = axios.post(`/api/creategeneral/${groupId}`)
        .then(res => res.data)
    return {
        type: CREATE_GENERAL,
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
        case GET_ROOMS + '_FULFILLED':
            return {
                ...state,
                rooms: payload
            }
        case ADD_MESSAGE + '_FULFILLED':
            return {
                ...state,
                groupMessages: payload
            }
        case CREATE_GROUP + "_FULFILLED":
            console.log(+payload[0].group_id);
            return { ...state, groups: payload, lastGroupId: +payload[0].group_id };
        case CREATE_GROUP + "_REJECTED":
            return { ...state, error: payload };
        case CREATE_GENERAL + '_FULFILLED':
            return {
                ...state
            }
        default:
            return state
    }
}

