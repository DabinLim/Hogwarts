import { createSlice } from '@reduxjs/toolkit';
import { getCookie, deleteCookie, setCookie } from '../../shared/Cookie';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.common['Authorization'] = getCookie('access-token')

const houseSlice = createSlice({
    name:'house',
    initialState: {
        students: []
    },
    reducers: {
        setStudents: (state, action) => {
            state.students = action.payload
        }
    }
})

const getStudentsSV = (house) => {
    return function( dispatch ) {

        const options = {
            url:`api/students/${house}`,
            method:'GET',
        }

        axios(options).then(response => {
            let students = []
            response.data.students.forEach(v => {
                students.push({
                    user_id:v.userId,
                    nickname:v.nickname,
                    profile_img:v.profile_img,
                    user_house:v.user_house,
                    user_wand: v.user_wand,
                    user_patronus: v.user_patronus
                })
            })
            dispatch(setStudents(students))
        }).catch(err => {
            console.log(err)
            if(err.response.data){
                window.alert(err.response.data.errorMessage)
            }
        })
    }
}

export const { 
    setStudents
} = houseSlice.actions;

export const api = {
    getStudentsSV
};

export default houseSlice.reducer;