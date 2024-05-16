import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath, useParams } from 'react-router-dom';
import Axios from 'axios';

function Purchaseorderhistory() {
    const navigate = useNavigate();
    const po_status = "Paid"
    const [polist, setpolist] = useState([]);
    useEffect(() =>{
      Axios.get(`http://localhost:3001/purchaseorderconfirmedlist/${po_status}`).then((response) => {
        setpolist(response.data);
      })
    }, [po_status])
    console.log(polist)
    var id = 0
    function rowSelect(event) {
      id = event;
      console.log(id)
    }
    const handleProceed = (e) => {
      if (id == 0){
        alert("Select a row to edit.")
      }
      else {
        id && navigate(generatePath("/purchaseorderstockin/:id", { id }));
        window.location.reload()
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
          <h1 class="titleheadform">Paid Purchase Orders</h1>
        </div>
        <main class="container-fluid">
        <Link to="/purchaseorders"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
        <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceed}>Stock In PO</button>
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
                        <th scope="col">Date Paid</th>
                        <th scope="col">Status</th>
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
                        var cdate = (new Date(val.date_paid)).toLocaleDateString();
                        return (
                            <tr class="table-active tractive" onClick={rowSelect.bind(this, val.final_po_id)}>
                            <th scope="row">{val.final_po_id}</th>
                            <th scope="row">{val.company_name}</th>
                            <th scope="row">{formatter.format(val.total_amount)}</th>
                            <th scope="row">{cdate}</th>
                            <th scope="row">{val.po_status}</th>
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

export default Purchaseorderhistory;


