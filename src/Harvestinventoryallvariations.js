import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath, useParams } from 'react-router-dom';
import Axios from 'axios';


function Harvestinventoryallvariations() {
  const y = "Active"
  const [batchlist, setbatchlist] = useState([])
  useEffect(() =>{
    Axios.get(`http://localhost:3001/harvestvariationslist/${y}`).then((response) => {
      setbatchlist(response.data);
    })
  }, [y])
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
  });
  const [searchinput, setsearchinput] = useState("");
  return (
    <div className='App'>
        <div class="headform">
        <h1 class="titleheadform">Variations List On Sale</h1>
        <main class="container-fluid">
      <Link to="/harvestinventory"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
      <form class="d-flex">
            <input class="form-control me-sm-2" type="text" placeholder="Search ID, Name, or Quality" onChange={(e) =>{setsearchinput(e.target.value)}}/>
          </form>
            <div class="tablediv">
            <table class="table table-hover">
                <thead>
                    <tr>
                      <th scope="col">Quantity ID</th>
                      <th scope="col">Harvest ID</th>
                      <th scope="col">Plant</th>
                      <th scope="col">Grade</th>
                      <th scope="col">Quantity Harvested</th>
                      <th scope="col">Units</th>
                      <th scope="col">Price per Unit</th>
                      <th scope="col">Active</th>
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
                        else if(val.harvest_id == searchinput){
                          return val
                        }
                        else if(val.quantity_id == searchinput){
                          return val
                        }
                        else if(val.grade.toLowerCase().includes(searchinput.toLowerCase())){
                          return val
                        }
                      }).map((val)=> {
                          
                          return(
                            <tr class="table-active tractive">
                            <td scope="row">{val.quantity_id}</td>
                            <td scope="row">{val.harvest_id}</td>
                            <td scope="row">{val.plant_name}</td>
                            <td scope="row">{val.grade}</td>
                            <td scope="row">{val.quantity_harvested}</td>
                            <td scope="row">{val.units}</td>
                            <td scope="row">{formatter.format(val.price_per_unit)}</td>
                            <td scope="row">{val.var_status}</td>
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
export default Harvestinventoryallvariations;
