import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/authslice"
const store = configureStore({
    reducer:{
        auth: authSlice
    }
});

export default store;