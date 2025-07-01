import { createSlice } from "@reduxjs/toolkit";

export const userSLice=createSlice({
    name:'user',
    initialState:{
        user:null
    },
    reducers:{
        logIn:(state,action)=>{
            state.user=action.payload
        },
        logOut:(state,action)=>{
            state.user=null
        }


    }
})

export const {logIn,logOut}=userSLice.actions

export const selectUser = (state) => state.user.user;


export default userSLice.reducer