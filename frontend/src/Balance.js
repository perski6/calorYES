import {useState} from "react";
import { selectBalance, clearBalance } from "./features/balanceSlice";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from "./features/userSlice";
const Balance = () =>{

    const balance = useSelector(selectBalance);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    // function amount(item){
    //     return item.calories;
    //   }
    //   function sum(prev, next){
    //     return prev + next;
    //   }

    const handleClick = () =>{

    }

return(
    <div className="balance-page">
    {balance.map((item) => (
        <div className ="balance-listing">
          <p> ID:{item.id} {item.ammount}g of {item.name} Calories:{item.calories} </p>

            </div>
    ))
    
    }
    {/* {"All calories: "+balance.map(amount).reduce(sum)} */}
    <button onClick={()=>dispatch(clearBalance())}>Clear Balance</button>
    <button onClick={()=>handleClick}>Post</button>
    </div>
)}

export default Balance