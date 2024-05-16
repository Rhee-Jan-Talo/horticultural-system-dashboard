import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath, useParams } from 'react-router-dom';
import Axios from 'axios';


function Harvestcalendarstockouts() {
    const {values} = useParams();
    const w = JSON.parse(values)
    const wnew = JSON.stringify(w)
    const navigate = useNavigate();
    var x,y,z, ai, aid // x for id, y for start date, z for start, ai for title or act_increment
    console.log("wnew: ",wnew)
    for (var key in w) {
        if (w.hasOwnProperty(key)) {
            if (key === "id"){
            x = w[key]
            }
            if (key === "startd"){
            y = w[key]
            }
            if (key === "endd"){
            z = w[key]
            }
            if (key === "actinc"){
                ai = w[key]
            }
            if (key === "activities_id"){
                aid = w[key]
            }
        }
    }
    const handleProceed = (e) => {
        var withbatchid = {"id":x, "startd":y, "endd": z, "actinc": ai}
        withbatchid = JSON.stringify(withbatchid)
        withbatchid && navigate(generatePath("/harvestcalendarmonitoringevent/:withbatchid", { withbatchid }));
    };
  const [harvestactivitiesinfo, setharvestactivitiesinfo] = useState([]);
  useEffect(() =>{
    async function fetchData(){
        await Axios.get(`http://localhost:3001/harvestactivitiesinfo/${aid}`).then((response) => {
          setharvestactivitiesinfo(response.data);
    })
    }
    fetchData()
    }, [aid])
  const [soinfo, setsoinfo] = useState([]);
  useEffect(() =>{
    async function fetchData(){
        await Axios.get(`http://localhost:3001/stockoutharvestmonitoring/${aid}`).then((response) => {
          setsoinfo(response.data);
    })
    }
    fetchData()
    }, [aid])
  console.log(soinfo)
  return (
    <div className='App'>
        <div class="headform">
        <h1 class="titleheadform">Stockouts for Batch {x}'s Activity {ai}</h1>
        </div>
        <main class="container-fluid">
        <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
        <h5>Plant Activity ID: {aid}</h5>
        {harvestactivitiesinfo.map((val)=> {
          return (
            <div>
              <div class="viewdiv">
              <p><strong><h1>{val.activity}</h1></strong></p>
              </div>
              <div class="tablediv">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Stock Out ID</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Units</th>
                </tr>
              </thead>
              <tbody>
                {soinfo.map((valo)=> {
                  if (valo.assign_id == val.assign_id){
                    return(
                      <tr class="table-primary tractive">
                        <th scope="row">{valo.stockout_id}</th>
                        <th scope="row">{valo.supply_name}</th>
                        <th scope="row">{valo.soquantity}</th>
                        <th scope="row">{valo.units}</th>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </table>
          </div>
            </div>
          )
        })}
        </main>
      </div>
  );
}
export default Harvestcalendarstockouts;
 