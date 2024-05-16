import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath, useParams } from 'react-router-dom';
import Axios from 'axios';

function Iteminventorystockouthistory() {
    const navigate = useNavigate();
    const { supply_id } = useParams()
    const x = supply_id
  const [itemlist, setitemlist] = useState([]);
  useEffect(() =>{
    Axios.get(`http://localhost:3001/iteminventorystockouthistory/${x}`).then((response) => {
      setitemlist(response.data);
    })
  }, [x])
  const handleProceed = (e) => {
    x && navigate(generatePath("/iteminventorystockinhistoryfull/:x", { x }));
  };
  const handleProceedPartial = (e) => {
    x && navigate(generatePath("/iteminventorystockinhistorypartial/:x", { x }));
  };
  const [searchinput, setsearchinput] = useState("");
  return (
    <div className='App'>
        <div class="headform">
        <h1 class="titleheadform">Stock Out History for Item {x}</h1>
      </div>
      <main class="container-fluid">
      <Link to="/iteminventory"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
        <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceed}>View Fully Stocked In History</button>
        <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedPartial}>View Partial Stocked In History</button>
        <form class="d-flex">
            <input class="form-control me-sm-2" type="text" placeholder="Search ID" onChange={(e) =>{setsearchinput(e.target.value)}}/>
          </form>
        <div class="tablediv">
            <table class="table table-hover">
                <thead>
                    <tr>
                      <th scope="col">Stock Out ID</th>
                      <th scope="col">Quantity Stocked Out</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemlist.filter((val)=>{
                        if(searchinput == ""){
                          return val
                        }
                        else if(val.stockout_id == searchinput){
                          return val
                        }
                      }).map((val)=> {
                      var cdate = (new Date(val.date)).toLocaleDateString();
                        return (
                            <tr class="table-active tractive">
                                <th scope="col">{val.stockout_id}</th>
                                <th scope="col">{val.quantity}</th>
                                <th scope="col">{cdate}</th>
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

export default Iteminventorystockouthistory;


