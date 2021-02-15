import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState:{
        user:null,
    },
    reducers:{
        login: (state, action) =>{
            state.user = action.payload;
            console.log("siema")
        },
        logout: (state) => {
            state.user = null;
            console.log("dispatch nara")
        },
    }
});

export const {login,logout} = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;