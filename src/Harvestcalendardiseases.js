import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath, useParams } from 'react-router-dom';
import Axios from 'axios';


function Harvestcalendardiseases() {
    const {values} = useParams();
    const w = JSON.parse(values)
    const wnew = JSON.stringify(w)
    const navigate = useNavigate();
    var x,y,z, ai, bid // x for id, y for start date, z for start, ai for title or act_increment
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
            if (key === "batch_id"){
                bid = w[key]
            }
        }
    }
    const handleProceed = (e) => {
        var withbatchid = {"id":x, "startd":y, "endd": z, "actinc": ai}
        withbatchid = JSON.stringify(withbatchid)
        withbatchid && navigate(generatePath("/harvestcalendarmonitoringevent/:withbatchid", { withbatchid }));
    };
    const handleProceedDiseases = (e) => {
        wnew && navigate(generatePath("/harvestcalendarinputdiseases/:wnew", { wnew }));
    };
    const handleProceedUpdate = (e) => {
        if (id == 0){
          alert("Select a disease to update.")
        }
        else {
            var withbatchid = {"id":x, "startd":y, "endd": z, "actinc": ai, "did": id}
            console.log("with: ",withbatchid)
            withbatchid = JSON.stringify(withbatchid)
            withbatchid && navigate(generatePath("/harvestcalendarupdatediseases/:withbatchid", { withbatchid }));
        }
      };
    var id = 0;
    function rowSelect(event) {
        id = event;
        console.log(id)
      }
    
    const [harvestdiseasesinfo, setharvestdiseasenfo] = useState([]);
    useEffect(() =>{
      async function fetchData(){
          await Axios.get(`http://localhost:3001/harvestdiseaseslist/${x}`).then((response) => {
            setharvestdiseasenfo(response.data);
      })
      }
      fetchData()
      }, [x])
      console.log(bid)
  return (
    <div className='App'>
        <div class="headform">
        <h1 class="titleheadform">Plant Diseases for Batch {bid}</h1>
        </div>
        <main class="container-fluid">
        <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
        <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedDiseases}>Input New Disease</button>
        <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedUpdate}>Update Disease Status</button>
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
                  var cdatey = (new Date(val.date_occured)).toLocaleDateString();
                  var cdatez
                  if (val.date_cured != null){
                    cdatez = (new Date(val.date_cured)).toLocaleDateString()
                  }
                  else {
                    cdatez = ""
                  }
                  return (
                    <tr class="table-active tractive" onClick={rowSelect.bind(this, val.disease_act_id)}>
                    <td scope="row">{val.disease_act_id}</td>
                    <td scope="row">{val.num_of_plants_affected}</td>
                    <td scope="row">{cdatey}</td>
                    <td scope="row">{cdatez}</td>
                    <td scope="row">{val.disease_desc}</td>
                    <td scope="row">{val.dis_status}</td>
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
export default Harvestcalendardiseases;
 