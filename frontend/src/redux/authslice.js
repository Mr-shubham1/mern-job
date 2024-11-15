import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false
    },
    reducers:{
        // actions
        setLoading:(state , action)=>{
            state.loading = action.payload;
        }
    }
});

// now export actions and reducer/slice
export const {setLoading} = authSlice.actions;
export default authSlice.reducer;
