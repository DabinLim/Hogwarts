import { createSlice } from '@reduxjs/toolkit';
import { getCookie, deleteCookie, setCookie } from '../../shared/Cookie';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.common['token'] = getCookie('is_login')

const userSlice = createSlice({
    name:'user',
    initialState: {
        user:null,
        is_login: false,
        loading: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.is_login = true
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        removeUser: (state) => {
            state.user = null;
            state.is_login = false
        }
    }
})

const logOutSV = (history) => {
    return function(dispatch) {
        deleteCookie('access-token')
        dispatch(removeUser())
        history.push('/login')
    }
}


const loginCheck = (history) => {
    return function(dispatch) {
        dispatch(setUser({
            email:'ekqls2143@naver.com',
            nickname:'dabin',
            profile_img:'https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/blank_profile_hog.png?alt=media&token=8b2c2cd8-5ffc-4f81-a8cd-f1acfd108d95',
            user_house:'Slytherin'
        }))

        // axios.get('/api/logincheck').then((response) => {
        //     dispatch(setUser(response.data))
        //     history.push('/')
        // })
    }
}


const loginSV = (email, password, history) => {
    return function(dispatch) {
        setLoading(true)

        setCookie('access-token', 'success');
        dispatch(setUser({
            email:email,
            nickname:'dabin',
            profile_img:'https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/blank_profile_hog.png?alt=media&token=8b2c2cd8-5ffc-4f81-a8cd-f1acfd108d95',
            user_house:'Slytherin'
        }))
        setLoading(false)
        window.alert('로그인 완료')
        history.push('/')

    
        // const options = {
        //     url:'/api/signin',
        //     method:'POST',
        //     data:{
        //         email:email,
        //         password:password,
        //     }
        // }
        // axios(options).then((response) => {
        //     let userInfo = {
        //         email: response.data.email,
        //         nickname: response.data.nickname,
        //         profile_img: response.data.profile_img
        //     }
        //     axios.defaults.headers.common['token'] = getCookie('is_login')
        //     setCookie('access-token', response.data.token);
        //     dispatch(setUser(userInfo))
        //     setLoading(false)
        //     window.alert('로그인 완료');
        //     history.push('/')
        // }).catch(err => {
        //     console.log(err)
        //     setLoading(false)
        // })
    }
}


const registerSV = (email,nickname,password,history) => {
    return function(dispatch) {
        setLoading(true)
        const options = {
            url:'/api/register',
            method:'POST',
            data:{
                email:email,
                nickname:nickname,
                password:password,
            }
        }
        axios(options).then((response) => {
            console.log(response.data)
            window.alert('회원가입이 완료되었습니다.')
            setLoading(false)
            history.push('/login')
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }
}


export const { 
    setUser,
    setLoading,
    removeUser
} = userSlice.actions;

export const api = {
 registerSV,
 loginSV,
 loginCheck,
 logOutSV
};

export default userSlice.reducer;