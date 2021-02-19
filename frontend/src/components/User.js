import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import { clearBalance } from "../features/balanceSlice";
import { clearHistory } from "../features/historySlice";

const User = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(clearBalance());
    dispatch(clearHistory());
  };

  return (
    <div className="user sub-window first-row">
      <button className="logout-button" onClick={(e) => handleLogout(e)}>Logout</button>
      <h1>Hello, {user.name}</h1>
      Age: {user.age}<br/>
      Height: {user.height}<br/>
      Weight: {user.weight}<br/>
      <h2>
        BMR: {user.weight * 10 + 6.25 * user.height + 4.92 * user.age + 5}
      </h2>
    </div>
  );
};

export default User;
