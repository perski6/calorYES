import React from 'react'
import Food from './components/Food'
import Activities from "./components/Activities";


const Listing = () =>{

    return(
        <div className="listing">
            <Food/>
            <Activities/>
        </div>
    )
}

export default Listing
