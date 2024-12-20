import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"Company",
    initialState:{
        allCompany:[],
        singleCompany:null
    },
    reducers:{
        setAllCompany:(state,action)=>{
            state.allCompany = action.payload
        },
        setSingleCompany:(state,action)=>{
            state.singleCompany = action.payload;
        }

    }
});

export const {setAllCompany,setSingleCompany} = companySlice.actions;
export default companySlice.reducer;