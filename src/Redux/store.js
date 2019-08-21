import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './userReducer';
import groupReducer from './groupReducer'


const rootReducer = combineReducers({
    user: userReducer,
    groups: groupReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))


export default { store }