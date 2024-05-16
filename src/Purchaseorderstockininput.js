import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, useParams, generatePath } from 'react-router-dom';
import Axios from 'axios';
import DatePicker from "react-datepicker";

function Purchaseorderstockininput() {
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
    const [stockquanti, setstockquanti] = useState()
    const [exp_date, setexp_date] = useState({start: ""})
    const register = () => {
        var a = document.forms["myform"]["ainput"].value;
        var c = document.forms["myform"]["ccinput"].value;
        if (a == "" || c == "" ) {
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
            parseFloat(stockquanti)
            var today = new Date();
            Axios.post("http://localhost:3001/purchaseorderstockinperishable", {supply_id: i5, po_id: y, quantity: stockquanti, units: i2, exp_date: exp_date.start, stocked_in_quantity: i3, po_quantity: i1, date: today});
            navigate(generatePath("/purchaseorderstockin/:x", { x }));
            window.location.reload();
            alert("Perishable Items Stocked In")
        }
      }
      const handleProceed = (e) => {
        x && navigate(generatePath("/purchaseorderstockin/:x", { x }));
    };
    return(
        <div className="App">
            <div class="headform">
            <h1 class="titleheadform">Stock In Perishable Items per Expiration Date</h1>
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
                <div class="form-group">
                        <label class="col-form-label mt-4" for="inputDefault">Expiration Date:</label>
                        <DatePicker name="ccinput" placeholderText='Expiration Date' style={{marginRight:"10px"}} selected={exp_date.start} onChange={(start) =>{setexp_date({...exp_date, start})}} />
                    </div>
                <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
                </form>
            </main>

        </div>
    )
}

export default Purchaseorderstockininput;