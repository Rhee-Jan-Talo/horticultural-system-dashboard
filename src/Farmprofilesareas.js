import React, { useState, useEffect, useCallback } from "react";
import './App.css';
import { Link, useNavigate, generatePath, useParams } from 'react-router-dom';
import Axios from 'axios';

function Farmprofilesareas() {
    const { farm_id } = useParams()
    const x = farm_id
  const [arealist, setarealist] = useState([]);
  var id = 0;
  const navigate = useNavigate();
  useEffect(() =>{
    Axios.get(`http://localhost:3001/farmareas/${x}`).then((response) => {
        setarealist(response.data);
    })
  }, [x])
  console.log("area", arealist)
  function rowSelect(event) {
    id = event;
    alert(id)
  }
  const handleProceed = (e) => {
    if (id == 0){
      alert("Select a row to edit.")
    }
    else {
      id && navigate(generatePath("/farmprofilesareasedit/:id", { id }));
    }
  };
  const handleProceedAdd = (e) => {
    x && navigate(generatePath("/farmprofilesareasadd/:x", { x }));
  };
  const [searchinput, setsearchinput] = useState("");
  return (
    <div className='App'>
          <div class="headform">
          <h1 class="titleheadform">Farm Areas</h1>
        </div>
        <main class="container-fluid">
        <Link to="/farmprofiles"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedAdd}>Add Area</button>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceed}>Edit Area</button>
          <form class="d-flex">
            <input class="form-control me-sm-2" type="text" placeholder="Search ID or Name" onChange={(e) =>{setsearchinput(e.target.value)}}/>
          </form>
          <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Area ID</th>
                        <th scope="col">Area Name</th>
                        <th scope="col">Soil Type</th>
                        <th scope="col">Size in Hectares</th>
                      </tr>
                    </thead>
                    <tbody>
                      {arealist.filter((val)=>{
                        if(searchinput == ""){
                          return val
                        }
                        else if(val.area_name.toLowerCase().includes(searchinput.toLowerCase())){
                          return val
                        }
                        else if(val.area_id == searchinput){
                          return val
                        }
                      }).map((val) => {
                        return (
                          <tr class="table-primary tractive" onClick={rowSelect.bind(this, val.area_id)}>
                          <td scope="row">{val.area_id}</td>
                          <td scope="row">{val.area_name}</td>
                          <td scope="row">{val.soil_type}</td>
                          <td scope="row">{val.size} hectares</td>
                        </tr>
                        )
                      })}
                    </tbody>
              </table>
          </div>
          </main>
        </div>
  )
}

export default Farmprofilesareas;
