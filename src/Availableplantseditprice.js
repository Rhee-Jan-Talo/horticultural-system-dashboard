import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';


function Availableplantseditprice() {
    const { quantity_id } = useParams();
    const x = quantity_id
    const navigate = useNavigate();
    const [priceinfo, setpriceinfo] = useState("");
    const [varinfo, setvarinfo] = useState([]);
    useEffect(() =>{
        Axios.get(`http://localhost:3001/batchvariationsprice/${x}`).then((response) => {
            setvarinfo(response.data);
        })
      }, [x])
    
    var i1, i2, i3, i4
    const ea = varinfo[0]
    for (var key in ea) {
        if (ea.hasOwnProperty(key)) {
            if (key === "price_per_unit"){
              i1 = ea[key]
            }
            if (key === "harvest_id"){
              i2 = ea[key]
            }
            if (key === "grade"){
                i3 = ea[key]
            }
            if (key === "units"){
                i4 = ea[key]
            }
        }
      }
    
    useEffect(() =>{
        setpriceinfo(i1)
      }, [i1])
    const register = () => {
        var a = document.forms["myform"]["ainput"].value;
        if (a == "" ) {
          alert("Field must be filled out");
        }
        else {
            Axios.put("http://localhost:3001/batchvariationspriceedit", {price_per_unit: priceinfo, quantity_id: x});
            navigate('/availableplants', { replace: true });
            window.location.reload();
            alert("Price Updated")
        }
      }
    return(
        <div className="App">
            <div class="headform">
            <h1 class="titleheadform">Edit Price for Batch {i2} Variation {i3} ID {x}</h1>
            </div>
            <main class="container-fluid">
            <Link to="/availableplants"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
                <form class="formdiv" name="myform" required>
                <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Price per {i4}</label>
                <input name ="ainput" type="number" class="form-control" placeholder={i1} defaultValue={i1} id="inputDefault" required onChange={(e) =>{setpriceinfo(e.target.value)}}/>
              </div>
                <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
                </form>
            </main>

        </div>
    )
}

export default Availableplantseditprice;