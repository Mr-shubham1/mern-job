import { createSlice } from "@reduxjs/toolkit";

const applicationslice = createSlice({
    name:"applications",
    initialState:{
        applicants:[]
    },
    reducers:{
        setApplicants:(state,actions)=>{
            state.applicants = actions.payload;
        }
    }

})

export const {setApplicants} = applicationslice.actions;
export default applicationslice.reducer;