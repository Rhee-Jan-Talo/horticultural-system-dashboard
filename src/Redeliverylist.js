import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Redeliverylist() {
    const [redlist, setredlist] = useState([])
    useEffect(() =>{
      Axios.get(`http://localhost:3001/redeliverylist`).then((response) => {
        setredlist(response.data);
      })
    }, [])
    const navigate = useNavigate();
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
    });
    const handleProceedHome = (e) => {
      navigate(generatePath("/home"));
      window.location.reload();
    };
    const [searchinput, setsearchinput] = useState("");
    return (
      <div className='App'>
          <div class="headform">
          <h1 class="titleheadform">Redelivery List</h1>
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
                        <th scope="col">Redelivery ID</th>
                        <th scope="col">Item</th>
                        <th scope="col">Supplier</th>
                        <th scope="col">Remarks</th>
                        <th scope="col">Date Redelivered</th>
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
                        else if(val.po_redelivery_id == searchinput){
                          return val
                        }
                      }).map((val)=> {
                            var cdate1 = (new Date(val.date_delivered)).toLocaleDateString();
                            return(
                              <tr class="table-active tractive">
                              <td scope="row">{val.po_redelivery_id}</td>
                              <td scope="row">{val.supply_name}</td>
                              <td scope="row">{val.company_name}</td>
                              <td scope="row">{val.remarks}</td>
                              <td scope="row">{cdate1}</td>
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

export default Redeliverylist;


