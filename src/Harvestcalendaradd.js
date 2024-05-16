import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import DatePicker from "react-datepicker";


function Harvestcalendaradd() {
    const [newEvent, setnewEvent] = useState({title: "", start: "", end: ""})
    console.log(newEvent.start)
    const navigate = useNavigate()
    const [harvestplantname, setharvestplantname] = useState("")
    const [harveststatus, setharveststatus] = useState("Active")
    const [harveststart, setharveststart] = useState("")
    const [harvestend, setharvestend] = useState("")
    const [harvestquantity, setharvestquantity] = useState("")
    const [area_id, setarea_id] = useState("")
    const [plantprofilelist, setplantprofilelist] = useState([]);
    useEffect(() =>{
        Axios.get('http://localhost:3001/plantprofile').then((response) => {
        setplantprofilelist(response.data);
        })
    }, [])
    useEffect(()=>{
       setharveststatus("Active")
    })
    const [arealist, setarealist] = useState([]);
    useEffect(() =>{
      Axios.get(`http://localhost:3001/farmareaslist`).then((response) => {
          setarealist(response.data);
      })
    }, [])
    const register = () => {
        var a = document.forms["myform"]["ainput"].value;
        var b = document.forms["myform"]["binput"].value;
        var c = document.forms["myform"]["ccinput"].value;
        //var d = document.forms["myform"]["ddinput"].value;
        var e = document.forms["myform"]["einput"].value;
        var f = document.forms["myform"]["finput"].value;
        if (a == "" ||b == "" || c == "" || e == "" ||f == "") {
          alert("Required fields must be filled out");
        }
        /*if (c > d){
            alert("Planting period is expected to happen first before the harvest period. Please check both dates.");
        }*/
        else {
            Axios.post("http://localhost:3001/plantbatchadd", {plantid: harvestplantname, batchstatus: harveststatus, periodstart: newEvent.start, quantity: harvestquantity, area_id: area_id});
            navigate('/harvestcalendarlist', { replace: true });
            window.location.reload();
            alert("Batch recorded");
        }
      }
    return(
        <div className="App">
            <div class="headform">
            <h1 class="titleheadform">Add New Batch Harvest</h1>
            </div>
            <main class="container-fluid">
            <Link to="/harvestcalendarlist"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
                <form class="formdiv" name="myform" required>
                <div class="form-group">
                    <label for="exampleSelect1" class="form-label mt-4">Plant</label>
                    <select  name="ainput" required class="form-select" id="exampleSelect1" onChange={(e) =>{setharvestplantname(e.target.value)}}>
                        <option value="">Select Plant Category</option>
                        {plantprofilelist.map((val) => {
                          return (
                            <option value={val.plant_id}>{val.plant_id} {val.plant_name}</option>
                          )
                        })}
                    </select>
                    </div>
                <fieldset name="binput" class="form-group" onChange={(e) =>{setharveststatus(e.target.value)}} required>
                <legend class="mt-4">Status</legend>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios1" value="Active" defaultChecked/>
                  <label class="form-check-label" for="optionsRadios1">
                    Active
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios2" value="Inactive"/>
                  <label class="form-check-label" for="optionsRadios2">
                    Inactive
                  </label>
                </div>
              </fieldset>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Planting Period:</label>
                    <DatePicker name="ccinput" placeholderText='Start Date' style={{marginRight:"10px"}} selected={newEvent.start} onChange={(start) => setnewEvent({...newEvent, start})} />
                </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Quantity</label>
                    <input name="einput" type="text" class="form-control" placeholder="Quantity" id="inputDefault" onChange={(e) =>{setharvestquantity(e.target.value)}} required/>
                </div>
                <div class="form-group">
                    <label for="exampleSelect1" class="col-form-label mt-4">Area <em>(you can add new area in farm profiles)</em></label>
                    <select  name="finput" required class="form-select" id="exampleSelect1" onChange={(e) =>{ setarea_id(e.target.value) }}>
                        <option value="">Select Area</option>
                        {arealist.map((val) => {
                          return (
                            <option value={val.area_id}>{val.area_name} size: {val.size} hectares</option>
                          )
                        })}
                    </select>
                    </div>
                <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
                </form>
            </main>

        </div>
    )
}

export default Harvestcalendaradd;