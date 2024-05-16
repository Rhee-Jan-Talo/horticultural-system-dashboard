import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';


function Suppliersadd() {
    const navigate = useNavigate();
    const [company_name, setcompany_name] = useState("")

    const [block, setblock] = useState("");
    const [lot, setlot] = useState("");
    const [street, setstreet] = useState("");
    const [barangay, setbarangay] = useState("");
    const [city, setcity] = useState("");
    const [province, setprovince] = useState("");
    const [zipcode, setzip_code] = useState("");

    const [contact_person_name, setcontact_person_name] = useState("");
    const [position, setcontact_info_position] = useState("");
    const [contact_num, setcontact_info_contact_num] = useState("");
    const [contact_email, setcontact_info_contact_email] = useState("");
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
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
        let checker =  /^\d+$/.test(contact_num);
        let validemail = validateEmail(contact_email)
        if (a == "" ||b == "" || c == "" ||d == "" || e =="" || f == "" ||g == "" || h == "" ||i == "" || j ==""||k == "" || l =="") {
          alert("Required fields must be filled out");
        }
        else if(checker == false){
          alert("Supplier contact number invalid input")
        }
        else if(contact_num.length != 11){
          alert("Supplier contact number invalid input")
        }
        else if(validemail == null){
          alert("Supplier contact email invalid input")
        }
        else {
            Axios.post("http://localhost:3001/suppliersadd", {company_name: company_name, contact_person_name: contact_person_name, position: position, contact_num: contact_num, contact_email: contact_email, block: block, lot: lot, street: street, barangay: barangay, city: city, province: province, zipcode: zipcode});
            navigate('/supplierslist', { replace: true });
            window.location.reload();
            alert("Supplier Registered")
        }
      }
    return(
        <div className="App">
            <div class="headform">
            <h1 class="titleheadform">Add New Supplier Profile</h1>
            </div>
            <main class="container-fluid">
            <Link to="/supplierslist"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
                <form class="formdiv" name="myform" required>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Company Name</label>
                    <input name="ainput" type="text" class="form-control" placeholder="Company Name" id="inputDefault" onChange={(e) =>{setcompany_name(e.target.value)}} required/>
                </div>
                <label class="col-form-label mt-4" for="inputDefault"><h3>Address</h3></label>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Block</label>
                <input name="kinput" type="text" class="form-control" placeholder="Block" id="inputDefault" onChange={(e) =>{setblock(e.target.value)}} required />
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Lot</label>
                <input name="binput" type="text" class="form-control" placeholder="Lot" id="inputDefault" onChange={(e) =>{setlot(e.target.value)}} required />
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Street</label>
                <input name="cinput" type="text" class="form-control" placeholder="Street" id="inputDefault" onChange={(e) =>{setstreet(e.target.value)}} />
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Barangay</label>
                <input name="linput" type="text" class="form-control" placeholder="Barangay" id="inputDefault" onChange={(e) =>{setbarangay(e.target.value)}} />
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">City</label>
                <input name="dinput" type="text" class="form-control" placeholder="City" id="inputDefault" onChange={(e) =>{setcity(e.target.value)}} required />
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Province</label>
                <input name="einput" type="text" class="form-control" placeholder="Province" id="inputDefault" onChange={(e) =>{setprovince(e.target.value)}} required />
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Zip Code</label>
                <input name="finput" type="text" class="form-control" placeholder="Zip Code" id="inputDefault" onChange={(e) =>{setzip_code(e.target.value)}} />
              </div>
              <label class="col-form-label mt-4" for="inputDefault"><h3>Contact Information</h3></label>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Contact Person</label>
                <input name ="ginput" type="text" class="form-control" placeholder="format: First Name_Middle Initial_Last Name" id="inputDefault" required onChange={(e) =>{setcontact_person_name(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Position</label>
                <input name ="hinput" type="text" class="form-control" placeholder="Position" id="inputDefault" required onChange={(e) =>{setcontact_info_position(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Contact Number</label>
                <input name ="iinput" type="text" class="form-control" placeholder="Contact Number" id="inputDefault" required onChange={(e) =>{setcontact_info_contact_num(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Contact Email</label>
                <input name ="jinput" type="text" class="form-control" placeholder="Contact Email" id="inputDefault" required onChange={(e) =>{setcontact_info_contact_email(e.target.value)}}/>
              </div>
                <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
                </form>
            </main>

        </div>
    )
}

export default Suppliersadd;