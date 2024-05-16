import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Plantutilitiesplantprofile() {
  const [plantprofilename, setplantprofilename] = useState("")
  const [plantprofilelist, setplantprofilelist] = useState([]);
  useEffect(() =>{
    Axios.get('http://localhost:3001/plantutilitiesplantprofile').then((response) => {
      setplantprofilelist(response.data);
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
  const submitPlantProfile = () => {
    var a = document.forms["myform"]["ainput"].value;
    if (a == ""){
      alert("No input")
    }
    else{
      let checker = 0
      for (let i = 0; i < plantprofilelist.length; i++){
        for (var key in plantprofilelist[i]){
          if(plantprofilelist[i].hasOwnProperty(key)){
            if(key === "plantprofilename"){
              if (plantprofilelist[i][key] == plantprofilename){
                checker = 1
              }
            }
        }
      }
      }
      if (checker == 0){
        Axios.post("http://localhost:3001/plantutilitiesplantprofileadd", {plantprofilename: plantprofilename});
    setplantprofilename([...plantprofilelist, {plantprofilename: plantprofilename}]);
        navigate('/plantutilitiesplantprofile', { replace: true });
        window.location.reload();
        alert("Plant Category Recorded")
      }
      else {
        alert("Plant category already existed.")
      }
    }
    
  };
  console.log(plantprofilelist)
  if (isLoading) {
    return (<div className="App">Loading...</div>)
  }
  if(atypeinfo == "Admin"){
    return (
      <div className='App'>
          <div class="headform">
        <h1 class="titleheadform">Utilities for Plant Profile</h1>
      </div>
      <main class="container-fluid">
      <Link to="/plantutilities"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
          <div class="formdiv">
              <form class="formdiv" name="myform" required>
              <div class="input-group mb-3">
              <input name="ainput" type="text" class="form-control" placeholder="Plant Profile" aria-label="Recipient's username" aria-describedby="button-addon2"onChange={(e) =>{
            setplantprofilename(e.target.value)
          }}/>
              <button class="btn btn-primary" type="button" id="button-addon2"onClick={submitPlantProfile}>Add</button>
          </div>
              </form>
          </div>
          <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Registered Plant Profiles</th>
                      </tr>
                    </thead>
                    <tbody>
                    {plantprofilelist.map((val) => {
                            return(
                              <tr class="table-active tractive">
                              <td scope="row">{val.plantprofilename}</td>
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
        <h1 class="titleheadform">Utilities for Plant Profile</h1>
      </div>
      <main class="container-fluid">
      <Link to="/plantutilities"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
          
          <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Registered Plant Profiles</th>
                      </tr>
                    </thead>
                    <tbody>
                    {plantprofilelist.map((val) => {
                            return(
                              <tr class="table-active tractive">
                              <td scope="row">{val.plantprofilename}</td>
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

export default Plantutilitiesplantprofile;
