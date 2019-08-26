import axios from 'axios'; 
import { JOIN_GROUP } from './actionTypes'; 

const initialState = {
    joins: []
}

export function joinGroup(group_id) {
    let data = axios
    .post(`/api/joinGroup/${group_id}`)
    .then(res => res.data)
    return {
        type: JOIN_GROUP, 
        payload: data
    }
}


export default function (state = initialState, action) {
    let { type, payload } = action
    switch (type) {
        case JOIN_GROUP + '_FULFILLED': 
        return {
            ...state, 
            joins: payload
        }
        case JOIN_GROUP + '_REJECTED': 
        return {
            ...state, 
            error: payload
        }
        default: 
        return state
    }
}