import React, { useState, useEffect } from "react";
import './App.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function Test() {

  const [showIt, setShowIt] = useState(true);
    return (
       <div>
          {showIt ?
          <div className={"visible"}>hello</div>
          :
          <div className={"invisible"}>hola</div>}
       <button onClick={()=> setShowIt(!showIt)}>change state</button>
      </div>
   )
}

export default Test;
