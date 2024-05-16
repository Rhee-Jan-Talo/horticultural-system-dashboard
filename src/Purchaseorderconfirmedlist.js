import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Purchaseorderconfirmedlist() {
    const [polist, setpolist] = useState([]);
    const po_status = "Active"
    useEffect(() =>{
      Axios.get(`http://localhost:3001/purchaseorderconfirmedlist/${po_status}`).then((response) => {
        setpolist(response.data);
      })
    }, [po_status])
    var id = 0
    function rowSelect(event) {
      id = event;
      console.log(id)
    }
    const navigate = useNavigate();
    const handleProceed = (e) => {
      if (id == 0){
        alert("Select a row to add.")
      }
      else {
        id && navigate(generatePath("/purchaseorderconfirmedinfo/:id", { id }));
      }
    };
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
    });
    const [searchinput, setsearchinput] = useState("");
    return (
      <div className='App'>
          <div class="headform">
          <h1 class="titleheadform">Confirmed Purchase Orders</h1>
        </div>
        <main class="container-fluid">
        <Link to="/purchaseorders"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceed}>View PO</button>
          <form class="d-flex">
            <input class="form-control me-sm-2" type="text" placeholder="Search ID or Name" onChange={(e) =>{setsearchinput(e.target.value)}}/>
          </form>
          <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Supplier</th>
                        <th scope="col">Total Amount</th>
                        <th scope="col">Date Confirmed</th>
                      </tr>
                    </thead>
                    <tbody>
                    {polist.filter((val)=>{
                        if(searchinput == ""){
                          return val
                        }
                        else if(val.company_name.toLowerCase().includes(searchinput.toLowerCase())){
                          return val
                        }
                        else if(val.final_po_id == searchinput){
                          return val
                        }
                      }).map((val)=> {
                      var cdate = (new Date(val.date_confirmed)).toLocaleDateString();
                        return (
                            <tr class="table-active tractive" onClick={rowSelect.bind(this, val.final_po_id)}>
                            <th scope="row">{val.final_po_id}</th>
                            <th scope="row">{val.company_name}</th>
                            <th scope="row">{formatter.format(val.total_amount)}</th>
                            <th scope="row">{cdate}</th>
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

export default Purchaseorderconfirmedlist;


