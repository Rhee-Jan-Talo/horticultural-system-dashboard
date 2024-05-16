import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Plantprofiles() {
  const [plantprofilelist, setplantprofilelist] = useState([]);
  useEffect(() =>{
    Axios.get('http://localhost:3001/plantprofile').then((response) => {
      setplantprofilelist(response.data);
    })
  }, [])
  const [atypeinfo, setatypeinfo] = useState("");
  const [isLoading, setLoading] = useState(true);
  Axios.get(`http://localhost:3001/atype`).then((response) => {
    setatypeinfo(response.data);
        setLoading(false);
      })
  console.log("type", atypeinfo)
  console.log("pr: ",plantprofilelist)
  var id = 0;
  function rowSelect(event) {
    id = event;
    console.log(id)
  }
  const navigate = useNavigate();
  const handleProceed = (e) => {
    if (id == 0){
      alert("Select a row to view.")
    }
    else {
      id && navigate(generatePath("/plantprofilesview/:id", { id }));
    }
  };
  const handleProceedEdit = (e) => {
    if (id == 0){
      alert("Select a row to edit.")
    }
    else {
      id && navigate(generatePath("/plantprofilesedit/:id", { id }));
    }
  };
  const handleProceedHome = (e) => {
    navigate(generatePath("/home"));
    window.location.reload();
  };
  const [searchinput, setsearchinput] = useState("");
  if (isLoading) {
    return (<div className="App">Loading...</div>)
  }
  if(atypeinfo == "Admin"){
    return (
      <div className='App'>
          <div class="headform">
          <h1 class="titleheadform">Plant Profiles</h1>
        </div>
        <main class="container-fluid">
        <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceedHome}>Back</button>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceed}>View</button>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedEdit}>Edit</button>
          <Link to="/plantprofilesadd"><button type="button" class="btn btn-outline-info secondarybutton">Add</button></Link>
          <form class="d-flex">
              <input class="form-control me-sm-2" type="text" placeholder="Search ID or Name" onChange={(e) =>{setsearchinput(e.target.value)}}/>
            </form>
          <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Plant ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Variety</th>
                        <th scope="col">Category</th>
                        <th scope="col">Estimate # of Months to be Harvested</th>
                      </tr>
                    </thead>
                    <tbody>
                    {plantprofilelist.filter((val)=>{
                          if(searchinput == ""){
                            return val
                          }
                          else if(val.plant_name.toLowerCase().includes(searchinput.toLowerCase())){
                            return val
                          }
                          else if(val.plant_id == searchinput){
                            return val
                          }
                        }).map((val) => {
                            return(
                              <tr class="table-active tractive" onClick={rowSelect.bind(this, val.plant_id)}>
                                <th scope="row">{val.plant_id}</th>
                                <th scope="row">{val.plant_name}</th>
                                <th scope="row">{val.variety}</th>
                                <th scope="row">{val.category}</th>
                                <th scope="row">{val.num_of_mon_to_harvest}</th>
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
          <h1 class="titleheadform">Plant Profiles</h1>
        </div>
        <main class="container-fluid">
        <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceedHome}>Back</button>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceed}>View</button>
          <form class="d-flex">
              <input class="form-control me-sm-2" type="text" placeholder="Search ID or Name" onChange={(e) =>{setsearchinput(e.target.value)}}/>
            </form>
          <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Plant ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Variety</th>
                        <th scope="col">Category</th>
                        <th scope="col">Estimate # of Months to be Harvested</th>
                      </tr>
                    </thead>
                    <tbody>
                    {plantprofilelist.filter((val)=>{
                          if(searchinput == ""){
                            return val
                          }
                          else if(val.plant_name.toLowerCase().includes(searchinput.toLowerCase())){
                            return val
                          }
                          else if(val.plant_id == searchinput){
                            return val
                          }
                        }).map((val) => {
                            return(
                              <tr class="table-active tractive" onClick={rowSelect.bind(this, val.plant_id)}>
                                <th scope="row">{val.plant_id}</th>
                                <th scope="row">{val.plant_name}</th>
                                <th scope="row">{val.variety}</th>
                                <th scope="row">{val.category}</th>
                                <th scope="row">{val.num_of_mon_to_harvest}</th>
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

export default Plantprofiles;