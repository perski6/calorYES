import { configureStore } from "@reduxjs/toolkit";
import userRecuder from "../features/userSlice";
import balanceReducer from "../features/balanceSlice";
import historyReducer from "../features/historySlice";

export default configureStore({
  reducer: {
    user: userRecuder,
    balance: balanceReducer,
    history: historyReducer,
  },
});
