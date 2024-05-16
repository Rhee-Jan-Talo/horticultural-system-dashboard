import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, useParams, generatePath } from 'react-router-dom';
import Axios from 'axios';


function Harvestcalendarinputmortalities() {
    const navigate = useNavigate();
    const {values} = useParams();
    const w = JSON.parse(values)
    const wnew = JSON.stringify(w)
    const handleProceed = (e) => {
        wnew && navigate(generatePath("/harvestcalendarmonitoringevent/:wnew", { wnew }));
      };
    var x,y,z,ai,bid,aid // x for id, y for start date, z for start, ai for act_increment, bid for batch_id
    for (var key in w) {
      if (w.hasOwnProperty(key)) {
          if (key === "id"){
            x = w[key]
          }
          if (key === "startd"){
            y = w[key]
          }
          if (key === "endd"){
            z = w[key]
          }
          if (key === "actinc"){
            ai = w[key]
          }
          if (key === "batch_id"){
            bid = w[key]
          }
          if (key === "activities_id"){
            aid = w[key]
          }
      }
    }
    const [harvestdiseasesinfo, setharvestdiseasesinfo] = useState([]);
    useEffect(() =>{
      async function fetchData(){
          await Axios.get(`http://localhost:3001/harvestinputdiseases/${x}`).then((response) => {
            setharvestdiseasesinfo(response.data);
      })
      }
      fetchData()
    }, [x])
    const ea = harvestdiseasesinfo[0]
    var i1
    for (var key in ea) {
        if (ea.hasOwnProperty(key)) {
            if (key === "quantity"){
              i1 = ea[key]
            }
        }
      }
    const [quantity_loss, setquantity_loss] = useState("")
    //const [units, setunits] = useState("")
    const activities_id = aid
    const date = y
    const batch_id = x
    const register = () => {
    var a = document.forms["myform"]["ainput"].value;
    //var b = document.forms["myform"]["binput"].value;
    if (a == "") {
        alert("Field must be filled out");
    }
    else if (a > i1){
        alert("Invalid input. Quantity loss is greater than the batch's actual quantity.");
    }
    else {
        Axios.post("http://localhost:3001/harvestinputmortalities", {activities_id: activities_id, batch_id: batch_id, quantity_loss: quantity_loss, date: date});
        wnew && navigate(generatePath("/harvestcalendarmonitoringevent/:wnew", { wnew }));
        window.location.reload();
        alert("Plant Mortality recorded");
    }
      }
      var cdatey = (new Date(y)).toLocaleDateString();
      var cdatez = (new Date(z)).toLocaleDateString()
    return (
        <div className="App">
            <div class="headform">
            <h1 class="titleheadform">Input Mortalities for Batch {x}</h1>
            <h6>From: {cdatey} To: {cdatez}</h6>
            </div>
            <main class="container-fluid">
            <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
            <form class="formdiv" name="myform" required>
            <p><em>NOTE: The occured date of the mortality info will be the date of the selected event.</em></p>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">New Quantity Loss <em>(input another quantity loss. not the total quantity loss including the last inputs.)</em></label>
                    <input name="ainput" type="number" class="form-control" placeholder="Quantity Loss" id="inputDefault" onChange={(e) =>{setquantity_loss(e.target.value)}} required/>
                </div>
                <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
            </form>
            </main>
        </div>
    )
}

export default Harvestcalendarinputmortalities;