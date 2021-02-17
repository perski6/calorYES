import { createSlice } from "@reduxjs/toolkit";

export const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    balance: [],
  },
  reducers: {
    addBalance: (state, action) => {
      state.balance = [
        ...state.balance,
        {
          id:
            state.balance.length === 0
              ? 1
              : state.balance[state.balance.length - 1].id + 1,
          ...action.payload,
        },
      ];
    },
    removeSingleItem: (state, action) => {
      state.balance = state.balance.filter(function (element) {
        return element.id !== action.payload;
      });
      console.log("item " + action.payload + " removed");
    },
    clearBalance: (state) => {
      state.balance = [];
      console.log("Balance cleared");
    },
  },
});

export const {
  addBalance,
  clearBalance,
  removeSingleItem,
} = balanceSlice.actions;

export const selectBalance = (state) => state.balance.balance;

export default balanceSlice.reducer;
