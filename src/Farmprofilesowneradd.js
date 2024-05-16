import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useParams, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Farmprofilesowneradd() {
    const { farm_id } = useParams();
  const x = farm_id;
    const [owner_name, setowner_name] = useState("");
  const [contact_num, setcontact_num] = useState("");
  const [contact_email, setcontact_email] = useState("");
  const [owner_type, setowner_type] = useState("");
  const [educational_attainment, seteducational_attainment] = useState("");
  const [position, setposition] = useState("");
  const [job_desc, setjob_desc] = useState("");

  const [block, setblock] = useState("");
  const [lot, setowner_lot] = useState("");
  const [street, setowner_street] = useState("");
  const [barangay, setbarangay] = useState("");
  const [city, setowner_city] = useState("");
  const [province, setowner_province] = useState("");
  const [zipcode, setowner_zip_code] = useState("");
  const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  let checker =  /^\d+$/.test(contact_num);
  let validemail = validateEmail(contact_email)
  const register = () => {
    var i15 = document.forms["myform"]["input15"].value; //giisa ang owner name
    var i16 = document.forms["myform"]["input16"].value; //owner contact email
    var i17 = document.forms["myform"]["input17"].value;
    var i18 = document.forms["myform"]["input18"].value;
    var i19 = document.forms["myform"]["input19"].value;
    var i20 = document.forms["myform"]["input20"].value;
    var i21 = document.forms["myform"]["input21"].value;
    var i22 = document.forms["myform"]["input22"].value;
    var i23 = document.forms["myform"]["input23"].value;
    var i25 = document.forms["myform"]["input25"].value;
    var i26 = document.forms["myform"]["input26"].value;
    var i27 = document.forms["myform"]["input27"].value;
    if (i15 == "" ||i16 == "" ||i17 == "" ||i18 == "" ||i19 == "" ||i20 == "" ||i21 == "" ||i22 == "" ||i23 == "" ||i25 == "" ||i26 == "" ||i27 == "") {
      alert("Required fields must be filled out");
    }
    else if(checker == false){
      alert("Owner contact number invalid input")
    }
    else if(contact_num.length != 11){
      alert("Owner contact number invalid input")
    }
    else if(validemail == null){
      alert("Owner contact email invalid input")
    }
    else {
      Axios.post("http://localhost:3001/ownersadd", {farm_id: x, owner_name: owner_name, contact_num: contact_num, contact_email: contact_email, owner_type: owner_type, educational_attainment: educational_attainment, position: position, job_desc: job_desc, block: block, lot: lot, street: street, barangay: barangay, city: city, province: province, zipcode: zipcode});
      x && navigate(generatePath("/farmprofilesview/:x", { x }));
      window.location.reload();
      alert("Owner recorded");
    }
  }
  const handleProceed = (e) => {
    x && navigate(generatePath("/farmprofilesview/:x", { x }));
  };
  return (
    <div className='App'>
        <div class="headform">
        <h1 class="titleheadform">Add New Owner</h1>
      </div>
      <main class="container-fluid">
      <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
        <form class="formdiv" name="myform" required>
        <label class="col-form-label mt-4" for="inputDefault"><h3>Owner Information</h3></label>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Owner Name</label>
                <input name ="input15" type="text" class="form-control" placeholder="format: First Name_Middle Initial_Last Name" id="inputDefault" required onChange={(e) =>{setowner_name(e.target.value)}}/>
              </div>
              <div class="form-group">
                    <label for="exampleSelect1" class="form-label mt-4">Owner Type</label>
                    <select name ="input17" class="form-select" id="exampleSelect1" required  onChange={(e) =>{setowner_type(e.target.value)}}>
                    <option value="">Select Owner Type</option>
                    <option value="Single Owner">Single Owner</option>
                    <option value="Co-Owner">Co-Owner</option>
                    <option value="Coop Member">Coop Member</option>
                    </select>
                    </div>
              <label class="col-form-label mt-4" for="inputDefault"><h3>Address</h3></label>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Block</label>
                <input name ="input28" type="text" class="form-control" placeholder="Block" id="inputDefault" required onChange={(e) =>{setblock(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Lot</label>
                <input name ="input18" type="text" class="form-control" placeholder="Lot" id="inputDefault" required onChange={(e) =>{setowner_lot(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Street</label>
                <input name ="input19" type="text" class="form-control" placeholder="Street" id="inputDefault" required onChange={(e) =>{setowner_street(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Barangay</label>
                <input name ="input29" type="text" class="form-control" placeholder="Barangay" id="inputDefault" required onChange={(e) =>{setbarangay(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">City</label>
                <input name ="input20" type="text" class="form-control" placeholder="City" id="inputDefault" required onChange={(e) =>{setowner_city(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Province</label>
                <input name ="input21" type="text" class="form-control" placeholder="Province" id="inputDefault" required onChange={(e) =>{setowner_province(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Zip Code</label>
                <input name ="input22" type="text" class="form-control" placeholder="Zip Code" id="inputDefault" required onChange={(e) =>{setowner_zip_code(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Contact Number</label>
                <input name ="input23" type="text" class="form-control" placeholder="Contact Number" id="inputDefault" required onChange={(e) =>{setcontact_num(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Contact Email</label>
                <input name ="input16" type="text" class="form-control" placeholder="Contact Email" id="inputDefault" required onChange={(e) =>{setcontact_email(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Position</label>
                <input name ="input25" type="text" class="form-control" placeholder="Position" id="inputDefault" required onChange={(e) =>{setposition(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Educational Attainment</label>
                <input name ="input26"type="text" class="form-control" placeholder="Educational Attainment" id="inputDefault" required onChange={(e) =>{seteducational_attainment(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Job Description</label>
                <input name ="input27" type="text" class="form-control" placeholder="Job Description" id="inputDefault" required onChange={(e) =>{setjob_desc(e.target.value)}}/>
              </div>
              <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
        </form>
        </main>
      </div>
  );
}

export default Farmprofilesowneradd;
