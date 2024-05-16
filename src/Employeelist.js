import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';


function Employeelist() {
  const [employeelist, setemployeelist] = useState([]);
  var id = 0;
  var goat = "goat milk"
  const navigate = useNavigate();
  const [atypeinfo, setatypeinfo] = useState("");
  const [isLoading, setLoading] = useState(true);
  Axios.get(`http://localhost:3001/atype`).then((response) => {
    setatypeinfo(response.data);
        //setLoading(false);
      })
  console.log("type", atypeinfo)

  useEffect(() =>{
    Axios.get('http://localhost:3001/employeelist').then((response) => {
      setemployeelist(response.data);
    })
  }, [])
  console.log(employeelist)

  function rowSelect(event) {
    id = event;
    console.log(id)
  }
  const handleProceed = (e) => {
    if (id == 0){
      alert("Select an employee row to view position history.")
    }
    else {
      id && navigate(generatePath("/employeelistpositionhistory/:id", { id }));
    }
  };
  const handleProceedEdit = (e) => {
    if (id == 0){
      alert("Select a row to edit.")
    }
    else {
      id && navigate(generatePath("/employeelistedit/:id", { id }));
      console.log(id)
    }
  };
  const handleProceedView = (e) => {
    if (id == 0){
      alert("Select a row to view.")
    }
    else {
      id && navigate(generatePath("/employeeprofile/:id", { id }));
      console.log(id)
    }
  };
  const handleProceedHome = (e) => {
    navigate(generatePath("/home"));
    window.location.reload();
  };
  const [searchinput, setsearchinput] = useState("");
  /*if (isLoading) {
    return (<div className="App">Loading...</div>)
  }*/
  if(atypeinfo == "Admin"){
    return (
      <div className='App'>
          <div class="headform">
          <h1 class="titleheadform">Employees List</h1>
        </div>
        <main class="container-fluid">
        <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceedHome}>Back</button>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedView}>View Profile</button>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceed}>View Position History</button>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedEdit}>Edit</button>
          <Link to="/employeelistadd"><button type="button" class="btn btn-outline-info secondarybutton">Add</button></Link>
          <form class="d-flex">
              <input class="form-control me-sm-2" type="text" placeholder="Search ID or Name" onChange={(e) =>{setsearchinput(e.target.value)}}/>
            </form>
              <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Employee ID</th>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Position</th>
                      </tr>
                    </thead>
                        <tbody>
                        {employeelist.filter((val)=>{
                          if(searchinput == ""){
                            return val
                          }
                          else if(val.emp_name.toLowerCase().includes(searchinput.toLowerCase())){
                            return val
                          }
                          else if(val.emp_id == searchinput){
                            return val
                          }
                        }).map((val) => {
                            return(
                              <tr class="table-active tractive" onClick={rowSelect.bind(this, val.emp_id)}>
                              <td scope="row">{val.emp_id}</td>
                              <td scope="row">{val.emp_name}</td>
                              <td scope="row">{val.emp_pos}</td>
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
  else{
    return (
      <div className='App'>
          <div class="headform">
          <h1 class="titleheadform">Employees List</h1>
        </div>
        <main class="container-fluid">
        <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceedHome}>Back</button>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedView}>View Profile</button>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceed}>View Position History</button>
          <form class="d-flex">
              <input class="form-control me-sm-2" type="text" placeholder="Search ID or Name" onChange={(e) =>{setsearchinput(e.target.value)}}/>
            </form>
              <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Employee ID</th>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Position</th>
                      </tr>
                    </thead>
                        <tbody>
                        {employeelist.filter((val)=>{
                          if(searchinput == ""){
                            return val
                          }
                          else if(val.emp_name.toLowerCase().includes(searchinput.toLowerCase())){
                            return val
                          }
                          else if(val.emp_id == searchinput){
                            return val
                          }
                        }).map((val) => {
                            return(
                              <tr class="table-active tractive" onClick={rowSelect.bind(this, val.emp_id)}>
                              <td scope="row">{val.emp_id}</td>
                              <td scope="row">{val.emp_name}</td>
                              <td scope="row">{val.emp_pos}</td>
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
export default Employeelist;
