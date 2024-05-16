import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Plantutilitiessoiltype() {
  const [soiltypename, setsoiltypename] = useState("")
  const [soiltypelist, setsoiltypelist] = useState([]);
  useEffect(() =>{
    Axios.get('http://localhost:3001/plantutilitiessoiltype').then((response) => {
      setsoiltypelist(response.data);
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
  const submitSoilType = () => {
    var a = document.forms["myform"]["ainput"].value;
    if (a == ""){
      alert("No input")
    }
    else{
      let checker = 0
      for (let i = 0; i < soiltypelist.length; i++){
        for (var key in soiltypelist[i]){
          if(soiltypelist[i].hasOwnProperty(key)){
            if(key === "soiltypename"){
              if (soiltypelist[i][key] == soiltypename){
                checker = 1
              }
            }
        }
      }
      }
      if (checker == 0){
        Axios.post("http://localhost:3001/plantutilitiessoiltypeadd", {soiltypename: soiltypename});
        setsoiltypelist([...soiltypelist, {soiltypename: soiltypename}]);
        navigate('/plantutilitiessoiltype', { replace: true });
        window.location.reload();
        alert("Soil Type Recorded")
      }
      else {
        alert("Soil type already existed.")
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
        <h1 class="titleheadform">Utilities for Soil Type</h1>
      </div>
      <main class="container-fluid">
      <Link to="/plantutilities"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
          <div class="formdiv">
              <form class="formdiv" name="myform" required>
              <div class="input-group mb-3">
              <input name="ainput" type="text" class="form-control" placeholder="Soil Type" aria-label="Recipient's username" aria-describedby="button-addon2"onChange={(e) =>{
            setsoiltypename(e.target.value)
          }}/>
              <button class="btn btn-primary" type="button" id="button-addon2" onClick={submitSoilType}>Add</button>
          </div>
              </form>
          </div>
          <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Registered Soil Types</th>
                      </tr>
                    </thead>
                    <tbody>
                    {soiltypelist.map((val) => {
                            return(
                              <tr class="table-active tractive">
                              <td scope="row">{val.soiltypename}</td>
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
        <h1 class="titleheadform">Utilities for Soil Type</h1>
      </div>
      <main class="container-fluid">
      <Link to="/plantutilities"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
          
          <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Registered Soil Types</th>
                      </tr>
                    </thead>
                    <tbody>
                    {soiltypelist.map((val) => {
                            return(
                              <tr class="table-active tractive">
                              <td scope="row">{val.soiltypename}</td>
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

export default Plantutilitiessoiltype;
