import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nara, selectUser } from "../features/userSlice";

const User = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(nara());
  };

  return (
    <div className="user">
      <button onClick={(e) => handleLogout(e)}>Logout</button>
      <h1>Hello, {user.name}</h1>
      <h2>Age: {user.age}</h2>
      <h2>Height: {user.height}</h2>
      <h2>Weight: {user.weight}</h2>
      <h2>
        BMR: {user.weight * 10 + 6.25 * user.height + 4.92 * user.age + 5}
      </h2>
    </div>
  );
};

export default User;
