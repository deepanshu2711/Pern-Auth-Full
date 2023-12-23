import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const initialState ={
    currentUser :null,
    loading : false,
    error : false
};


const userSlice = createSlice({
    name :'user',
    initialState,
    reducers:{
        signInStart :(state ,action) =>{
            state.loading = true;
        },
        signInSuccess :(state,action)=>{
            state.currentUser =action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure :(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        }
    }
});

export const {signInStart , signInFailure , signInSuccess} = userSlice.actions;

export default userSlice.reducer;