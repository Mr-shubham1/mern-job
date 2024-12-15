import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/authslice"
import jobSlice from "../redux/jobslice"

const store = configureStore({
    reducer:{
        auth: authSlice,
        job:jobSlice
    }
});

export default store;