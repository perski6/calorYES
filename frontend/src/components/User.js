import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {logout, selectUser} from '../features/userSlice'
import {clearBalance} from '../features/balanceSlice'
import History from './History'
import {clearHistory} from "../features/historySlice";


const User = () =>{

    const user = useSelector(selectUser);
    const dispatch = useDispatch()

    const handleLogout = (e) =>{
        e.preventDefault();
        dispatch(logout());
        dispatch(clearBalance());
        dispatch(clearHistory());

    }

    return(
        <div className="user">
            <button onClick={(e)=>handleLogout(e)}>Logout</button>
            <h1>Hello, {user.name}</h1>
            <h2>Age: {user.age}</h2>
            <h2>Height: {user.height}</h2>
            <h2>Weight: {user.weight}</h2>
            <h2>BMR: {(((user.weight)*10)+(6.25*(user.height))+(4.92*(user.age))+5)}</h2>
            <History/>
        </div>
    )
}

export default User
