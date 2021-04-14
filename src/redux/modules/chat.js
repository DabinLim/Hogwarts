import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
import axios from "axios";
import {response} from '../Mock/RoomList';
axios.defaults.baseURL = 'http://52.79.251.93';

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chat_list: [],
    room_list: [],
  },
  reducers: {
    setRoom: (state, action) => {
      state.room_list = action.payload;
    },
  },
});


const MockRoom = () => {
    return function(dispatch) {
        dispatch(setRoom(response.RoomList))
    }
}



const findAllRoom = () => {
    return function(dispatch) {
        axios.get('/chat/rooms').then(response => {
            console.log(response.data)
            dispatch(setRoom(response.data))
        }).catch(error => {
            console.log(error)
        })
    }
}

const createRoom = (data) => {
    return function(dispatch) {
        axios.post('/chat/room', data).then(response => {
            dispatch(findAllRoom())
        }).catch(error => {
            console.log(error)
        })
    }
}


export const { 
    setRoom, 
} = chatSlice.actions;

export const api = { 
    findAllRoom,
    createRoom,
    MockRoom
};

export default chatSlice.reducer;
