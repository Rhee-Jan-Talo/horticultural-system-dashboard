import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Farmprofiles() {
  const [farmlist, setfarmlist] = useState([]);
  var id = 0;
  const navigate = useNavigate();
  useEffect(() =>{
    Axios.get('http://localhost:3001/farmlist').then((response) => {
      setfarmlist(response.data);
    })
  }, [])
  const ea = farmlist[0]
  var i1
  for (var key in ea) {
    if (ea.hasOwnProperty(key)) {
        if (key === "farm_id"){
          i1 = ea[key]
          if (farmlist.length == undefined){
            i1 = "i1"
          }
        }
    }
  }
  console.log(farmlist.length)
  function rowSelect(event) {
    id = event;
    console.log(id)
  }
  const handleProceed = (e) => {
    if (id == 0){
      alert("Select a row to view.")
    }
    else {
      id && navigate(generatePath("/farmprofilesview/:id", { id }));
    }
  };
  const handleProceedArea = (e) => {
    if (id == 0){
      alert("Select a row to view.")
    }
    else {
      id && navigate(generatePath("/farmprofilesareas/:id", { id }));
    }
  };
  const handleProceedHome = (e) => {
    navigate(generatePath("/home"));
    window.location.reload();
  };
  if(farmlist.length == 0){
    return (
      <div className='App'>
          <div class="headform">
          <h1 class="titleheadform">Farm Profile</h1>
        </div>
        <main class="container-fluid">
        <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceedHome}>Back</button>
          <Link to="/farmprofilesadd"><button type="button" class="btn btn-outline-info secondarybutton">Add</button></Link>
          <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Farm Name</th>
                        <th scope="col">Size in Hectares</th>
                      </tr>
                    </thead>
                    <tbody>
                      {farmlist.map((val) => {
                        return (
                          <tr class="table-primary tractive" onClick={rowSelect.bind(this, val.farm_id)}>
                          <td scope="row">{val.farm_name}</td>
                          <td scope="row">{val.size}</td>
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
          <h1 class="titleheadform">Farm Profile</h1>
        </div>
        <main class="container-fluid">
        <Link to="/home"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceed}>View</button>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedArea}>Farm Areas</button>
          <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Farm Name</th>
                        <th scope="col">Size in Hectares</th>
                      </tr>
                    </thead>
                    <tbody>
                      {farmlist.map((val) => {
                        return (
                          <tr class="table-active tractive" onClick={rowSelect.bind(this, val.farm_id)}>
                          <th scope="row">{val.farm_name}</th>
                          <th scope="row">{val.size}</th>
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

export default Farmprofiles;
