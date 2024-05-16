import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, useParams, generatePath } from 'react-router-dom';
import Axios from 'axios';


function Harvestcalendarinputdiseases() {
    const navigate = useNavigate();
    const {values} = useParams();
    const w = JSON.parse(values)
    const wnew = JSON.stringify(w)
    const handleProceed = (e) => {
        wnew && navigate(generatePath("/harvestcalendardiseases/:wnew", { wnew }));
      };
    var x,y,z,ai, actid // x for id, y for start date, z for start, ai for act_increment
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
          if (key === "activities_id"){
            actid = w[key]
          }
      }
    }
    console.log("WWWWWWWW: ", w)
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
    const [disease_id, setdisease_id] = useState("")
    const [num_of_plants_affected, setnum_of_plants_affected] = useState("")
    const [date_occured, setdate_occured] = useState("")
    const [disease_desc, setdisease_desc] = useState("")
    const dis_status = "Active"
    const activities_id = actid
    const act_increment = ai
    useEffect(()=>{
        setdate_occured(y)
     })
     console.log(date_occured)
     console.log(dis_status)
    const register = () => {
        var a = document.forms["myform"]["ainput"].value;
        var b = document.forms["myform"]["binput"].value;
        var c = document.forms["myform"]["cinput"].value;
        if (a == "" ||b == "" || c == "") {
          alert("Required fields must be filled out");
        }
        else if (b > i1){
            alert("Invalid input. Quantities affected are greater than the batch's actual quantity.");
        }
        else {
            Axios.post("http://localhost:3001/harvestinputdiseasesadd", {disease_id: disease_id, activities_id: activities_id, act_increment: act_increment, num_of_plants_affected: num_of_plants_affected, date_occured: date_occured, disease_desc: disease_desc, dis_status: dis_status});
            x && navigate(generatePath("/harvestcalendarmonitoringevent/:values", { values }));
            window.location.reload();
            alert("Plant Disease recorded");
        }
      }
      var cdatey = (new Date(y)).toLocaleDateString();
      var cdatez = (new Date(z)).toLocaleDateString()
    return (
        <div className="App">
            <div class="headform">
            <h1 class="titleheadform">Input Diseases for Batch {x}</h1>
            <h6>From: {cdatey} To: {cdatez}</h6>
            </div>
            <main class="container-fluid">
            <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
            <form class="formdiv" name="myform" required>
            <p><em>NOTE: The occured date of the disease will be the date of the selected event.</em></p>
                <div class="form-group">
                        <label for="exampleSelect1" class="form-label mt-4">Select a disease from the recorded diseases in this plant.</label>
                        <select  name="ainput" required class="form-select" id="exampleSelect1" onChange={(e) =>{setdisease_id(e.target.value)}}>
                            <option value="">Select Plant Disease</option>
                            {harvestdiseasesinfo.map((val) => {
                            return (
                                <option value={val.disease_id}>{val.disease_id} {val.diseases}</option>
                            )
                            })}
                        </select>
                        </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Number of Plants Affected</label>
                    <input name="binput" type="number" class="form-control" placeholder="Number of Plants Affected" id="inputDefault" onChange={(e) =>{setnum_of_plants_affected(e.target.value)}} required/>
                </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Disease Description/Remarks</label>
                    <input name="cinput" type="text" class="form-control" placeholder="Disease Description/Remarks" id="inputDefault" onChange={(e) =>{setdisease_desc(e.target.value)}} required/>
                </div>
                <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
            </form>
            </main>
        </div>
    )
}

export default Harvestcalendarinputdiseases;