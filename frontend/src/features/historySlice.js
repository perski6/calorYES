import {createSlice} from "@reduxjs/toolkit";
function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}
export const historySlice = createSlice({
    name: "history",
    initialState:{
        history:[],
    },
    reducers:{
        addHistory: (state, action) => {
            state.history =  isIterable(action.payload) ? [
                ...state.history,
                ...action.payload ] :

                [...state.history,
                    action.payload]

            console.log("Added to history")
        },
        clearHistory: (state) => {
            state.history = [] ;
            console.log("History cleared")
        },
    }
});

export const {addHistory, clearHistory} = historySlice.actions;

export const selectHistory = (state) => state.history.history;

export default historySlice.reducer;