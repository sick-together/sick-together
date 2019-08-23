import axios from 'axios';
import { GET_GROUPS, GET_SELECTED_GROUP, GET_GROUP_MESSAGES, GET_ROOMS, ADD_MESSAGE, CREATE_GROUP, CREATE_GENERAL, DELETE_GROUP, ADD_ROOM, CLEAR_SELECTED } from './actionTypes';

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

    // let newGroupId = +data[0].group_id
    //     axios.post(`/api/creategeneral/${newGroupId}`)
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

export function addNewRoom(newRoom, group_id) {
    let data = axios.post(`/api/createroom/${group_id}`, { newRoom })
        .then(res => res.data)
    return {
        type: ADD_ROOM,
        payload: data
    }
}
export function clearSelectedData() {
    return {
        type: CLEAR_SELECTED
    }
}

export function deleteGroup(group_id) {
    let data = axios.delete(`/api/deletegroup/${group_id}`)
        .then(res => res.data)
    return { type: DELETE_GROUP, payload: data }
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
        case CLEAR_SELECTED:
            console.log('Cleared selected data')
            return {
                ...state,
                selectedGroup: {},
                groupMessages: {},
                rooms: []
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
            console.log(payload[0].group_id)
            if (payload && payload[0].group_id) {
                let groupId = payload[0].group_id
                console.log(groupId);
                createGeneral(groupId)
            }

            return { ...state, groups: payload, lastGroupId: +payload[0].group_id };

        case CREATE_GROUP + "_REJECTED":
            return { ...state, error: payload };
        case CREATE_GENERAL + '_FULFILLED':
            return {
                ...state
            }
        case ADD_ROOM + '_FULFILLED':
            return { ...state, rooms: payload }
        case DELETE_GROUP + '_FULFILLED':
            return { ...state, groups: payload }
        default:
            return state
    }
}

