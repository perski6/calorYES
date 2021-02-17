import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import "./Login.css";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = 0;
    await axios
      .get(
        "http://localhost:8000/login?nickname=" + name + "&password=" + password
      )
      .then((resp) => {
        response = resp;
      })
      .catch((err) => {
        console.log(err);
        if (401 === err.response.status) {
          Swal.fire({
            icon: "error",
            title: "Credentials don't match!",
            text: "Please try again.",
            showConfirmButton: true,

            confirmButtonColor: "black",
            confirmButtonBorder: "gray",
          });
          console.log("error 401");
        }
      });
    if (response.status === 200) {
      dispatch(
        login({
          id: response.data._id,
          name: name,
          age: response.data.age,
          height: response.data.height,
          weight: response.data.weight,
          loggedIn: true,
        })
      );
    }
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
        <h1>Login</h1>
        <input
          type="nickname"
          name="nickname"
          placeholder="Nickname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="submit-btn">
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
