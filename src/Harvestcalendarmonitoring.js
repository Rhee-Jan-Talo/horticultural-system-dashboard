import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath, useParams } from 'react-router-dom';
import Axios from 'axios';


function Harvestcalendarmonitoring() {
    const {values} = useParams();
    const w = JSON.parse(values)
    const wnew = JSON.stringify(w)
    console.log("wnew: ",wnew)
    const handleProceedInput = (e) => {
      wnew && navigate(generatePath("/harvestcalendarinputmonitoring/:wnew", { wnew }));
  };
    var x,y,z // x for id, y for start date, z for start
    console.log("wnew: ",wnew)
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
      }
    }
    var yy = new Date(y);
    var zz = new Date(z);
    function convertTZ(date, tzString) {
      return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
    }
    const ydate = convertTZ(yy, "Asia/Manila")
    const zdate = convertTZ(zz, "Asia/Manila")
    console.log("start manila: ", ydate)
    console.log("end manila: ", zdate)
    //alert("Plant Monitoring for Batch "+x+"\nFrom: "+ydate+"\nTo: "+zdate)
    const navigate = useNavigate();
    const handleProceed = (e) => {
      x && navigate(generatePath("/harvestcalendar/:x", { x }));
    };
    const [harvestmonitoringinfo, setharvestmonitoringinfo] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() =>{
      async function fetchData(){
          await Axios.get(`http://localhost:3001/harvestmonitoring/${x}`).then((response) => {
            setharvestmonitoringinfo(response.data);
            setLoading(false);
      })
      }
      fetchData()
  }, [x])
    //to fetch disease list
    const [harvestdiseasesinfo, setharvestdiseasenfo] = useState([]);
    useEffect(() =>{
      async function fetchData(){
          await Axios.get(`http://localhost:3001/harvestdiseaseslist/${x}`).then((response) => {
            setharvestdiseasenfo(response.data);
      })
      }
      fetchData()
      }, [x])
    //to fetch mortalities list
    const [harvestmortalitiesinfo, setharvestmortalitiesinfo] = useState([]);
    useEffect(() =>{
      async function fetchData(){
          await Axios.get(`http://localhost:3001/harvestmortalitiesinfo/${x}`).then((response) => {
            setharvestmortalitiesinfo(response.data);
      })
      }
      fetchData()
      }, [x])
    var cdatey = (new Date(y)).toLocaleDateString();
    var cdatez = (new Date(z)).toLocaleDateString();
    console.log("harvest", harvestmonitoringinfo)
    if (isLoading) {
      return <div className="App">Loading...</div>;
    }
    if (harvestmonitoringinfo.length > 0){
      return (
        <div className='App'>
            <div class="headform">
            <h1 class="titleheadform">Plant Monitoring for Batch {x}</h1>
            <h6>From: {cdatey} To: {cdatez}</h6>
            </div>
            <main class="container-fluid">
            <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
            <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedInput}>Input Stages and Growth</button>
            <br></br>
            <br></br>
            
            <div class="viewdiv">
            <p><em>NOTE: These are latest data inputted in the latest monitoring.</em></p>
            <p><strong><h1>Monitoring Information</h1></strong></p>
              
              {harvestmonitoringinfo.map((val)=> {
                return (
                  <div>
                    <p><h2>Quantity: {val.quantity}</h2></p>
                    <p><h2>Stage: {val.plant_stage}</h2></p>
                    <p><h2>Survival Rate: {val.survival_rate}%</h2></p>
                    <p><h2>Average Height of Plants in Meters: {val.curr_height}m</h2></p>
                    <p><h2>Average Width of Plants in Meters:{val.curr_width}m</h2></p>
                    <p><h2>Remarks: {val.remarks}</h2></p>
                  </div>
                )
              })}
              <br></br>
              <div class="viewdiv"><p><strong><h1>Diseases Information</h1></strong></p></div>
            </div>
              
              <div class="tablediv">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Disease Activity ID</th>
                      <th scope="col">Quantity Affected</th>
                      <th scope="col">Date Occured</th>
                      <th scope="col">Date Cured</th>
                      <th scope="col">Disease Description</th>
                      <th scope="col">Disease Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {harvestdiseasesinfo.map((val)=> {
                      return (
                        <tr>
                        <td scope="row">{val.disease_act_id}</td>
                        <td scope="row">{val.num_of_plants_affected}</td>
                        <td scope="row">{val.date_occured}</td>
                        <td scope="row">{val.date_cured}</td>
                        <td scope="row">{val.disease_desc}</td>
                        <td scope="row">{val.dis_status}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div class="viewdiv"><p><strong><h1>Mortalities Information</h1></strong></p></div>
              <div class="tablediv">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Mortality ID</th>
                      <th scope="col">Quantity Loss</th>
                      <th scope="col">Units</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {harvestmortalitiesinfo.map((val)=> {
                      return (
                        <tr>
                        <td scope="row">{val.mortality_id}</td>
                        <td scope="row">{val.quantity_loss}</td>
                        <td scope="row">{val.units}</td>
                        <td scope="row">{val.date}</td>
                      </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </main>
            
          </div>
      );
    }
    else {
      return (
        <div className='App'>
            <div class="headform">
            <h1 class="titleheadform">Plant Monitoring for Batch {x}</h1>
            <h6>From: {cdatey} To: {cdatez}</h6>
            </div>
            <main class="container-fluid">
            <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
            <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedInput}>Input Stages and Growth</button>
            <br></br>
            <br></br>
            <div class="viewdiv"><p><strong><h1>No data yet</h1></strong></p></div>
            </main>
            
          </div>
      );
    }
}
export default Harvestcalendarmonitoring;
 