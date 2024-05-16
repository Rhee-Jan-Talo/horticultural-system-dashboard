import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useParams, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Employeeprofile() {
  const { employeeid } = useParams();
  const x = employeeid
  const [atypeinfo, setatypeinfo] = useState("");
  const [isLoading, setLoading] = useState(true);
  Axios.get(`http://localhost:3001/atype`).then((response) => {
    setatypeinfo(response.data);
        setLoading(false);
      })
  console.log("type", atypeinfo)
  const navigate = useNavigate();
  console.log(x)
  const [empinfo, setempinfo] = useState([]);
  useEffect(() =>{
    Axios.get(`http://localhost:3001/employeelistedit/${x}`).then((response) => {
        setempinfo(response.data);
    })
  }, [x])
  const [addressinfo, setaddressinfo] = useState([]);
  useEffect(() =>{
    Axios.get(`http://localhost:3001/employeelisteditaddress/${x}`).then((response) => {
      setaddressinfo(response.data);
    })
  }, [x])
  const handleProceedPos = (e) => {
    x && navigate(generatePath("/employeelistpositionhistory/:x", { x }));
  };
  const handleProceedEdit = (e) => {
    x && navigate(generatePath("/employeelistedit/:x", { x }));
  };
  const handleProceedImgEdit = (e) => {
    x && navigate(generatePath("/employeeidpicedit/:x", { x }));
  };
  if (isLoading) {
    return (<div className="App">Loading...</div>)
  }
  if(atypeinfo == "Admin"){
    return (
      <div className='App'>
        {empinfo.map((val)=> {
          return (
            <div>
              
          <div class="headform">
          <h1 class="titleheadform">Employee {val.emp_name}'s' Profile</h1>
        </div>
        <main class="container-fluid">
        <Link to="/employeelist"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedEdit}>Edit Profile</button>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedImgEdit}>Update ID Pic</button>
         <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedPos}>View Position History</button>
          <br></br>
          {addressinfo.map((value)=>{
            return (
              <div class="viewdiv">
              <p><b><h1>Employee Information</h1></b></p>
              <p><h4><b>ID Pic:</b></h4></p>
              <img class="viewimage" alt="employee id pic" src={`data:image/jpeg;base64,${val.id_pic}`}></img>
              <br></br>
              <p><h3><b>Name: </b>{val.emp_name}</h3></p>
              <p><h3><b>Address:</b></h3></p>
              <p><h4><b>Block: </b>{value.block}</h4></p>
              <p><h4><b>Lot: </b>{value.lot}</h4></p>
              <p><h4><b>Street: </b>{value.street}</h4></p>
              <p><h4><b>Barangay: </b>{value.barangay}</h4></p>
              <p><h4><b>City: </b>{value.city}</h4></p>
              <p><h4><b>Province: </b>{value.province}</h4></p>
              <p><h4><b>Zipcode: </b>{value.zipcode}</h4></p>
              <br></br>
              <p><h3><b>Contact Number: </b>{val.contact_num}</h3></p>
              <p><h3><b>Educational Attainment: </b>{val.educational_attainment}</h3></p>
              <p><h3><b>Position: </b>{val.emp_pos}</h3></p>
              <p><h3><b>Job Description: </b>{val.job_desc}</h3></p>
              
          </div>
            )
          })}
              
          </main>
            </div>
          )
        })}
      </div>
    );
  }
  else {
    return (
      <div className='App'>
        {empinfo.map((val)=> {
          return (
            <div>
              
          <div class="headform">
          <h1 class="titleheadform">Employee {val.emp_name}'s' Profile</h1>
        </div>
        <main class="container-fluid">
        <Link to="/employeelist"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
         <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedPos}>View Position History</button>
          <br></br>
          {addressinfo.map((value)=>{
            return (
              <div class="viewdiv">
              <p><b><h1>Employee Information</h1></b></p>
              <p><h4><b>ID Pic:</b></h4></p>
              <img class="viewimage" alt="employee id pic" src={`data:image/jpeg;base64,${val.id_pic}`}></img>
              <br></br>
              <p><h3><b>Name: </b>{val.emp_name}</h3></p>
              <p><h3><b>Address:</b></h3></p>
              <p><h4><b>Block: </b>{value.block}</h4></p>
              <p><h4><b>Lot: </b>{value.lot}</h4></p>
              <p><h4><b>Street: </b>{value.street}</h4></p>
              <p><h4><b>Barangay: </b>{value.barangay}</h4></p>
              <p><h4><b>City: </b>{value.city}</h4></p>
              <p><h4><b>Province: </b>{value.province}</h4></p>
              <p><h4><b>Zipcode: </b>{value.zipcode}</h4></p>
              <br></br>
              <p><h3><b>Contact Number: </b>{val.contact_num}</h3></p>
              <p><h3><b>Educational Attainment: </b>{val.educational_attainment}</h3></p>
              <p><h3><b>Position: </b>{val.emp_pos}</h3></p>
              <p><h3><b>Job Description: </b>{val.job_desc}</h3></p>
              
          </div>
            )
          })}
              
          </main>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Employeeprofile;

                