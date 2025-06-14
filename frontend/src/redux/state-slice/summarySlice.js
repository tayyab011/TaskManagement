import { createSlice } from "@reduxjs/toolkit";

export const summarySlice =createSlice({
    name:'summary',
    initialState:{
        summary:[],
    },
    reducers:{
        setSummary:(state,action)=>{
            state.summary=action.payload
        }
    }
})

export const {setSummary} =summarySlice.actions;
export default summarySlice.reducer