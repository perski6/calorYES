import { selectBalance, clearBalance, removeSingleItem } from "./features/balanceSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import './Balance.css'
import axios from "axios";
import Swal from "sweetalert2";
import {addHistory, clearHistory} from "./features/historySlice";


export default function Balance() {
  const balance = useSelector(selectBalance);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  var caloriesSum = 0;
  for (var i = 0; i < balance.length; i++) {
    caloriesSum += balance[i].calories;
  }
  const handleClick = () => {
    Swal.fire({
      title:'Add your activity and meal',
      input:'text',
      confirmButtonText:'Add',
      showCancelButton: true,
      preConfirm: async (name) =>
      {
        await axios.post('http://localhost:8000/addBalance?activity='+name+'&calories_balance='+caloriesSum+'&user_id='+user.id)
            .then(resp =>{
                dispatch(addHistory(resp.data))
                dispatch(clearBalance())
                }
            )


      }

    })
  };

  const removeItem = (item) =>{
  dispatch(removeSingleItem(item))
  }

  return (
    <div className="balance-page">
      {balance.map((item) => (
        <div className="balance-listing" >
          <p>
            ID:{item.id} {item.amount} of {item.name} Calories: {item.calories} <button onClick={() => removeItem(item.id)}> - </button>
          </p>
        </div>
      ))}
      {"All calories: " + caloriesSum}
      <button onClick={() => dispatch(clearBalance())}>Clear Balance</button>
      <button onClick={() => handleClick()}>Post</button>
    </div>
  );
}
