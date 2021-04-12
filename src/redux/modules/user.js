import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
import axios from "axios";
import { set } from "react-hook-form";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    is_login: false,
    is_signup: false,
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
  },
});

const loginCheck = () => {
  return function (dispatch) {
    if (getCookie("is_login")) {
      dispatch(
        setUser({
          email: "ekqls12",
          userName: "dabin",
          userInterested: [],
          userProfile: "https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/blankprofile.png?alt=media&token=839ae664-a63d-4e77-92c3-b1030ebde97e",
        })
      );

      // const options = {
      //   url: "/api/logincheck",
      //   method: "GET",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json;charset=UTF-8",
      //   },
      // };
      // axios(options)
      //   .then((response) => {
      //     console.log(response.data);

      //     dispatch(setUser(response.data.userInfo));
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     if (error.response) {
      //       window.alert(error.response.data);
      //     }
      //   });
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
    //클라이언트 로그인 시험
    setCookie("is_login", "token");
    dispatch(setUser({
      email: id,
      userName: password,
      userInterested: [],
      userProfile: "https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/blankprofile.png?alt=media&token=839ae664-a63d-4e77-92c3-b1030ebde97e",
    }));
    window.alert("로그인이 완료되었습니다.");

    // const options = {
    //   url: "/api/login",
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json;charset=UTF-8",
    //   },
    //   data: {
    //     email: id,
    //     password: password,
    //   },
    // };
    // axios(options)
    //   .then((response) => {
    //     console.log(response.data);
    //     let user_info = {
    //       email: response.data.userInfo.userId,
    //       userName: response.data.userInfo.userName,
    //       userInterested: response.data.userInfo.userInterested,
    //       userProfile: response.data.userInfo.userProfile,
    //     };

    //     // 받은 토근을 Cookie에 저장
    //     setCookie("is_login", response.data.user_info.token);
    //     window.alert("로그인 완료");
    //     dispatch(setUser(user_info));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     if (error.response) {
    //       window.alert(error.response.data);
    //     }
    //   });
  };
};

const registerSV = (email, name, password) => {
  return function (dispatch) {
    const options = {
      url: "/api/signup",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
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

export const { setUser, logOut, setSignUp } = userSlice.actions;

export const api = {
  loginCheck,
  logOutSV,
  logInSV,
  registerSV,
};

export default userSlice.reducer;
