import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';


function Harvestinventory() {
    const batch_status = "Harvested"
    const [batchlist, setbatchlist] = useState([])
    useEffect(() =>{
    Axios.get(`http://localhost:3001/plantbatchlist/${batch_status}`).then((response) => {
        setbatchlist(response.data);
    })
    }, [batch_status])
    var id = 0
    const navigate = useNavigate();
    function rowSelect(event) {
    id = event;
    console.log(id)
    }
    const [latestlist, setlatestlist] = useState([])
    useEffect(() =>{
    Axios.get(`http://localhost:3001/plantbatchlistlatestinfo`).then((response) => {
        setlatestlist(response.data);
    })
    }, [])
    console.log(batchlist)
    var id = 0
    const handleProceed = (e) => {
        if (id == 0){
          alert("Select a row to input.")
        }
        else {
          id && navigate(generatePath("/harvestinventoryinput/:id", { id }));
        }
      };
  const handleProceedHome = (e) => {
    navigate(generatePath("/home"));
    window.location.reload();
  };
  return (
    <div className='App'>
        <div class="headform">
        <h1 class="titleheadform">Harvested Inventory</h1>
        <main class="container-fluid">
        <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceedHome}>Back</button>
      <Link to="/harvestcalendarreadyforsale"><button type="button" class="btn btn-outline-info secondarybutton">View Ready for Sale Batches</button></Link>
      <Link to="/harvestcalendaronsale"><button type="button" class="btn btn-outline-info secondarybutton">View On Sale Batches</button></Link>
      <Link to="/harvestinventoryallvariations"><button type="button" class="btn btn-outline-info secondarybutton">View On Sale Crops</button></Link>

        </main>
      </div>
      </div>
  );
}
export default Harvestinventory;
