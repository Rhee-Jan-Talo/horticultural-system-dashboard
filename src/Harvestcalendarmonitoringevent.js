import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath, useParams } from 'react-router-dom';
import Axios from 'axios';


function Harvestcalendarmonitoringevent() {
    const {values} = useParams();
    const w = JSON.parse(values)
    const wnew = JSON.stringify(w)
    console.log("wnew: ",wnew)
  var x,y,z, ai, remarks // x for id, y for start date, z for start, ai for title or act_increment
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
        if (key === "actinc"){
            ai = w[key]
        }
        if (key === "remarks"){
          remarks = w[key]
        }
    }
  }
  const [batchinfo, setbatchinfo] = useState([]);
  useEffect(() =>{
      Axios.get(`http://localhost:3001/plantbatchinfo/${x}`).then((response) => {
          setbatchinfo(response.data);
      })
  }, [x])
  const batchea = batchinfo[0]
  var thestatus
  for (var key in batchea) {
      if (batchea.hasOwnProperty(key)) {
          if (key === "batch_status"){
              thestatus = batchea[key]
          }
      }
    }
    console.log("remarks: ", remarks)
    const navigate = useNavigate();
    const handleProceed = (e) => {
        x && navigate(generatePath("/harvestcalendar/:x", { x }));
    };
    const [lastharvestmonitoringinfo, setlastharvestmonitoringinfo] = useState([]);
    useEffect(() =>{
        async function fetchData(){
            await Axios.get(`http://localhost:3001/harvestmonitoring/${x}`).then((response) => {
              setlastharvestmonitoringinfo(response.data);
        })
        }
        fetchData()
    }, [x])
    const [harvestmonitoringinfo, setharvestmonitoringinfo] = useState([]);
    useEffect(() =>{
        async function fetchData(){
            await Axios.get(`http://localhost:3001/harvestmonitoringevent/${x}/${ai}`).then((response) => {
            setharvestmonitoringinfo(response.data);
        })
        }
        fetchData()
    }, [x, ai])
    console.log("info: ", harvestmonitoringinfo)
    const ea = harvestmonitoringinfo[0]
    var i1
    for (var key in ea) {
        if (ea.hasOwnProperty(key)) {
            if (key === "activities_id"){
              i1 = ea[key]
            }
          }
      }
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
      console.log("dis: ", harvestdiseasesinfo)
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
    //to fetch activities list
    const [harvestactivitiesinfo, setharvestactivitiesinfo] = useState([]);
    useEffect(() =>{
      async function fetchData(){
          await Axios.get(`http://localhost:3001/harvestactivitiesinfo/${i1}`).then((response) => {
            setharvestactivitiesinfo(response.data);
      })
      }
      fetchData()
      }, [i1])
      const oa = harvestdiseasesinfo[0]
      var bid
      for (var key in oa) {
        if (oa.hasOwnProperty(key)) {
            if (key === "batch_id"){
              bid = oa[key]
            }
        }
      }
  const handleProceedDiseases = (e) => {
    var withbatchid = {"id":x, "startd":y, "endd": z, "actinc": ai, "batch_id": bid, "activities_id": i1}
    withbatchid = JSON.stringify(withbatchid)
    withbatchid && navigate(generatePath("/harvestcalendardiseases/:withbatchid", { withbatchid }));
  };
  const handleProceedMortalities = (e) => {
    var withbatchid = {"id":x, "startd":y, "endd": z, "actinc": ai, "batch_id": bid, "activities_id": i1}
    withbatchid = JSON.stringify(withbatchid)
    withbatchid && navigate(generatePath("/harvestcalendarinputmortalities/:withbatchid", { withbatchid }));
  };  
  const handleProceedActivity = (e) => {
    var withbatchid = {"id":x, "startd":y, "endd": z, "actinc": ai, "batch_id": bid, "activities_id": i1}
    withbatchid = JSON.stringify(withbatchid)
    withbatchid && navigate(generatePath("/harvestcalendarinputactivity/:withbatchid", { withbatchid }));
  };  
  const handleProceedView = (e) => {
    var withbatchid = {"id":x, "startd":y, "endd": z, "actinc": ai, "batch_id": bid, "activities_id": i1}
    withbatchid = JSON.stringify(withbatchid)
    withbatchid && navigate(generatePath("/harvestcalendarstockouts/:withbatchid", { withbatchid }));
  };
  var id = 0
  function rowSelect(event) {
    id = event;
    console.log(id)
  }
  const handleProceedStockout = (e) => {
    if (id == 0){
      alert("Select a plant activity.")
    }
    else {
      navigate(generatePath("/purchaseorderstockoutinventory/:wnew/:id", { wnew,id }));
    }
  };
  var cdatey = (new Date(y)).toLocaleDateString();
  var cdatez = (new Date(z)).toLocaleDateString()
  if(thestatus == "Active"){
    return (
      <div className='App'>
          <div class="headform">
          <h1 class="titleheadform">Plant Monitoring for Batch {x}'s Activity {ai}</h1>
          </div>
          <main class="container-fluid">
          <h6>From: {cdatey} To: {cdatez}</h6>
          <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedActivity}>Input Daily Activities</button>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedStockout}>Input Stock Out in Daily Activity</button>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedView}>View Stockouts in This Monitoring</button>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedDiseases}>Update Plant Diseases</button>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedMortalities}>Input Mortality Info</button>
          <br></br>
          <br></br>
          
          <div class="viewdiv">
            
            {harvestmonitoringinfo.map((val)=> {
              return (
                <div>
                  {lastharvestmonitoringinfo.map((valo)=> {
                    if(valo.act_increment != ai){
                      return(
                        <p><em>NOTE: These are the data inputted in this monitoring for the Monitoring and Activities Information. Not the latest data inputted.</em></p>
                      )
                    }
                    else{
                      return(
                        <p><em>NOTE: These are the latest data inputted.</em></p>
                      )
                    }
                  })}
                  <p><strong><h1>Monitoring Information</h1></strong></p>
                  <p><h2>Quantity: {val.quantity}</h2></p>
                  <p><h2>Stage: {val.plant_stage}</h2></p>
                  <p><h2>Survival Rate: {val.survival_rate}%</h2></p>
                  <p><h2>Average Height of Plants in Meters: {val.curr_height}m</h2></p>
                  <p><h2>Average Width of Plants in Meters: {val.curr_width}m</h2></p>
                  <p><h2>Remarks: {val.remarks}</h2></p>
                </div>
              )
            })}
            <br></br>
            <p><strong><h1>Activities Information</h1></strong></p>
          </div>
          <div class="tablediv">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Activity ID</th>
                    <th scope="col">Activity</th>
                    <th scope="col">Report</th>
                    <th scope="col">Managed by Employee</th>
                  </tr>
                </thead>
                <tbody>
                  {harvestactivitiesinfo.map((val)=> {
                    return (
                      <tr class="table-primary tractive" onClick={rowSelect.bind(this, val.assign_id)}>
                      <td scope="row">{val.assign_id}</td>
                      <td scope="row">{val.activity}</td>
                      <td scope="row">{val.report}</td>
                      <td scope="row">{val.emp_name}</td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <br></br>
            <div class="viewdiv"><p><strong><h1>Diseases Information</h1></strong></p></div>
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
                  let cdatey1 = (new Date(val.date_occured)).toLocaleDateString();
                  let cdatez2
                  if (val.date_cured != null){
                    cdatez2 = (new Date(val.date_cured)).toLocaleDateString()
                  }
                  else {
                    cdatez2 = ""
                  }
                    return (
                      <tr class="table-primary tractive">
                      <td scope="row">{val.disease_act_id}</td>
                      <td scope="row">{val.num_of_plants_affected}</td>
                      <td scope="row">{cdatey1}</td>
                      <td scope="row">{cdatez2}</td>
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
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {harvestmortalitiesinfo.map((val)=> {
                    let cdatey3 = (new Date(val.date)).toLocaleDateString();
                    return (
                      <tr class="table-primary tractive">
                      <td scope="row">{val.mortality_id}</td>
                      <td scope="row">{val.quantity_loss}</td>
                      <td scope="row">{cdatey3}</td>
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
  else{
    return (
      <div className='App'>
          <div class="headform">
          <h1 class="titleheadform">Plant Monitoring for Batch {x}'s Activity {ai} <em>(batch not active for input)</em></h1>
          </div>
          <main class="container-fluid">
          <h6>From: {cdatey} To: {cdatez}</h6>
          <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedView}>View Stockouts in This Monitoring</button>
          <br></br>
          <br></br>
          
          <div class="viewdiv">
            
            {harvestmonitoringinfo.map((val)=> {
              return (
                <div>
                  {lastharvestmonitoringinfo.map((valo)=> {
                    if(valo.act_increment != ai){
                      return(
                        <p><em>NOTE: These are the data inputted in this monitoring for the Monitoring and Activities Information. Not the latest data inputted.</em></p>
                      )
                    }
                    else{
                      return(
                        <p><em>NOTE: These are the latest data inputted.</em></p>
                      )
                    }
                  })}
                  <p><strong><h1>Monitoring Information</h1></strong></p>
                  <p><h2>Quantity: {val.quantity}</h2></p>
                  <p><h2>Stage: {val.plant_stage}</h2></p>
                  <p><h2>Survival Rate: {val.survival_rate}%</h2></p>
                  <p><h2>Average Height of Plants in Meters: {val.curr_height}m</h2></p>
                  <p><h2>Average Width of Plants in Meters: {val.curr_width}m</h2></p>
                  <p><h2>Remarks: {val.remarks}</h2></p>
                </div>
              )
            })}
            <br></br>
            <p><strong><h1>Activities Information</h1></strong></p>
          </div>
          <div class="tablediv">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Activity ID</th>
                    <th scope="col">Activity</th>
                    <th scope="col">Report</th>
                    <th scope="col">Managed by Employee</th>
                  </tr>
                </thead>
                <tbody>
                  {harvestactivitiesinfo.map((val)=> {
                    return (
                      <tr class="table-primary tractive" onClick={rowSelect.bind(this, val.assign_id)}>
                      <td scope="row">{val.assign_id}</td>
                      <td scope="row">{val.activity}</td>
                      <td scope="row">{val.report}</td>
                      <td scope="row">{val.emp_name}</td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <br></br>
            <div class="viewdiv"><p><strong><h1>Diseases Information</h1></strong></p></div>
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
                  let cdatey1 = (new Date(val.date_occured)).toLocaleDateString();
                  let cdatez2
                  if (val.date_cured != null){
                    cdatez2 = (new Date(val.date_cured)).toLocaleDateString()
                  }
                  else {
                    cdatez2 = ""
                  }
                    return (
                      <tr class="table-primary tractive">
                      <td scope="row">{val.disease_act_id}</td>
                      <td scope="row">{val.num_of_plants_affected}</td>
                      <td scope="row">{cdatey1}</td>
                      <td scope="row">{cdatez2}</td>
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
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {harvestmortalitiesinfo.map((val)=> {
                    let cdatey3 = (new Date(val.date)).toLocaleDateString();
                    return (
                      <tr class="table-primary tractive">
                      <td scope="row">{val.mortality_id}</td>
                      <td scope="row">{val.quantity_loss}</td>
                      <td scope="row">{cdatey3}</td>
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
}
export default Harvestcalendarmonitoringevent;
 