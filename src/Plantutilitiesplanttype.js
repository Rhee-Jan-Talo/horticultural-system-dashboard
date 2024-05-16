import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Plantutilitiesplanttype() {
  const [planttypename, setplanttypename] = useState("")
  const [planttypelist, setplanttypelist] = useState([]);
  useEffect(() =>{
    Axios.get('http://localhost:3001/plantutilitiesplanttype').then((response) => {
      setplanttypelist(response.data);
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
      for (let i = 0; i < planttypelist.length; i++){
        for (var key in planttypelist[i]){
          if(planttypelist[i].hasOwnProperty(key)){
            if(key === "planttypename"){
              if (planttypelist[i][key] == planttypename){
                checker = 1
              }
            }
        }
      }
      }
      if (checker == 0){
        Axios.post("http://localhost:3001/plantutilitiesplanttypeadd", {planttypename: planttypename});
        setplanttypelist([...planttypelist, {planttypename: planttypename}]);
        navigate('/plantutilitiesplanttype', { replace: true });
        window.location.reload();
        alert("Plant Type Recorded")
      }
      else {
        alert("Plant type already existed.")
      }
    }
    
  };
  console.log(planttypelist)
  if (isLoading) {
    return (<div className="App">Loading...</div>)
  }
  if(atypeinfo == "Admin"){
    return (
      <div className='App'>
          <div class="headform">
        <h1 class="titleheadform">Utilities for Plant Type</h1>
      </div>
      <main class="container-fluid">
      <Link to="/plantutilities"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
          <div class="formdiv">
              <form class="formdiv" name="myform" required>
              <div class="input-group mb-3">
              <input name="ainput" type="text" class="form-control" placeholder="Plant Type" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) =>{
            setplanttypename(e.target.value)
          }}/>
              <button class="btn btn-primary" type="button" id="button-addon2" onClick={submitPlantType}>Add</button>
          </div>
              </form>
          </div>
          <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Registered Plant Types</th>
                      </tr>
                    </thead>
                    <tbody>
                    {planttypelist.map((val) => {
                            return(
                              <tr class="table-active tractive">
                              <td scope="row">{val.planttypename}</td>
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
        <h1 class="titleheadform">Utilities for Plant Type</h1>
      </div>
      <main class="container-fluid">
      <Link to="/plantutilities"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
          
          <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Registered Plant Types</th>
                      </tr>
                    </thead>
                    <tbody>
                    {planttypelist.map((val) => {
                            return(
                              <tr class="table-active tractive">
                              <td scope="row">{val.planttypename}</td>
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

export default Plantutilitiesplanttype;
