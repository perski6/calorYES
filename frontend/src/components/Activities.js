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
    <div className="activities">
      {activities.map((activity) => (
        <div className="activities-listing" key={activity._id}>
          <h2>
            Name:{activity.name}
            <button
              onClick={() =>
                handleAdd(activity.name, activity.calories_per_min)
              }
            >
              +
            </button>
          </h2>
        </div>
      ))}
    </div>
  );
};

export default Activities;
