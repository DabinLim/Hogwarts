import {combineReducers} from 'redux';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {createBrowserHistory} from 'history';
import {connectRouter} from 'connected-react-router';
import User from './modules/user';
import Image from './modules/image';
import Chat from './modules/chat';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    chat: Chat,
    user: User,
    image: Image,
    router: connectRouter(history),

});

const {logger} = require('redux-logger');

let store = configureStore({
  reducer:rootReducer,
  middleware:[...getDefaultMiddleware(), logger],
  devTools: process.env.NODE_ENV !== 'production'
})



export default store;