import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Refundlist() {
    const [redlist, setredlist] = useState([])
    useEffect(() =>{
      Axios.get(`http://localhost:3001/redefundlist`).then((response) => {
        setredlist(response.data);
      })
    }, [])
    const navigate = useNavigate();
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
    });
    console.log("ref", redlist)
    const handleProceedHome = (e) => {
      navigate(generatePath("/home"));
      window.location.reload();
    };
    const [searchinput, setsearchinput] = useState("");
    return (
      <div className='App'>
          <div class="headform">
          <h1 class="titleheadform">Refund List</h1>
          <main class="container-fluid">
          <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceedHome}>Back</button>
        <br></br>
        <form class="d-flex">
            <input class="form-control me-sm-2" type="text" placeholder="Search ID, Item, or Supplier" onChange={(e) =>{setsearchinput(e.target.value)}}/>
          </form>
              <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Refund ID</th>
                        <th scope="col">Item</th>
                        <th scope="col">Supplier</th>
                        <th scope="col">Remarks</th>
                        <th scope="col">Date Refunded</th>
                        <th scope="col">Payment Method</th>
                        <th scope="col">Account ID</th>
                        <th scope="col">Account Name</th>
                        <th scope="col">Refunded Amount</th>
                      </tr>
                    </thead>
                        <tbody>
                          {redlist.filter((val)=>{
                        if(searchinput == ""){
                          return val
                        }
                        else if(val.supply_name.toLowerCase().includes(searchinput.toLowerCase())){
                          return val
                        }
                        else if(val.company_name.toLowerCase().includes(searchinput.toLowerCase())){
                          return val
                        }
                        else if(val.po_refund_id == searchinput){
                          return val
                        }
                      }).map((val)=> {
                            var cdate1 = (new Date(val.date)).toLocaleDateString();
                            return(
                              <tr class="table-active tractive">
                              <td scope="row">{val.po_refund_id}</td>
                              <td scope="row">{val.supply_name}</td>
                              <td scope="row">{val.company_name}</td>
                              <td scope="row">{val.remarks}</td>
                              <td scope="row">{val.refunddate}</td>
                              <td scope="row">{val.payment_method}</td>
                              <td scope="row">{val.account_id}</td>
                              <td scope="row">{val.account_name}</td>
                              <td scope="row">{formatter.format(val.amount)}</td>
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

export default Refundlist;


