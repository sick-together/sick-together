import axios from 'axios';
import { GET_GROUPS, GET_SELECTED_GROUP } from './actionTypes';

const initialState = {
    groups: [],
    selectedGroup: {}
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

        default:
            return state
    }
}