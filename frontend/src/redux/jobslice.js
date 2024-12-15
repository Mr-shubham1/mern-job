import { createSlice } from "@reduxjs/toolkit";

const jobslice = createSlice({
    name:"job",
    initialState:{
        alljobs:[],
        singlejob:null
    },
    reducers:{
        setAlljobs:(state,action)=>{
            state.alljobs = action.payload;
        },
        setSinglejob:(state,action)=>{
            state.singlejob = action.payload;
        }
    }
})

export const {setAlljobs,setSinglejob} = jobslice.actions;
export default jobslice.reducer;