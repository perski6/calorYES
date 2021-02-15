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
        clearBalance: (state) => {
            state.balance = [1]  ;
            console.log("Balance cleared")
        },
    }
});

export const {addBalance, clearBalance} = balanceSlice.actions;

export const selectBalance = (state) => state.balance.balance;

export default balanceSlice.reducer;