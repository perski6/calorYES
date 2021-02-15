import {createSlice} from "@reduxjs/toolkit";

export const balanceSlice = createSlice({
    name: "balance",
    initialState:{
        balance:[],
    },
    reducers:{
        addBalance: (state, action) => {
            
            state.balance= [
                ...state.balance,
                action.payload
            ]
        },
        nara: (state) => {
            state.balance = []  ;
            console.log("Balance cleared")
        },
        clearBalance: (state) => {
            state.balance = []  ;
            console.log("Balance cleared")
        },
    }
});

export const {addBalance, clearBalance, nara} = balanceSlice.actions;

export const selectBalance = (state) => state.balance.balance;

export default balanceSlice.reducer;