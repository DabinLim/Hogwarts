import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
import axios from "axios";

const imgSlice = createSlice({
    name: "image",
    initialState: {
        img_url: "https://lh3.googleusercontent.com/proxy/TUSg4IvU3Y0u0lQlkquaGo9MKAPk6YFi1DcQK-aiPq7KzDDx4KnDAtVU-VWn3BHQFvblQ3ao9OXXDbEWkcjQwXkoNVWR490bWIOKluyjGiBizbvBEcyiswF8PUL5NpOmQZjeR1RK725CI15Fqh7obhMmBHm4F4vWH4nH066csQ",
        uploading: false,
        preview: false,
    },
    reducers: {
        // upload_img: (state, action) => {
        //     state.img_url = action.payload.img_url;
        //     state.uploading = false;
        // },
        // uploading: (state, action) => {
        //     state.uploading = action.payload.uploading;
        // },
        set_preview: (state, action) => {
            state.preview = action.payload;
        },
    },
});

// const uploadImgDB = (img, user_id) => {
//     return function (dispatch) {
//         const img_list = {
//             url: "/api/profileimg",
//             method: "POST",
//             data: {
//                 userProfile: img,
//                 user_id: user_id,
//             },
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json;charset=UTF-8",
//             },
//         };
//         axios(img_list)
//             .then((response) => {
//                 console.log(response.data);
//             })
//             .catch((error) => {
//                 console.log(error);
//                 if (error.response) {
//                     window.alert(error.response.data);
//                 }
//             });
//     };
// };

export const { upload_img, uploading, set_preview } = imgSlice.actions;

export const reduximg = {
    // uploadImg,
    // uploadImgDB,
    
};

export default imgSlice.reducer;