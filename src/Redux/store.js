import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import { persistStore, persistReducer } from 'redux-persist'
import userReducer from './userReducer';
import groupReducer from './groupReducer'
import rootReducer from './rootReducer'


// const rootReducer = combineReducers({
//     user: userReducer,
//     groups: groupReducer
// })

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))

export const persistor = persistStore(store)

export default { store }