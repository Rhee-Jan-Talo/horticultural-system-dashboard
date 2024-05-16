import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';


function Harvestcalendarlist() {
  const batch_status = "Active"
  const [batchlist, setbatchlist] = useState([])
  useEffect(() =>{
    Axios.get(`http://localhost:3001/plantbatchlist/${batch_status}`).then((response) => {
      setbatchlist(response.data);
    })
  }, [batch_status])
  console.log("batch: ",batchlist)
  const [latestlist, setlatestlist] = useState([])
  useEffect(() =>{
    Axios.get(`http://localhost:3001/plantbatchlistlatestinfo`).then((response) => {
      setlatestlist(response.data);
    })
  }, [])
  var id = 0
  const navigate = useNavigate();
  function rowSelect(event) {
    id = event;
    console.log(id)
  }
  const handleProceed = (e) => {
    if (id == 0){
      alert("Select a row to view.")
    }
    else {
      id && navigate(generatePath("/harvestcalendar/:id", { id }));
    }
  };
  const handleProceedEdit = (e) => {
    if (id == 0){
      alert("Select a row to edit.")
    }
    else {
      id && navigate(generatePath("/harvestcalendaredit/:id", { id }));
    }
  };
  const dayslist= []
  const [allDays, setalldays] = useState(dayslist)
  var msDay = 60*60*24*1000
  useEffect(() =>{
    (async function(){
        try {
            batchlist.forEach((info)=>{
                const datef = new Date().getDate()
                const datet = new Date(info.expected_harvest_period)
                const batchid = info.batch_id
                var newday = Math.floor((datet - datef)/ msDay)
                var newDays = {id: batchid, timeleft: newday}
                console.log("from: ", datef)
                console.log("to: ", datet)
                console.log("newday: ", newday)
                setalldays (prevState => [...prevState, newDays])
            })
        }
        catch (e) {
            console.error(e);
          }
      })()
  }, [batchlist])
  const handleProceedHome = (e) => {
    navigate(generatePath("/home"));
    window.location.reload();
  };
  const handleProceedInput = (e) => {
    if (id == 0){
      alert("Select a row to input.")
    }
    else {
      id && navigate(generatePath("/harvestinventoryinput/:id", { id }));
    }
  };
  const [searchinput, setsearchinput] = useState("");
  return (
    <div className='App'>
        <div class="headform">
        <h1 class="titleheadform">Harvest Calendar Active List</h1>
        <main class="container-fluid">
        <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceedHome}>Back</button>
      <Link to="/harvestcalendaradd"><button type="button" class="btn btn-outline-info secondarybutton">Add New Batch</button></Link>
      <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceed}>View Harvest Calendar</button>
      <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedEdit}>Edit Batch Harvest</button>
      <Link to="/harvestcalendarlistinactive"><button type="button" class="btn btn-outline-info secondarybutton">View Inactive Batches</button></Link>
      <Link to="/harvestcalendarharvested"><button type="button" class="btn btn-outline-info secondarybutton">View Harvested Batches</button></Link>
      <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedInput}>Input for Sales</button>
      <form class="d-flex">
            <input class="form-control me-sm-2" type="text" placeholder="Search ID, Name, or Area" onChange={(e) =>{setsearchinput(e.target.value)}}/>
          </form>
            <div class="tablediv">
            <table class="table table-hover">
                <thead>
                    <tr>
                      <th scope="col">Batch ID</th>
                      <th scope="col">Plant Planted</th>
                      <th scope="col">Status</th>
                      <th scope="col">Area</th>
                      <th scope="col">Current Stage</th>
                      <th scope="col">Survival Rate</th>
                      <th scope="col">Current Count</th>
                      <th scope="col">Remarks</th>
                    </tr>
                  </thead>
                      <tbody>
                        {batchlist.filter((val)=>{
                        if(searchinput == ""){
                          return val
                        }
                        else if(val.plant_name.toLowerCase().includes(searchinput.toLowerCase())){
                          return val
                        }
                        else if(val.area_name.toLowerCase().includes(searchinput.toLowerCase())){
                          return val
                        }
                        else if(val.batch_id == searchinput){
                          return val
                        }
                      }).map((val)=> {
                          return(
                            <tr class="table-active tractive" onClick={rowSelect.bind(this, val.batch_id)}>
                            <td scope="row">{val.batch_id}</td>
                            <td scope="row">{val.plant_name}</td>
                            <td scope="row">{val.batch_status}</td>
                            <td scope="row">{val.area_name}</td>
                            {latestlist.map((valo)=> {
                              if(valo.batch_id == val.batch_id){
                                return(
                                  <td scope="row">{valo.plant_stage}</td>
                                )
                              }
                            })}
                            {latestlist.map((valo)=> {
                              if(valo.batch_id == val.batch_id){
                                return(
                                  <td scope="row">{valo.survival_rate}%</td>
                                )
                              }
                            })}
                            {latestlist.map((valo)=> {
                              if(valo.batch_id == val.batch_id){
                                return(
                                  <td scope="row">{valo.quantity}</td>
                                )
                              }
                            })}
                            {latestlist.map((valo)=> {
                              if(valo.batch_id == val.batch_id){
                                return(
                                  <td scope="row">{valo.remarks}</td>
                                )
                              }
                            })}
                            </tr>
                          )
                        })}
                      </tbody>
            </table>
            </div>
        </main>
      </div>
      </div>
  );
}
export default Harvestcalendarlist;
