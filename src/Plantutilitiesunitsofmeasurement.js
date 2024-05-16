import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Plantutilitiesunitsofmeasurement() {
  const [unitname, setunitname] = useState("")
  const [unitslist, setunitslist] = useState([]);
  useEffect(() =>{
    Axios.get('http://localhost:3001/plantutilitiesunitsofmeasurement').then((response) => {
        setunitslist(response.data);
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
      for (let i = 0; i < unitslist.length; i++){
        for (var key in unitslist[i]){
          if(unitslist[i].hasOwnProperty(key)){
            if(key === "unit_name"){
              if (unitslist[i][key] == unitname){
                checker = 1
              }
            }
        }
      }
      }
      if (checker == 0){
        Axios.post("http://localhost:3001/plantutilitiesunitsofmeasurementadd", {unit_name: unitname});
        setunitslist([...unitslist, {unit_name: unitname}]);
        navigate('/plantutilitiesunitsofmeasurement', { replace: true });
        window.location.reload();
        alert("Unit of Measurement Recorded")
      }
      else {
        alert("Unit of measurement already existed.")
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
        <h1 class="titleheadform">Utilities for Units of Measurement</h1>
      </div>
      <main class="container-fluid">
      <Link to="/plantutilities"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
          <div class="formdiv">
              <form class="formdiv" name="myform" required>
              <div class="input-group mb-3">
              <input name="ainput" type="text" class="form-control" placeholder="Plant Type" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) =>{
            setunitname(e.target.value)
          }}/>
              <button class="btn btn-primary" type="button" id="button-addon2" onClick={submitPlantType}>Add</button>
          </div>
              </form>
          </div>
          <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Registered Units of Measurement</th>
                      </tr>
                    </thead>
                    <tbody>
                    {unitslist.map((val) => {
                            return(
                              <tr class="table-active tractive">
                              <td scope="row">{val.unit_name}</td>
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
        <h1 class="titleheadform">Utilities for Units of Measurement</h1>
      </div>
      <main class="container-fluid">
      <Link to="/plantutilities"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
          
          <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Registered Units of Measurement</th>
                      </tr>
                    </thead>
                    <tbody>
                    {unitslist.map((val) => {
                            return(
                              <tr class="table-active tractive">
                              <td scope="row">{val.unit_name}</td>
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

export default Plantutilitiesunitsofmeasurement;
