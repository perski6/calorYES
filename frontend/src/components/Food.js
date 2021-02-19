import { useEffect, useState } from "react";
import axios from "axios";
import { selectBalance, addBalance } from "../features/balanceSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const Food = (food) => {
  const balance = useSelector(selectBalance);
  const [foods, setFoods] = useState([]);
  const dispatch = useDispatch();

  const handleAdd = (name, calories) => {
    let nameJson = JSON.stringify(name);
    let caloriesJson = parseInt(calories);
    Swal.fire({
      title: "How much?",
      text: "(In grams)",
      input: "number",
      required: "true",
      confirmButtonText: "Add",
      showCancelButton: true,
      preConfirm: (amount) => {
        dispatch(
          addBalance({
            amount: amount + " grams ",
            name: nameJson,
            calories: (caloriesJson * amount) / 100,
          })
        );
      },
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const result = await axios.get("http://localhost:8000/foods");
    setFoods(result.data);
  }, []);

  return (
    <div className="food sub-window first-row">
      {foods.map((food) => (
        <div className="food-listing" key={food._id}>
            <div className="food-listing-text">
              Name:<b>{food.name}</b> Calories:{food.calories_per_100}
            </div>
            {/*<div className="food-info">*/}
            {/*  Protein: {food.protein_per_100} Carbs: {food.carbs_per_100} Fats:{" "}*/}
            {/*  {food.fats_per_100}*/}
            {/*</div>*/}
            <button onClick={() => handleAdd(food.name, food.calories_per_100)}>
              <span>+</span>
            </button>

        </div>
      ))}
    </div>
  );
};

export default Food;
