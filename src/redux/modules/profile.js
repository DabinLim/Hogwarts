import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
import { updateUserInfo } from "./user";
import axios from "axios";

axios.defaults.baseURL = "http://13.125.21.123";
axios.defaults.headers.common["token"] = getCookie("is_login");
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user_data: [],
  },
  reducers: {
    GET_PROFILE: (state, action) => {
      state.user_data = action.payload;
    },
    UPDATE_PROFILE: (state, action) => {
      state.uploading = action.payload.uploading;
    },
  },
});

const getProfile = () => {
  return function (dispatch) {
    const get_DB = {
      url: "/api/userprofile",
      method: "GET",
    };
    axios(get_DB)
      .then((res) => {
        dispatch(GET_PROFILE(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const updateProfile = (preview, name, interest) => {
  return function (dispatch) {
    const update_profile = {
      url: "/api/profile/",
      method: "PUT",
      data: {
        userProfile: preview,
        userName: name,
        userInterested: interest,
      },
    };
    axios(update_profile)
      .then(() => {
        dispatch(updateUserInfo(update_profile.data));
        window.alert("프로필이 수정되었습니다.")
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const { GET_PROFILE, UPDATE_PROFILE } = profileSlice.actions;

export const reduxprofile = {
  getProfile,
  updateProfile,
};

export default profileSlice.reducer;
