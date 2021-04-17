import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
import axios from "axios";

axios.defaults.baseURL = 'http://13.125.21.123';
axios.defaults.headers.common['token'] = getCookie('is_login')

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    is_login: false,
    is_signup: false,
    chat_content:[]
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.is_login = true;
    },
    logOut: (state) => {
      state.user = null;
      state.is_login = false;
    },
    setSignUp: (state) => {
      if (state.is_signup) {
        state.is_signup = false;
      } else {
        state.is_signup = true;
      }
    },
    addInterested: (state,action) => {
      state.user.userInterested = action.payload;
    },
    setChat: (state, action) => {
      state.chat_content = action.payload
    },
    updateUserInfo: (state,action) => {
      state.user.userName = action.payload.userName;
      state.userProfile = action.payload.userProfile;
      state.userInterested = action.payload.userInterested;
    }
  },
});

const loginCheck = () => {
  return function (dispatch) {
    if (getCookie("is_login")) {
      // dispatch(
      //   setUser({
      //     email: "ekqls12",
      //     username: "dabin",
      //     userInterested: [],
      //     userProfile: "https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/blankprofile.png?alt=media&token=839ae664-a63d-4e77-92c3-b1030ebde97e",
      //   })
      // );

      const options = {
        url: "/api/logincheck",
        method: "GET",
        
      };
      axios(options)
        .then((response) => {
          console.log(response.data)
          dispatch(setUser(response.data));
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            window.alert(error.response.data);
          }
        });
    } else {
      dispatch(logOut());
    }
  };
};

const logOutSV = (history) => {
  return function (dispatch) {
    deleteCookie("is_login");
    dispatch(logOut());
    history.push("/");
  };
};

const logInSV = (id, password, history) => {
  return function (dispatch) {
    // 클라이언트 로그인 시험
    // setCookie("is_login", "token");
    // dispatch(setUser({
    //   email: id,
    //   username: 'dabin',
    //   userInterested: [],
    //   userProfile: "https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/blankprofile.png?alt=media&token=839ae664-a63d-4e77-92c3-b1030ebde97e",
    // }));
    // window.alert("로그인이 완료되었습니다.");

    const options = {
      url: "/api/login",
      method: "POST",
      data: {
        email: id,
        password: password,
      },
    };
    axios(options)
      .then((response) => {
        console.log(response.data);
        let user_info = {
          email: response.data.email,
          userName: response.data.userName,
          userInterested: response.data.userInterested,
          userProfile: response.data.userProfile,
        };

        // 받은 토근을 Cookie에 저장
        
        axios.defaults.headers.common['token'] = response.data.token
        setCookie("is_login", response.data.token);
        window.alert("로그인 완료");
        history.push('/all')
        dispatch(setUser(user_info));
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          window.alert(error);
        }
      });
  };
};

const registerSV = (email, name, password) => {
  return function (dispatch) {
    const options = {
      url: "/api/signup",
      method: "POST",
      data: {
        email: email,
        userName: name,
        password: password,
      },
    };
    axios(options)
      .then((response) => {
        console.log(response.data);
        window.alert("회원가입이 완료되었습니다.");
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          window.alert(error.response.data);
        }
      });
  };
};


const addInterSV = (interested) => {
  return function(dispatch) {
    const token = getCookie('is_login');
    console.log(token)
    const option = {
      url:'/api/interest',
      method:'POST',
      // header:{
      //   token:token
      // },
      data:{
        userInterested:[interested, '', '']
      }
    }
    axios(option).then((response) => {
      console.log(response)
      dispatch(addInterested(response.data.userInterested))

    }).catch((error) => {
      console.log(error)
    })
  }
}

export const { setChat, setUser, logOut, setSignUp, addInterested, updateUserInfo } = userSlice.actions;

export const api = {
  loginCheck,
  logOutSV,
  logInSV,
  registerSV,
  addInterSV
};

export default userSlice.reducer;
