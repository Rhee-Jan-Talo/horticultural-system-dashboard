import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, useNavigate, useParams, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Farmprofilesedit() {
  const { farm_id } = useParams();
  const x = farm_id
  const navigate = useNavigate();
  const [farm_name, setfarm_name] = useState("");
  const [size, setsize] = useState("");

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
  const [farminfo, setfarminfo] = useState([]);
  useEffect(() =>{
    Axios.get(`http://localhost:3001/farmprofileidget/${x}`).then((response) => {
      setfarminfo(response.data);
    })
  }, [x])
  const [addressinfo, setaddressinfo] = useState([]);
  useEffect(() =>{
    Axios.get(`http://localhost:3001/farmaddress/${x}`).then((response) => {
      setaddressinfo(response.data);
    })
  }, [x])
  const [farmcontactinfo, setfarmcontactinfo] = useState([]);
  useEffect(() =>{
    Axios.get(`http://localhost:3001/farmcontact/${x}`).then((response) => {
      setfarmcontactinfo(response.data);
    })
  }, [x])
  const ea = farminfo[0]
  const oa = addressinfo[0]
  const ia = farmcontactinfo[0]
  var i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12, i13 = "hey";
  for (var key in ea) {
    if (ea.hasOwnProperty(key)) {
        if (key === "farm_name"){
          i1 = ea[key]
        }
        if (key === "size"){
          i2 = ea[key]
        }
      }
  }
  for (var key in oa) {
    if (oa.hasOwnProperty(key)) {
        if (key === "block"){
          i3 = oa[key]
        }
        if (key === "lot"){
          i4 = oa[key]
        }
        if (key === "street"){
          i5 = oa[key]
        }
        if (key === "barangay"){
          i6 = oa[key]
        }
        if (key === "city"){
          i7 = oa[key]
        }
        if (key === "province"){
          i8 = oa[key]
        }
        if (key === "zipcode"){
          i9 = oa[key]
        }
      }
  }
  for (var key in ia) {
    if (ia.hasOwnProperty(key)) {
        if (key === "contact_person_name"){
          i10 = ia[key]
        }
        if (key === "position"){
          i11 = ia[key]
        }
        if (key === "contact_num"){
          i12 = ia[key]
        }
        if (key === "contact_email"){
          i13 = ia[key]
        }
      }
  }
  useEffect(() =>{
    setfarm_name(i1)
    setsize(i2)
    setblock(i3)
    setlot(i4)
    setstreet(i5)
    setbarangay(i6)
    setcity(i7)
    setprovince(i8)
    setzip_code(i9)
    setcontact_person_name(i10)
    setcontact_info_position(i11)
    setcontact_info_contact_num(i12)
    setcontact_info_contact_email(i13)
  }, [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12, i13])
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
    var i1 = document.forms["myform"]["input1"].value;
    var i2 = document.forms["myform"]["input2"].value;
    var i3 = document.forms["myform"]["input3"].value;
    var i4 = document.forms["myform"]["input4"].value;
    var i5 = document.forms["myform"]["input5"].value;
    var i6 = document.forms["myform"]["input6"].value;
    var i7 = document.forms["myform"]["input7"].value; //block
    var i8 = document.forms["myform"]["input8"].value; //barangay
    //var i9 = document.forms["myform"]["input9"].value; //free
    //var i10 = document.forms["myform"]["input10"].value; //free
    var i11 = document.forms["myform"]["input11"].value;
    var i12 = document.forms["myform"]["input12"].value;
    var i13 = document.forms["myform"]["input13"].value;
    var i14 = document.forms["myform"]["input14"].value;
    var i24 = document.forms["myform"]["input24"].value;
    if (i1 == "" ||i2 == "" ||i3 == "" ||i4 == "" ||i5 == "" ||i6 == "" ||i7 == "" ||i8 == "" || i11 == "" ||i12 == "" ||i13 == "" ||i14 == "" ||i24 == "") {
      alert("All fields must be filled out");
    }
    else if(checker == false){
      alert("Farm contact number invalid input")
    }
    else if(contact_num.length != 11){
      alert("Farm contact number invalid input")
    }
    else if(validemail == null){
      alert("Farm contact email invalid input")
    }
    else {
      Axios.put("http://localhost:3001/farmupdate", {farm_id: farm_id, farm_name: farm_name, size: size, block: block, lot: lot, street: street, barangay: barangay, city: city, province: province, zipcode: zipcode, contact_person_name: contact_person_name, position: position, contact_num: contact_num, contact_email: contact_email});
      x && navigate(generatePath("/farmprofilesview/:x", { x }));
      window.location.reload();
      alert("Farm updated");
    }
  }
  const handleProceed = (e) => {
    x && navigate(generatePath("/farmprofilesview/:x", { x }));
  };
  return (
    <div className='App'>
      {farminfo.map((val)=> {
        return (
          <div>
            <div class="headform">
        <h1 class="titleheadform">Edit {val.farm_name} Profile</h1>
      </div>
      <main class="container-fluid">
      <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
        <form class="formdiv" name="myform" required>
            <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Farm Name</label>
                <input name ="input1" type="text" class="form-control" placeholder="Farm Name" id="inputDefault" required placeHolder={val.farm_name} defaultValue={val.farm_name} onChange={(e) =>{setfarm_name(e.target.value)}}/>
              </div>
              {addressinfo.map((value)=> {
                return (
                  <div>
                    <label class="col-form-label mt-4" for="inputDefault"><h3>Address</h3></label>
              <div class="form-group">
                  <label class="col-form-label mt-4" for="inputDefault">Block</label>
                  <input name ="input7" type="text" class="form-control" placeholder="Block" id="inputDefault" required placeHolder={value.block} defaultValue={value.block} onChange={(e) =>{setblock(e.target.value)}}/>
                </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Lot</label>
                <input name ="input2" type="text" class="form-control" placeholder="Lot" id="inputDefault" required placeHolder={value.lot} defaultValue={value.lot} onChange={(e) =>{setlot(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Street</label>
                <input name ="input3" type="text" class="form-control" placeholder="Street" id="inputDefault" required placeHolder={value.street} defaultValue={value.street} onChange={(e) =>{setstreet(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Barangay</label>
                <input name ="input8" type="text" class="form-control" placeholder="Barangay" id="inputDefault" required placeHolder={value.barangay} defaultValue={value.barangay} onChange={(e) =>{setbarangay(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">City</label>
                <input name ="input4" type="text" class="form-control" placeholder="City" id="inputDefault" required placeHolder={value.city} defaultValue={value.city} onChange={(e) =>{setcity(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Province</label>
                <input name ="input24" type="text" class="form-control" placeholder="Province" id="inputDefault" required placeHolder={value.province} defaultValue={value.province} onChange={(e) =>{setprovince(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Zip Code</label>
                <input name ="input5" type="text" class="form-control" placeholder="Zip Code" id="inputDefault" required placeHolder={value.zipcode} defaultValue={value.zipcode} onChange={(e) =>{setzip_code(e.target.value)}}/>
              </div>
                  </div>
                )
              })}
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Size in Hectares</label>
                <input name ="input6" type="text" class="form-control" placeholder="Size in Hectares" id="inputDefault" required placeHolder={val.size} defaultValue={val.size} onChange={(e) =>{setsize(e.target.value)}}/>
              </div>
              {farmcontactinfo.map((value)=> {
                return (
                  <div>
                    <h1 class="titleheadform">Contact Information</h1>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Contact Person</label>
                <input name ="input11" type="text" class="form-control" placeholder="Contact Person" id="inputDefault" required placeHolder={value.contact_person_name} defaultValue={value.contact_person_name} onChange={(e) =>{setcontact_person_name(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Position</label>
                <input name ="input12" type="text" class="form-control" placeholder="Position" id="inputDefault" required placeHolder={value.position} defaultValue={value.position} onChange={(e) =>{setcontact_info_position(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Contact Number</label>
                <input name ="input13" type="text" class="form-control" placeholder="Contact Number" id="inputDefault" required placeHolder={value.contact_num} defaultValue={value.contact_num} onChange={(e) =>{setcontact_info_contact_num(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Contact Email</label>
                <input name ="input14" type="text" class="form-control" placeholder="Contact Email" id="inputDefault" required placeHolder={value.contact_email} defaultValue={value.contact_email} onChange={(e) =>{setcontact_info_contact_email(e.target.value)}}/>
              </div>
                  </div>
                )
              })}
              <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
              </form>
        </main>
          </div>
        )
      })}    
    </div>
  );
}

export default Farmprofilesedit;
