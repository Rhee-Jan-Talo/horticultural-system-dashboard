import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Employeeaccountsadd() {
  const [employeeaccountid, setemployeeaccountid] = useState("")
  const [employeeaccountusername, setemployeeaccountusername] = useState("")
  const [employeeaccountpassword, setemployeeaccountpassword] = useState("")
  const [employeeaccounttype, setemployeeaccounttype] = useState("Basic")
  const [employeelist, setemployeelist] = useState([]); //for employeelist to get id
  const navigate = useNavigate();
  useEffect(() =>{
    Axios.get('http://localhost:3001/employeesaccountfilter').then((response) => {
      setemployeelist(response.data);
    })
  }, [])
  console.log(employeelist)
  const register = () => {
    var a = document.forms["myform"]["ainput"].value;
    var b = document.forms["myform"]["binput"].value;
    var c = document.forms["myform"]["cinput"].value;
    var d = document.forms["myform"]["dinput"].value;
    if (a == "" ||b == "" || c == "" ||d == "" || employeeaccountid == "") {
      alert("Required fields must be filled out");
    }
    else {
      Axios.post("http://localhost:3001/employeesaccountadd", {employeeaccountid: employeeaccountid, employeeaccountusername: employeeaccountusername, employeeaccountpassword: employeeaccountpassword, employeeaccounttype: employeeaccounttype});
      
      navigate('/employeeaccounts', { replace: true });
      window.location.reload();
      alert("Employee Account added");

    }
  }
  return (
    <div className='App'>
        <div class="headform">
        <h1 class="titleheadform">Add New Employee Account</h1>
      </div>
      <main class="container-fluid">
      <Link to="/employeeaccounts"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
        <form class="formdiv" name="myform" required>
            <div class="form-group">
                <div class="form-group">
                    <label for="exampleSelect1" class="form-label mt-4">Select Employee</label>
                    <select name="ainput" class="form-select" id="exampleSelect1" onChange={(e) =>{setemployeeaccountid(e.target.value)}} required>
                        <option value="">Select Employee</option>
                        {employeelist.map((val) => {
                          return (
                            <option value={val.emp_id}>{val.emp_name}</option>
                          )
                        })}
                    </select>
                    </div>
                <label class="col-form-label mt-4" for="inputDefault">Username</label>
                <input name="binput" type="text" class="form-control" placeholder="Username" id="inputDefault" onChange={(e) =>{setemployeeaccountusername(e.target.value)}} required/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Password</label>
                <input name="cinput" type="text" class="form-control" placeholder="password" id="inputDefault" onChange={(e) =>{setemployeeaccountpassword(e.target.value)}} required/>
              </div>
              <fieldset name="dinput" class="form-group" onChange={(e) =>{setemployeeaccounttype(e.target.value)}} required>
                <legend class="mt-4">Account Type</legend>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios1" value="Admin"/>
                  <label class="form-check-label" for="optionsRadios1">
                    Admin
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios2" value="Basic" defaultChecked/>
                  <label class="form-check-label" for="optionsRadios2">
                    Basic
                  </label>
                </div>
              </fieldset>
              <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
        </form>
      </main>
    </div>
  );
}

export default Employeeaccountsadd;
