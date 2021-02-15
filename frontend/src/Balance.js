import { useState } from "react";
import { selectBalance, clearBalance } from "./features/balanceSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

export default function Balance() {
  const balance = useSelector(selectBalance);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  var caloriesSum = 0;
  for (var i = 0; i < balance.length; i++) {
    caloriesSum += balance[i].calories;
  }
  const handleClick = () => {};

  console.log(caloriesSum);
  console.log(balance);

  return (
    <div className="balance-page">
      {balance.map((item) => (
        <div className="balance-listing">
          <p>
            ID:{item.id} {item.ammount}g of {item.name} Calories:{item.calories}
          </p>
        </div>
      ))}
      {"All calories: " + caloriesSum}
      <button onClick={() => dispatch(clearBalance())}>Clear Balance</button>
      <button onClick={() => handleClick}>Post</button>
    </div>
  );
}
