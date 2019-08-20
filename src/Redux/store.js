import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './userReducer';
import groupReducer from './groupReducer'


const rootReducer = combineReducers({
    user: userReducer,
    groups: groupReducer

})

export const store = createStore(rootReducer, applyMiddleware(promiseMiddleware))


export default { store }