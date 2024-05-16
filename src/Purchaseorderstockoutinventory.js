import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath, useParams } from 'react-router-dom';
import Axios from 'axios';

function Purchaseorderstockoutinventory() {
    const { values } = useParams()
    const wnew = values
    const { assign_id } = useParams()
    const x = assign_id
  const [itemlist, setitemlist] = useState([]);
  useEffect(() =>{
    Axios.get('http://localhost:3001/stockoutitems').then((response) => {
      setitemlist(response.data);
    })
  }, [])
  var id = 0
  function rowSelect(event) {
    id = event;
    console.log(id)
  }
  const navigate = useNavigate();
  const handleProceed = (e) => {
    if (id == 0){
      alert("Select an item for stock out.")
    }
    else {
        navigate(generatePath("/purchaseorderstockoutinput/:wnew/:x/:id", { wnew,x,id }));
    }
  };
  const handleBack = (e) => {
    navigate(generatePath("/harvestcalendarmonitoringevent/:wnew", { wnew }));
  };
  const [searchinput, setsearchinput] = useState("");
  return (
    <div className='App'>
        <div class="headform">
        <h1 class="titleheadform">Stock Out Item for Daily Activity {x}</h1>
      </div>
      <main class="container-fluid">
      <button type="button" class="btn btn-outline-dark backbutton" onClick={handleBack}>Back</button>
        <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceed}>Select Item</button>
        <form class="d-flex">
            <input class="form-control me-sm-2" type="text" placeholder="Search ID or Name" onChange={(e) =>{setsearchinput(e.target.value)}}/>
          </form>
        <div class="tablediv">
            <table class="table table-hover">
                <thead>
                    <tr>
                      <th scope="col">Item ID</th>
                      <th scope="col">Item Name</th>
                      <th scope="col">Quantity On-Hand</th>
                      <th scope="col">Reorder Level Quantity</th>
                      <th scope="col">Unit of Measurement</th>
                    </tr>
                  </thead>
                  <tbody>
                      {itemlist.filter((val)=>{
                        if(searchinput == ""){
                          return val
                        }
                        else if(val.supply_name.toLowerCase().includes(searchinput.toLowerCase())){
                          return val
                        }
                        else if(val.supply_id == searchinput){
                          return val
                        }
                      }).map((val)=> {
                        if (val.quantity <= val.re_order_lvl) {
                          return (
                            <tr class="table-danger tractive" onClick={rowSelect.bind(this, val.supply_id)}>
                            <th scope="row">{val.supply_id}</th>
                            <th scope="row">{val.supply_name}</th>
                            <th scope="row">{val.quantity}</th>
                            <th scope="row">{val.re_order_lvl}</th>
                            <th scope="row">{val.units}</th>
                            </tr>
                          )
                        }
                        else {
                          return (
                            <tr class="table-primary tractive" onClick={rowSelect.bind(this, val.supply_id)}>
                            <th scope="row">{val.supply_id}</th>
                            <th scope="row">{val.supply_name}</th>
                            <th scope="row">{val.quantity}</th>
                            <th scope="row">{val.re_order_lvl}</th>
                            <th scope="row">{val.units}</th>
                            </tr>
                          )
                        }
                      })}
                  </tbody>
            </table>
            </div>
        </main>
      </div>
  );
}

export default Purchaseorderstockoutinventory;


