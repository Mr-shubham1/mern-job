import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"Company",
    initialState:{
        allCompany:[],
        singleCompany:null,
        searchCompanyBytext:""
    },
    reducers:{
        setAllCompany:(state,action)=>{
            state.allCompany = action.payload
        },
        setSingleCompany:(state,action)=>{
            state.singleCompany = action.payload;
        },
        setsearchCompanyBytext:(state,action)=>{
            state.searchCompanyBytext = action.payload;
        }

    }
});

export const {setAllCompany,setSingleCompany,setsearchCompanyBytext} = companySlice.actions;
export default companySlice.reducer;