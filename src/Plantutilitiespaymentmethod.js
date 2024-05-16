import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Plantutilitiespaymentmethod() {
  const [pmname, setpmname] = useState("")
  const [pmlist, setpmlist] = useState([]);
  useEffect(() =>{
    Axios.get('http://localhost:3001/plantutilitiespaymentmethod').then((response) => {
        setpmlist(response.data);
    })
  }, [])
  const [atypeinfo, setatypeinfo] = useState("");
  const [isLoading, setLoading] = useState(true);
  Axios.get(`http://localhost:3001/atype`).then((response) => {
    setatypeinfo(response.data);
        setLoading(false);
      })
  console.log("type", atypeinfo)
  const navigate = useNavigate();
  const submitPlantType = () => {
    var a = document.forms["myform"]["ainput"].value;
    if (a == ""){
      alert("No input")
    }
    else{
      let checker = 0
      for (let i = 0; i < pmlist.length; i++){
        for (var key in pmlist[i]){
          if(pmlist[i].hasOwnProperty(key)){
            if(key === "paymentmethod_name"){
              if (pmlist[i][key] == pmname){
                checker = 1
              }
            }
        }
      }
      }
      if (checker == 0){
        Axios.post("http://localhost:3001/plantutilitiespaymentmethodadd", {paymentmethod_name: pmname});
        setpmlist([...pmlist, {paymentmethod_name: pmname}]);
        navigate('/plantutilitiespaymentmethod', { replace: true });
        window.location.reload();
        alert("Payment Method Recorded")
      }
      else {
        alert("Payment method already existed.")
      }
    }
    
  };
  if (isLoading) {
    return (<div className="App">Loading...</div>)
  }
  if(atypeinfo == "Admin"){
    return (
      <div className='App'>
          <div class="headform">
        <h1 class="titleheadform">Utilities for Payment Method</h1>
      </div>
      <main class="container-fluid">
      <Link to="/plantutilities"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
          <div class="formdiv">
              <form class="formdiv" name="myform" required>
              <div class="input-group mb-3">
              <input name="ainput" type="text" class="form-control" placeholder="Plant Type" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) =>{
            setpmname(e.target.value)
          }}/>
              <button class="btn btn-primary" type="button" id="button-addon2" onClick={submitPlantType}>Add</button>
          </div>
              </form>
          </div>
          <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Registered Payment Method</th>
                      </tr>
                    </thead>
                    <tbody>
                    {pmlist.map((val) => {
                            return(
                              <tr class="table-active tractive">
                              <td scope="row">{val.paymentmethod_name}</td>
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
  else {
    return (
      <div className='App'>
          <div class="headform">
        <h1 class="titleheadform">Utilities for Payment Method</h1>
      </div>
      <main class="container-fluid">
      <Link to="/plantutilities"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
          
          <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Registered Payment Method</th>
                      </tr>
                    </thead>
                    <tbody>
                    {pmlist.map((val) => {
                            return(
                              <tr class="table-active tractive">
                              <td scope="row">{val.paymentmethod_name}</td>
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
}

export default Plantutilitiespaymentmethod;
