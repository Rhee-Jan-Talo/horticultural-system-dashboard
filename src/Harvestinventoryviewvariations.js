import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath, useParams } from 'react-router-dom';
import Axios from 'axios';


function Harvestinventoryviewvariations() {
    const { harvest_id } = useParams();
    const x = harvest_id
    const y = "Active"
  const [batchlist, setbatchlist] = useState([])
  useEffect(() =>{
    Axios.get(`http://localhost:3001/harvestvariationsinfo/${x}/${y}`).then((response) => {
      setbatchlist(response.data);
    })
  }, [x, y])
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
  });
  return (
    <div className='App'>
        <div class="headform">
        <h1 class="titleheadform">Variations List of Harvest {x}</h1>
        <main class="container-fluid">
      <Link to="/harvestcalendaronsale"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
            <div class="tablediv">
            <table class="table table-hover">
                <thead>
                    <tr>
                      <th scope="col">Quantity ID</th>
                      <th scope="col">Grade</th>
                      <th scope="col">Quantity Harvested</th>
                      <th scope="col">Units</th>
                      <th scope="col">Price per Unit</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                      <tbody>
                        {batchlist.map((val)=> {
                          return(
                            <tr class="table-active tractive">
                            <td scope="row">{val.quantity_id}</td>
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
export default Harvestinventoryviewvariations;
