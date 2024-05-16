import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';


function Harvestcalendaronsale() {
    const batch_status = "On Sale"
    const [batchlist, setbatchlist] = useState([])
    useEffect(() =>{
    Axios.get(`http://localhost:3001/harvestbatchlist/${batch_status}`).then((response) => {
        setbatchlist(response.data);
    })
    }, [batch_status])
    var id = 0
    const navigate = useNavigate();
    function rowSelect(event) {
    id = event;
    console.log(id)
    }
    console.log("batch: ",batchlist)
    var id = 0
    const handleProceed = (e) => {
        if (id == 0){
          alert("Select a row to input.")
        }
        else {
          id && navigate(generatePath("/harvestinventoryinputvariations/:id", { id }));
        }
      };
    const handleProceedMedia = (e) => {
      if (id == 0){
        alert("Select a row to view.")
      }
      else {
        id && navigate(generatePath("/harvestinventorymedia/:id", { id }));
      }
    };
    const handleProceedVariations = (e) => {
      if (id == 0){
        alert("Select a row to view.")
      }
      else {
        id && navigate(generatePath("/harvestinventoryviewvariations/:id", { id }));
      }
    };
    const [searchinput, setsearchinput] = useState("");
  return (
    <div className='App'>
        <div class="headform">
        <h1 class="titleheadform">On Sale Batches List</h1>
        <main class="container-fluid">
      <Link to="/harvestinventory"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
      <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedMedia}>View Batch Media</button>
      <Link to="/harvestcalendarreadyforsale"><button type="button" class="btn btn-outline-info secondarybutton">View Ready for Sale Batches</button></Link>
      <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedVariations}>View Harvested Crops Variations</button>
      <Link to="/harvestinventoryallvariations"><button type="button" class="btn btn-outline-info secondarybutton">View On Sale Crops</button></Link>
      <form class="d-flex">
            <input class="form-control me-sm-2" type="text" placeholder="Search ID, Name, or Quality" onChange={(e) =>{setsearchinput(e.target.value)}}/>
          </form>
                <div class="tablediv">
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">Harvest ID</th>
                        <th scope="col">Batch ID</th>
                        <th scope="col">Plant Planted</th>
                        <th scope="col">Date Harvested</th>
                        <th scope="col">Batch Quality</th>
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
                        else if(val.harvest_id == searchinput){
                          return val
                        }
                        else if(val.batch_id == searchinput){
                          return val
                        }
                        else if(val.batch_quality.toLowerCase().includes(searchinput.toLowerCase())){
                          return val
                        }
                      }).map((val)=> {
                              var cdatey = (new Date(val.date_harvested)).toLocaleDateString();
                            return(
                                <tr class="table-active tractive" onClick={rowSelect.bind(this, val.harvest_id)}>
                                <td scope="row">{val.harvest_id}</td>
                                <td scope="row">{val.batch_id}</td>
                                <td scope="row">{val.plant_name}</td>
                                <td scope="row">{cdatey}</td>
                                <td scope="row">{val.batch_quality}</td>
                                <td scope="row">{val.remarks}</td>
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
export default Harvestcalendaronsale;
