import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useParams, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Farmprofilesowner() {
  const { owner_id } = useParams();
  const x = owner_id;
  const [ownerinfo, setownerinfo] = useState([]);
  useEffect(() =>{
    Axios.get(`http://localhost:3001/ownerprofileidget/${x}`).then((response) => {
      setownerinfo(response.data);
    })
  }, [x])
  const [owneraddress, setowneraddress] = useState([]);
  useEffect(() =>{
    Axios.get(`http://localhost:3001/owneraddressidget/${x}`).then((response) => {
      setowneraddress(response.data);
    })
  }, [x])
  console.log(owneraddress)
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
  var i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12, i13, i14, farm_id = "hey";
  const ea = ownerinfo[0]
  const oa = owneraddress[0]
  for (var key in ea) {
    if (ea.hasOwnProperty(key)) {
        if (key === "owner_name"){
          i1 = ea[key]
        }
        if (key === "owner_type"){
          i2 = ea[key]
        }
        if (key === "contact_num"){
          i3 = ea[key]
        }
        if (key === "contact_email"){
          i4 = ea[key]
        }
        if (key === "educational_attainment"){
          i5 = ea[key]
        }
        if (key === "position"){
          i6 = ea[key]
        }
        if (key === "job_desc"){
          i7 = ea[key]
        }
        if (key === "farm_id"){
          farm_id = ea[key]
        }
      }
  }
  for (var key in oa) {
    if (oa.hasOwnProperty(key)) {
        if (key === "lot"){
          i8 = oa[key]
        }
        if (key === "street"){
          i9 = oa[key]
        }
        if (key === "city"){
          i10 = oa[key]
        }
        if (key === "province"){
          i11 = oa[key]
        }
        if (key === "zipcode"){
          i12 = oa[key]
        }
        if (key === "block"){
          i13 = oa[key]
        }
        if (key === "barangay"){
          i14 = oa[key]
        }
      }
  }
  useEffect(() =>{
    setowner_name(i1)
    setowner_type(i2)
    setcontact_num(i3)
    setcontact_email(i4)
    seteducational_attainment(i5)
    setposition(i6)
    setjob_desc(i7)
    setowner_lot(i8)
    setowner_street(i9)
    setowner_city(i10)
    setowner_province(i11)
    setowner_zip_code(i12)
    setblock(i13)
    setbarangay(i14)
  }, [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12, i13, i4])
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
    var i28 = document.forms["myform"]["input28"].value; //block
    var i29 = document.forms["myform"]["input29"].value; //barangay
    if (i15 == "" ||i16 == "" ||i17 == "" ||i18 == "" ||i19 == "" ||i20 == "" ||i21 == "" ||i22 == "" ||i23 == "" ||i25 == "" ||i26 == "" ||i27 == "" || i28 == "" || i29 == "") {
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
      Axios.put("http://localhost:3001/ownersupdate", {owner_id: owner_id, owner_name: owner_name, contact_num: contact_num, contact_email: contact_email, owner_type: owner_type, educational_attainment: educational_attainment, position: position, job_desc: job_desc, block: block, lot: lot, street: street, barangay: barangay, city: city, province: province, zipcode: zipcode});
      x && navigate(generatePath("/farmprofilesview/:x", { x }));
      window.location.reload();
      alert("Owner updated");
    }
  }
  const handleProceed = (e) => {
    farm_id && navigate(generatePath("/farmprofilesview/:farm_id", { farm_id }));
  };
  return (
    <div className='App'>
      {ownerinfo.map((val)=> {
        return (
          <div>
            
      <div class="headform">
        <h1 class="titleheadform">Edit {val.owner_name}'s Owner Profile</h1>
      </div>
      <main class="container-fluid">
      <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
        <form class="formdiv" name="myform" required>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Owner Name</label>
                <input name ="input15" type="text" class="form-control" placeholder="Last Name" id="inputDefault" required placeHolder={val.owner_name} defaultValue={val.owner_name} onChange={(e) =>{setowner_name(e.target.value)}}/>
              </div>
              <div class="form-group">
                    <label for="exampleSelect1" class="form-label mt-4">Owner Type</label>
                    <select name ="input17" class="form-select" id="exampleSelect1" required  onChange={(e) =>{setowner_type(e.target.value)}}>
                    <option value={val.owner_type}>{val.owner_type}</option>
                    <option value="Single Owner">Single Owner</option>
                    <option value="Co-Owner">Co-Owner</option>
                    <option value="Coop Member">Coop Member</option>
                    </select>
                    </div>
              <label class="col-form-label mt-4" for="inputDefault"><h3>Address</h3></label>
              {owneraddress.map((values)=> {
                return (
                  <div>
                <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Block</label>
                <input name ="input28" type="text" class="form-control" placeholder="Block" id="inputDefault" required placeHolder={values.block} defaultValue={values.block} onChange={(e) =>{setblock(e.target.value)}}/>
                </div>
                    <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Lot</label>
                <input name ="input18" type="text" class="form-control" placeholder="Lot" id="inputDefault" required placeHolder={values.lot} defaultValue={values.lot} onChange={(e) =>{setowner_lot(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Street</label>
                <input name ="input19" type="text" class="form-control" placeholder="Street" id="inputDefault" required placeHolder={values.street} defaultValue={values.street} onChange={(e) =>{setowner_street(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Barangay</label>
                <input name ="input29" type="text" class="form-control" placeholder="Barangay" id="inputDefault" required placeHolder={values.barangay} defaultValue={values.barangay} onChange={(e) =>{setbarangay(e.target.value)}}/>
                </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">City</label>
                <input name ="input20" type="text" class="form-control" placeholder="City" id="inputDefault" required placeHolder={values.city} defaultValue={values.city} onChange={(e) =>{setowner_city(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Province</label>
                <input name ="input21" type="text" class="form-control" placeholder="Province" id="inputDefault" required placeHolder={values.province} defaultValue={values.province} onChange={(e) =>{setowner_province(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Zip Code</label>
                <input name ="input22" type="text" class="form-control" placeholder="Zip Code" id="inputDefault" required placeHolder={values.zipcode} defaultValue={values.zipcode} onChange={(e) =>{setowner_zip_code(e.target.value)}}/>
              </div>
                  </div>
                )
              })}
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Contact Number</label>
                <input name ="input23" type="text" class="form-control" placeholder="Contact Number" id="inputDefault" required placeHolder={val.contact_num} defaultValue={val.contact_num} onChange={(e) =>{setcontact_num(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Contact Email</label>
                <input name ="input16" type="text" class="form-control" placeholder="Contact Email" id="inputDefault" required placeHolder={val.contact_email} defaultValue={val.contact_email} onChange={(e) =>{setcontact_email(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Position</label>
                <input name ="input25" type="text" class="form-control" placeholder="Position" id="inputDefault" required placeHolder={val.position} defaultValue={val.position} onChange={(e) =>{setposition(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Educational Attainment</label>
                <input name ="input26"type="text" class="form-control" placeholder="Educational Attainment" id="inputDefault" required placeHolder={val.educational_attainment} defaultValue={val.educational_attainment} onChange={(e) =>{seteducational_attainment(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Job Description</label>
                <input name ="input27" type="text" class="form-control" placeholder="Job Description" id="inputDefault" required placeHolder={val.job_desc} defaultValue={val.job_desc} onChange={(e) =>{setjob_desc(e.target.value)}}/>
              </div>
              <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
        </form>
        </main>
          </div>
        )
      })}
      </div>
  );
}

export default Farmprofilesowner;
