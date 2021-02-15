import {configureStore} from "@reduxjs/toolkit"
import userRecuder from '../features/userSlice'
import balanceReducer from '../features/balanceSlice'

export default configureStore({
    reducer:{
        user: userRecuder,
        balance :balanceReducer,
     },
})