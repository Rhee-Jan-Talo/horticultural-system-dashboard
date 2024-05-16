import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, useParams, generatePath } from 'react-router-dom';
import Axios from 'axios';


function Harvestcalendarinputactivity() {
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
    const [employeelist, setemployeelist] = useState([]);
    useEffect(() =>{
      async function fetchData(){
          await Axios.get(`http://localhost:3001/employeelist`).then((response) => {
            setemployeelist(response.data);
      })
      }
      fetchData()
    }, [])
    const [emp_id, setemp_id] = useState("")
    const [activity, setactivity] = useState("")
    const [report, setreport] = useState("")
    const activities_id = aid
    const register = () => {
        var a = document.forms["myform"]["ainput"].value;
        var b = document.forms["myform"]["binput"].value;
        var c = document.forms["myform"]["cinput"].value;
        if (a == "" ||b == "" || c == "") {
          alert("Required fields must be filled out");
        }
        else {
            Axios.post("http://localhost:3001/harvestinputactivity", {activities_id: activities_id, emp_id: emp_id, activity: activity, report: report});
            wnew && navigate(generatePath("/harvestcalendarmonitoringevent/:wnew", { wnew }));
            window.location.reload();
            alert("Activity recorded");
        }
      }
      var cdatey = (new Date(y)).toLocaleDateString();
      var cdatez = (new Date(z)).toLocaleDateString()
    return (
        <div className="App">
            <div class="headform">
            <h1 class="titleheadform">Input Activity for Batch {x}</h1>
            <h6>From: {cdatey} To: {cdatez}</h6>
            </div>
            <main class="container-fluid">
            <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
            <form class="formdiv" name="myform" required>
            <p><em>NOTE: The occured date of the activity will be the date of the selected event.</em></p>
                <div class="form-group">
                    <label for="exampleSelect1" class="form-label mt-4">Managed by</label>
                    <select  name="ainput" required class="form-select" id="exampleSelect1" onChange={(e) =>{setemp_id(e.target.value)}}>
                        <option value="">Select Employee</option>
                        {employeelist.map((val) => {
                        return (
                            <option value={val.emp_id}>{val.emp_id} {val.emp_name}</option>
                        )
                        })}
                    </select>
                    </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Activity</label>
                    <input name="binput" type="text" class="form-control" placeholder="Activity" id="inputDefault" onChange={(e) =>{setactivity(e.target.value)}} required/>
                </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Report</label>
                    <input name="cinput" type="text" class="form-control" placeholder="Report" id="inputDefault" onChange={(e) =>{setreport(e.target.value)}} required/>
                </div>
                <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
            </form>
            </main>
        </div>
    )
}

export default Harvestcalendarinputactivity;