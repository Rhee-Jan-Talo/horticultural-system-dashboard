import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Employeelistadd() {

  const [employeename, setemployeename] = useState("");
  const [employeecontact, setemployeecontact] = useState("");
  const [employeeblock, setemployeeblock] = useState("");
  const [employeelot, setemployeelot] = useState("");
  const [employeestreet, setemployeestreet] = useState("");
  const [employeebarangay, setemployeebarangay] = useState("");
  const [employeecity, setemployeecity] = useState("");
  const [employeeprovince, setemployeeprovince] = useState("");
  const [employeezipcode, setemployeezipcode] = useState("");
  const [employeeeducationalattainment, setemployeeeducationalattainment] = useState("");
  const [employeeposition, setemployeeposition] = useState("");
  const [employeestatus, setemployeestatus] = useState("");
  const [employeejobdescription, setemployeejobdescription] = useState("");
  const [employeeidpicture, setemployeeidpicture] = useState("");
  const navigate = useNavigate();
  const register = () => {
    var a = document.forms["myform"]["ainput"].value;
    var b = document.forms["myform"]["binput"].value;
    var c = document.forms["myform"]["cinput"].value;
    var d = document.forms["myform"]["dinput"].value;
    var e = document.forms["myform"]["einput"].value;
    var f = document.forms["myform"]["finput"].value;
    var g = document.forms["myform"]["ginput"].value;
    var h = document.forms["myform"]["hinput"].value;
    var i = document.forms["myform"]["iinput"].value;
    var j = document.forms["myform"]["jinput"].value;
    var k = document.forms["myform"]["kinput"].value;
    var l = document.forms["myform"]["linput"].value;
    var m = document.forms["myform"]["minput"].value;
    var n = document.forms["myform"]["ninput"].value;
    let checker =  /^\d+$/.test(employeecontact);
    if (a == "" ||b == "" ||c == "" ||d == "" ||e == "" || f == "" ||g == "" ||h == "" ||i == "" ||j == "" ||k == "" ||l == "" ||m == "" || n == "") {
      alert("All fields must be filled out");
    }
    else if(checker == false){
      alert("Employee contact number invalid input1")
    }
    else if(employeecontact.length != 11){
      alert("Employee contact number invalid input2")
    }
    else {
      const formData = new FormData()
      formData.append('profileImg', employeeidpicture)
      formData.append('employeename', employeename)
      formData.append('employeeblock', employeeblock)
      formData.append('employeelot', employeelot)
      formData.append('employeestreet', employeestreet)
      formData.append('employeebarangay', employeebarangay)
      formData.append('employeecity', employeecity)
      formData.append('employeeprovince', employeeprovince)
      formData.append('employeezipcode', employeezipcode)
      formData.append('employeecontact', employeecontact)
      formData.append('employeeeducationalattainment', employeeeducationalattainment)
      formData.append('employeeposition', employeeposition)
      formData.append('employeestatus', employeestatus)
      formData.append('employeejobdescription', employeejobdescription)
      Axios.post("http://localhost:3001/employeelistadd", formData);
      navigate('/employeelist', { replace: true });
      window.location.reload();
      alert("Employee recorded");
    }
  }
  return (
    <div className='App'>
        <div class="headform">
        <h1 class="titleheadform">New Employee</h1>
      </div>
      <main class="container-fluid">
      <Link to="/employeelist"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
        <form class="formdiv" enctype="multipart/form-data" name="myform" required>
          <label class="col-form-label mt-4" for="inputDefault"><h3>Employee Name</h3></label>
            <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Employee Name</label>
                <input name="ainput" type="text" class="form-control" placeholder="format: First Name_Middle Initial_Last Name" id="inputDefault" onChange={(e) =>{setemployeename(e.target.value)}} required/>
              </div>
              <label class="col-form-label mt-4" for="inputDefault"><h3>Address</h3></label>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Block</label>
                <input name="binput" type="text" class="form-control" placeholder="Block" id="inputDefault" onChange={(e) =>{setemployeeblock(e.target.value)}} required />
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Lot</label>
                <input name="dinput" type="text" class="form-control" placeholder="Lot" id="inputDefault" onChange={(e) =>{setemployeelot(e.target.value)}} required />
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Street</label>
                <input name="einput" type="text" class="form-control" placeholder="Street" id="inputDefault" onChange={(e) =>{setemployeestreet(e.target.value)}} />
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Barangay</label>
                <input name="ninput" type="text" class="form-control" placeholder="Barangay" id="inputDefault" onChange={(e) =>{setemployeebarangay(e.target.value)}} />
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">City</label>
                <input name="ginput" type="text" class="form-control" placeholder="City" id="inputDefault" onChange={(e) =>{setemployeecity(e.target.value)}} required />
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Province</label>
                <input name="hinput" type="text" class="form-control" placeholder="Province" id="inputDefault" onChange={(e) =>{setemployeeprovince(e.target.value)}} required />
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Zip Code</label>
                <input name="cinput" type="text" class="form-control" placeholder="Zip Code" id="inputDefault" onChange={(e) =>{setemployeezipcode(e.target.value)}} />
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Contact Number</label>
                <input name="iinput" type="text" class="form-control" placeholder="Contact Number" id="inputDefault" onChange={(e) =>{setemployeecontact(e.target.value)}} required />
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Educational Attainment</label>
                <input name="jinput" type="text" class="form-control" placeholder="Educational Attainment" id="inputDefault" onChange={(e) =>{setemployeeeducationalattainment(e.target.value)}} required />
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Position</label>
                <input name="kinput" type="text" class="form-control" placeholder="Position" id="inputDefault" onChange={(e) =>{setemployeeposition(e.target.value)}} required />
              </div>
              <fieldset class="form-group" name="linput" onChange={(e) =>{setemployeestatus(e.target.value)}} required>
                <legend class="mt-4">Status *</legend>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios1" value="Full Time" />
                  <label class="form-check-label" for="optionsRadios1">
                    Full Time
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios2" value="Part Time" />
                  <label class="form-check-label" for="optionsRadios2">
                    Part Time
                  </label>
                </div>
              </fieldset>
              <div class="form-group">
                <label for="formFile" class="form-label mt-4">Job Description</label>
                <input name="finput" class="form-control" type="text" id="formFile" onChange={(e) =>{setemployeejobdescription(e.target.value)}} />
              </div>
              <div class="form-group">
                <label for="formFile" class="form-label mt-4">ID Picture</label>
                <input name="minput" class="form-control" type="file" id="formFile" onChange={(e) =>{setemployeeidpicture(e.target.files[0])}} required />
              </div>
              <button type="submit" value="Submit" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
        </form>
        </main>
      </div>
  );
}

export default Employeelistadd;