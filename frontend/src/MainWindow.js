import React from "react";
import Food from "./components/Food";
import User from "./components/User";
import "./MainWindow.css";
import Balance from "./Balance";
import History from "./components/History";
import Activities from "./components/Activities";

const MainWindow = () => {
  return (
    <div className="mainwindow">

      <User />
      <History />
      <Food />
      <Activities />
      <Balance />

    </div>
  );
};

export default MainWindow;
