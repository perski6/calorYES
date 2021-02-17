import React from "react";
import Listing from "./Listing";
import User from "./components/User";
import "./MainWindow.css";
import Balance from "./Balance";

const MainWindow = () => {
  return (
    <div className="main-window">
      <User />

      <Listing />

      <Balance />
    </div>
  );
};

export default MainWindow;
