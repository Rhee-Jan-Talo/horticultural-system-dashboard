import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, useParams, generatePath } from 'react-router-dom';
import Axios from 'axios';
import DatePicker from "react-datepicker";

function Purchaseorderstockininputnotperishable() {
    const navigate = useNavigate();
    const { final_po_id } = useParams()
    const x = final_po_id
    const { po_id } = useParams()
    const y = po_id
    const [polist, setpolist] = useState([]);
    useEffect(() =>{
        Axios.get(`http://localhost:3001/purchaseorderinfostockin/${y}`).then((response) => {
            setpolist(response.data);
        })
      }, [y])
    var i1, i2, i3, i5
    const ea = polist[0]
    for (var key in ea) {
        if (ea.hasOwnProperty(key)) {
            if (key === "po_quantity"){
              i1 = ea[key]
            }
            if (key === "units"){
                i2 = ea[key]
            }
            if (key === "stocked_in_quantity"){
              i3 = ea[key]
              if (i3 === null){
                i3 = 0
              }
            }
            if (key === "supply_id"){
                i5 = ea[key]
            }
        }
      }
    var i4 = i1 - i3
    const [stockquanti1, setstockquanti] = useState()
    var stockquanti
    const register = () => {
        var a = document.forms["myform"]["ainput"].value;
        if (a == "") {
          alert("Required fields must be filled out");
        }
        else if(a > i4) {
            alert("Invalid input. Inputted quantity exceeds the maximum expected stock in quantity.")
        }
        else if(a <= 0){
            alert("Invalid input. Inputted quantity must not be less than or equal to zero.")
        }
        else{
            parseFloat(i1)
            parseFloat(i3)
            stockquanti = parseFloat(stockquanti1)
            Axios.post("http://localhost:3001/purchaseorderstockin", {supply_id: i5, po_id: y, quantity: stockquanti, units: i2, stocked_in_quantity: i3, po_quantity: i1});
            navigate(generatePath("/purchaseorderstockin/:x", { x }));
            window.location.reload();
            alert("Perishable Items Stocked In")
            console.log("supply_id :", i5)
            console.log("po_id :", y)
            console.log("quantity :", stockquanti)
            console.log("units :", i2)
            console.log("stocked_in_quantity :", i3)
            console.log("po_quantity :", i1)
            //alert("Success")
        }
      }
    const handleProceed = (e) => {
        x && navigate(generatePath("/purchaseorderstockin/:x", { x }));
    };
    return(
        <div className="App">
            <div class="headform">
            <h1 class="titleheadform">Stock In Item's Quantity <em>(not perishable)</em></h1>
            </div>
            <main class="container-fluid">
            <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
            <h5><strong>Already Stocked In Quantity</strong>: {i3}</h5>
            <h5><strong>Maximum Expected Stock In Quantity</strong>: {i4}</h5>
            <h5><strong>Units</strong>: {i2}</h5>
                <form class="formdiv" name="myform" required>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Stock In Quantity</label>
                    <input name="ainput" type="number" class="form-control" placeholder="Stock In Quantity" id="inputDefault"  onChange={(e) =>{setstockquanti(e.target.value)}} required/>
                </div>
                <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
                </form>
            </main>

        </div>
    )
}

export default Purchaseorderstockininputnotperishable;