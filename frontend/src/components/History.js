import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import axios from "axios";
import { addHistory, selectHistory } from "../features/historySlice";

const History = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(async () => {
    const result = await axios.get(
      "http://localhost:8000/userBalance/" + user.id
    );
    dispatch(addHistory(result.data));
  }, []);

  const history = useSelector(selectHistory);
  return (
    <div className="history">
      {history.map((item) => (
        <div className="history-listing" key={item._id}>
          {item.activity === "Welcome!" ? (
            <h2> Welcome to CalorYes! </h2>
          ) : (
            <h2>
              Name: {item.activity} Calories: {item.calories_balance} Date:{" "}
              {item.date}
            </h2>
          )}
        </div>
      ))}
    </div>
  );
};

export default History;
