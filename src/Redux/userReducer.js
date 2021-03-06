import axios from 'axios';
import { LOGIN, LOGOUT, SIGNUP, GET_USER, EDIT_USER, EDIT_USER_PROFILE_PIC } from './actionTypes';

const initialState = {
    user: {},
    redirect: false,
    error: false,
    username: '',
    profilePic: '',
    city: '',
    state: ''
}

export const login = (username, password) => {
    let data = axios
        .post('/api/login', { username, password })
        .then(res => res.data);
    return {
        type: LOGIN,
        payload: data
    };
};

export const logout = () => {
    return {
        type: LOGOUT,
        payload: axios.delete('/api/logout')
    };
};

export const signup = (username, password, profilePic, city, state) => {
    let data = axios
        .post('/api/signup', { username, password, profilePic, city, state })
        .then(res => res.data)
        .catch(err => console.log(`Couldn't sign up user`, err))
    return {
        type: SIGNUP,
        payload: data
    };
};

export const getUser = () => {
    let data = axios.get('/api/user').then(res => res.data);
    return {
        type: GET_USER,
        payload: data
    };
};

export const editUser = (user_id, username, city, state) => {
    console.log(city)
    let data = axios.put(`/api/edit/${user_id}`, { username, city, state })
        .then(res => res.data)
    return { type: EDIT_USER, payload: data }

}

export const editUserProfilePic = (user_id, profile_pic) => {
    let data = axios.put(`/api/editprofile_pic/${user_id}`, { profile_pic })
        .then(res => res.data)
    return {
        type: EDIT_USER_PROFILE_PIC,
        payload: data
    }
}

export default function (state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
        case LOGIN + '_FULFILLED':
            return {
                ...state,
                user: payload,
                redirect: false,
                error: false,
                username: payload.username,
                profilePic: payload.profilePic,
                city: payload.city,
                state: payload.state
            };
        case LOGIN + '_REJECTED':
            return { ...state, error: payload }
        case LOGOUT + '_FULFILLED':
            return {
                ...state,
                user: {},
                redirect: true,
                error: false,
                username: '',
                profilePic: '',
                city: '',
                state: ''
            }
        case SIGNUP + '_FULFILLED':
            return {
                ...state,
                redirect: false,
                user: payload,
                error: false,
                username: payload.username,
                profilePic: payload.profilePic,
                city: payload.city,
                state: payload.state
            };
        case SIGNUP + '_REJECTED':
            return { ...state, error: payload }
        case GET_USER + '_PENDING':
            return { ...state, redirect: false, error: false }
        case GET_USER + '_FULFILLED':
            return { ...state, user: payload, username: payload.username, profilePic: payload.profilePic, error: false }
        case GET_USER + '_REJECTED':
            return { ...state, redirect: true, error: payload }
        case EDIT_USER + '_FULFILLED':
            return { ...state, user: payload }
        case EDIT_USER + '_REJECTED':
            return { ...state, error: payload }
        case EDIT_USER_PROFILE_PIC + '_FULFILLED':
            return { ...state, user: payload }
        case EDIT_USER_PROFILE_PIC + '_REJECTED':
            return { ...state, error: payload }
        default:
            return state
    }
}