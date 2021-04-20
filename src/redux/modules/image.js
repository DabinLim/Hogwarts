// import { createSlice } from "@reduxjs/toolkit";
// import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
// import axios from "axios";

// axios.defaults.baseURL = "http://13.125.21.123";
// axios.defaults.headers.common["token"] = getCookie("is_login");
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

// const imgSlice = createSlice({
//   name: "image",
//   initialState: {
//     img_url:
//       "https://lh3.googleusercontent.com/proxy/TUSg4IvU3Y0u0lQlkquaGo9MKAPk6YFi1DcQK-aiPq7KzDDx4KnDAtVU-VWn3BHQFvblQ3ao9OXXDbEWkcjQwXkoNVWR490bWIOKluyjGiBizbvBEcyiswF8PUL5NpOmQZjeR1RK725CI15Fqh7obhMmBHm4F4vWH4nH066csQ",
//     uploading: false,
//     preview: false,
//   },
//   reducers: {
//     set_preview: (state, action) => {
//       state.preview = action.payload;
//     },
//   },
// });

// export const { uploading, set_preview } = imgSlice.actions;

// export const reduximg = {
//   // uploadImg,
//   // uploadImgDB,
//   uploadImg,
// };

// export default imgSlice.reducer;
