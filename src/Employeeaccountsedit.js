import React, {useEffect, useState} from 'react';
import './App.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Employeeaccountsedit() {
  const { employeeid } = useParams();
  const x = employeeid
  const employeeaccountid = x
  const [employeelist, setemployeelist] = useState([]);
  const navigate = useNavigate();
  useEffect(() =>{
    Axios.get(`http://localhost:3001/employeesaccountedit/${x}`).then((response) => {
      setemployeelist(response.data);
    })
  }, [x])
  const ea = employeelist[0]
  var i1, i2, i3, i4;
  for (var key in ea) {
    if (ea.hasOwnProperty(key)) {
        if (key === "username"){
          i1 = ea[key]
        }
        if (key === "pass"){
          i2 = ea[key]
        }
        if (key === "account_type"){
          i3 = ea[key]
        }
        if (key === "account_status"){
          i4 = ea[key]
        }
    }
  }
  const [newemployeeaccountusername, setnewemployeeaccountusername] = useState("");
  const [newemployeeaccountpassword, setnewemployeeaccountpassword] = useState("");
  const [newemployeeaccounttype, setnewemployeeaccounttype] = useState("");
  const [newstatus, setnewstatus] = useState("");
  useEffect(() =>{
    setnewemployeeaccountusername(i1)
    setnewemployeeaccountpassword(i2)
    setnewemployeeaccounttype(i3)
    setnewstatus(i4)
  }, [i1, i2, i3, i4])
  const register = () => {
    var a = document.forms["myform"]["ainput"].value;
    var b = document.forms["myform"]["binput"].value;
    if (a == "" ||b == "") {
      alert("Required fields must be filled out");
    }
    else {
      Axios.put("http://localhost:3001/employeeaccountupdate", {newemployeeaccountusername: newemployeeaccountusername, newemployeeaccountpassword: newemployeeaccountpassword, newemployeeaccounttype: newemployeeaccounttype, newstatus: newstatus, employeeaccountid: employeeaccountid});
      navigate('/employeeaccounts', { replace: true });
      window.location.reload();
      alert("Employee Account updated");
    }
  }
  return (
    <div className='App'>
        {employeelist.map((val) => {
          return (
            <div>
              <div class="headform">
        <h1 class="titleheadform">{val.emp_name}'s Account Edit</h1>
        <h6>Account ID: {val.emp_id}</h6>
      </div>
      <main class="container-fluid">
      <Link to="/employeeaccounts"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
        <form class="formdiv" name="myform" required>
            <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Username</label>
                <input name ="ainput" type="text" class="form-control" placeholder={val.username} defaultValue={val.username} id="inputDefault" onChange={(e) =>{setnewemployeeaccountusername(e.target.value)}} required/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Password</label>
                <input name ="binput" type="text" class="form-control" placeholder={val.pass} defaultValue={val.pass} id="inputDefault" onChange={(e) =>{setnewemployeeaccountpassword(e.target.value)}} required/>
              </div>
              <fieldset class="form-group" onChange={(e) =>{setnewemployeeaccounttype(e.target.value)}}>
                <legend class="mt-4">Account Type</legend>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios1" value="Admin" defaultChecked={val.account_type === 'Admin'} />
                  <label class="form-check-label" for="optionsRadios1">
                    Admin
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios2" value="Basic" defaultChecked={val.account_type === 'Basic'}/>
                  <label class="form-check-label" for="optionsRadios2">
                    Basic
                  </label>
                </div>
              </fieldset>
              
        </form>
        <form class="formdiv">
        <fieldset class="form-group" onChange={(e) =>{setnewstatus(e.target.value)}}>
                <legend class="mt-4">Account Status</legend>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios1" value="Active" defaultChecked={val.account_status == 'Active'} />
                  <label class="form-check-label" for="optionsRadios1">
                    Active
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios2" value="Inactive" defaultChecked={val.account_status == 'Inactive'}/>
                  <label class="form-check-label" for="optionsRadios2">
                    Inactive
                  </label>
                </div>
              </fieldset>
              <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
        </form>
      </main>
            </div>
          )
        })}
    </div>
  );
}

export default Employeeaccountsedit;
