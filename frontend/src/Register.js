import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import "./Login.css";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:8000/addUser?nickname=" +
          name +
          "&password=" +
          password +
          "&height=" +
          height +
          "&weight=" +
          weight +
          "&age=" +
          age
      )
      .then((resp) => {
        let response = resp;
        axios.post(
          "http://localhost:8000/addBalance?activity=Welcome!&calories_balance=0&user_id=" +
            response.data
        );
        console.log(response.data);
        if (201 === resp.status) {
          Swal.fire({
            title: "User " + name + " created",
            icon: "success",
            text: "Do you want to log in?",
            showCancelButton: true,
            showConfirmButton: "true",
            confirmButtonText: "Log in",
            cancelButtonText: "Later",
            preConfirm() {
              dispatch(
                login({
                  id: response.data,
                  name: name,
                  height: height,
                  weight: weight,
                  age: age,
                })
              );
            },
          });
        }
      })
      .catch((err) => {
        if (422 === err.response.status) {
          Swal.fire({
            icon: "error",
            title: "User already exists!",
            text: "Please try again.",
            showConfirmButton: true,

            confirmButtonColor: "black",
            confirmButtonBorder: "gray",
          });
        }
      });
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
        <h1>Sign up</h1>
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
        <input
          type="number"
          name="height"
          placeholder="Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button type="submit" className="submit-btn">
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default Register;
