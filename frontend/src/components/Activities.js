import { useEffect, useState } from "react";
import axios from "axios";
import "./Food.css";
import { selectBalance, addBalance } from "../features/balanceSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const Activities = (food) => {
  const balance = useSelector(selectBalance);
  const [activities, setActivities] = useState([]);
  const dispatch = useDispatch();

  const handleAdd = (name, calories) => {
    let nameJson = JSON.stringify(name);
    let caloriesJson = parseInt(calories);
    Swal.fire({
      title: "How long?",
      text: "(In minutes)",
      input: "number",
      confirmButtonText: "Add",
      showCancelButton: true,
      preConfirm: (amount) => {
        dispatch(
          addBalance({
            amount: amount + " minutes ",
            name: nameJson,
            calories: -caloriesJson * amount,
          })
        );
      },
    });
  };

  useEffect(async () => {
    const result = await axios.get("http://localhost:8000/activities");
    setActivities(result.data);
  }, []);

  return (
    <div className="activities sub-window first-row">
      {activities.map((activity) => (
        <div className="food-listing" key={activity._id}>
            <div className="food-listing-text">
              Name:{activity.name}
            </div>
            <button
              onClick={() =>
                handleAdd(activity.name, activity.calories_per_min)
              }
            >
              <span>+</span>
            </button>

        </div>
      ))}
    </div>
  );
};

export default Activities;
