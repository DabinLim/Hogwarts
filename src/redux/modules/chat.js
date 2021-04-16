import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
import axios from "axios";
import {response} from '../Mock/RoomList';
axios.defaults.baseURL = 'http://13.125.21.123';

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
    // addRoom: (state, action) => {
    //     state.room_list.unshift(action.payload);
    // }
  },
});


const MockRoom = () => {
    return function(dispatch) {
        dispatch(setRoom(response.RoomList))
    }
}



const findAllRoom = () => {
    return function(dispatch) {
        console.log('hi')
        const token = getCookie('is_login');
        const option = {
            url:'/api/chat/rooms',
            method: 'GET',
            header:{
                token:token
            }
        }
        axios(option).then(response => {
            console.log(response.data)
            dispatch(setRoom(response.data))
        }).catch(error => {
            console.log(error)
        })
    }
}

const createRoom = (room_name, interested, user_name) => {
    return function(dispatch) {
        const token = getCookie('is_login');
        const option = {
            url:'/api/chat/room',
            method:'POST',
            header:{
                token:token,
            },
            data:{
                name: user_name,
                roomName:room_name,
                userInterested:interested
            }
        }
        axios(option).then((response) => {
            console.log(response.data)
            findAllRoom()
        })
        .catch(error => {
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
