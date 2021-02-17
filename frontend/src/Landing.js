import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import "./Login.css";
import axios from "axios";
import Swal from "sweetalert2";
import Login from "./Login.js";
import Register from "./Register";

const Landing = () => {
  const [landing, setLanding] = useState(true);

  return (
    <div className="landing">
      <button onClick={() => setLanding(!landing)}>switch</button>
      {landing ? <Login /> : <Register />}
    </div>
  );
};

export default Landing;
