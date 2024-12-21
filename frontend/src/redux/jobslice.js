import { createSlice } from "@reduxjs/toolkit";

const jobslice = createSlice({
    name:"job",
    initialState:{
        alljobs:[],
        singlejob:null,
        allAdminjobs:[],
        searchJobBytext:""
    },
    reducers:{
        setAlljobs:(state,action)=>{
            state.alljobs = action.payload;
        },
        setSinglejob:(state,action)=>{
            state.singlejob = action.payload;
        },
        setAllAdminjobs:(state,action)=>{
            state.allAdminjobs = action.payload;
        },
        setSearchJobBytext:(state,action)=>{
            state.searchJobBytext = action.payload;
        }
    }
})

export const {setAlljobs,setSinglejob,setAllAdminjobs,setSearchJobBytext} = jobslice.actions;
export default jobslice.reducer;