import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Farmprofilesadd() {
  const [farm_name, setfarm_name] = useState("");
  const [img_map, setimg_map] = useState("");
  const [google_map, setgoogle_map] = useState("");
  const [org_chart, setorg_chart] = useState("");
  const [size, setsize] = useState("");

  var owner_farm_id = "";
  const [owner_name, setowner_name] = useState("");
  const [contact_num, setcontact_num] = useState("");
  const [contact_email, setcontact_email] = useState("");
  const [owner_type, setowner_type] = useState("");
  const [educational_attainment, seteducational_attainment] = useState("");
  const [position, setposition] = useState("");
  const [job_desc, setjob_desc] = useState("");

  var address_farm_id = "";
  const [block, setblock] = useState("");
  const [lot, setlot] = useState("");
  const [street, setstreet] = useState("");
  const [barangay, setbarangay] = useState("");
  const [city, setcity] = useState("");
  const [province, setprovince] = useState("");
  const [zipcode, setzip_code] = useState("");

  var address_owner_id = "";
  const [owner_block, setowner_block] = useState("");
  const [owner_lot, setowner_lot] = useState("");
  const [owner_street, setowner_street] = useState("");
  const [owner_barangay, setowner_barangay] = useState("");
  const [owner_city, setowner_city] = useState("");
  const [owner_province, setowner_province] = useState("");
  const [owner_zipcode, setowner_zip_code] = useState("");

  var contact_info_farm_id = "";
  const [farm_contact_person_name, setcontact_person_name] = useState("");
  const [farm_position, setcontact_info_position] = useState("");
  const [farm_contact_info_contact_num, setcontact_info_contact_num] = useState("");
  const [farm_contact_info_contact_email, setcontact_info_contact_email] = useState("");

  const [soiltypelist, setsoiltypelist] = useState([]);
  useEffect(() =>{
    Axios.get('http://localhost:3001/plantutilitiessoiltype').then((response) => {
      setsoiltypelist(response.data);
    })
  }, []) //gamiton later on for areas add
  const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const register = () => {
    var i1 = document.forms["myform"]["input1"].value;
    var i2 = document.forms["myform"]["input2"].value;
    var i3 = document.forms["myform"]["input3"].value;
    var i4 = document.forms["myform"]["input4"].value;
    var i5 = document.forms["myform"]["input5"].value;
    var i6 = document.forms["myform"]["input6"].value;
    var i7 = document.forms["myform"]["input7"].value; //farm block
    var i8 = document.forms["myform"]["input8"].value; //farm barangay
    var i9 = document.forms["myform"]["input9"].value; //owner block
    var i10 = document.forms["myform"]["input10"].value; //fowner address
    var i11 = document.forms["myform"]["input11"].value;
    var i12 = document.forms["myform"]["input12"].value;
    var i13 = document.forms["myform"]["input13"].value;
    var i14 = document.forms["myform"]["input14"].value;
    var i15 = document.forms["myform"]["input15"].value; //giisa ang owner name
    var i16 = document.forms["myform"]["input16"].value; //owner contact email
    var i17 = document.forms["myform"]["input17"].value;
    var i18 = document.forms["myform"]["input18"].value;
    var i19 = document.forms["myform"]["input19"].value;
    var i20 = document.forms["myform"]["input20"].value;
    var i21 = document.forms["myform"]["input21"].value;
    var i22 = document.forms["myform"]["input22"].value;
    var i23 = document.forms["myform"]["input23"].value;
    var i24 = document.forms["myform"]["input24"].value; //province field
    var i25 = document.forms["myform"]["input25"].value;
    var i26 = document.forms["myform"]["input26"].value;
    var i27 = document.forms["myform"]["input27"].value;
    var i28 = document.forms["myform"]["input28"].value;
    var i29 = document.forms["myform"]["input29"].value;
    var i30 = document.forms["myform"]["input30"].value;
    let checker =  /^\d+$/.test(farm_contact_info_contact_num);
    let checker2 =  /^\d+$/.test(contact_num)
    let validemail = validateEmail(farm_contact_info_contact_email)
    let validemail2 = validateEmail(contact_email)
    if (i1 == "" ||i2 == "" ||i3 == "" ||i4 == "" ||i5 == "" ||i6 == "" ||i7 == "" ||i8 == "" ||i9 == "" ||i10 == "" ||i11 == "" ||i12 == "" ||i13 == "" ||i14 == "" ||i15 == "" ||i16 == "" ||i17 == "" ||i18 == "" ||i19 == "" ||i20 == "" ||i21 == "" ||i22 == "" ||i23 == "" ||i24 == "" ||i25 == "" ||i26 == "" ||i27 == ""||i28 == ""||i29 == ""||i30 == "") {
      alert("All fields must be filled out");
    }
    else if(checker == false){
      alert("Farm contact number invalid input")
    }
    else if(farm_contact_info_contact_num.length != 11){
      alert("Farm contact number invalid input")
    }
    else if(checker2 == false){
      alert("Owner contact number invalid input")
    }
    else if(contact_num.length != 11){
      alert("Owner contact number invalid input")
    }
    else if(validemail == null){
      alert("Farm contact email invalid input")
    }
    else if(validemail2 == null){
      alert("Owner contact email invalid input")
    }
    else {
      const formData = new FormData()
      formData.append('profileImg', img_map)
      formData.append('profileImg', google_map)
      formData.append('profileImg', org_chart)
      formData.append('farm_name', farm_name)
      formData.append('size', size)
      formData.append('owner_name', owner_name)
      formData.append('owner_type', owner_type)
      formData.append('contact_num', contact_num)
      formData.append('contact_email', contact_email)
      formData.append('educational_attainment', educational_attainment)
      formData.append('position', position)
      formData.append('job_desc', job_desc)
      formData.append('farm_contact_person_name', farm_contact_person_name)
      formData.append('farm_position', farm_position)
      formData.append('farm_contact_info_contact_num', farm_contact_info_contact_num)
      formData.append('farm_contact_info_contact_email', farm_contact_info_contact_email)
      formData.append('block', block)
      formData.append('lot', lot)
      formData.append('street', street)
      formData.append('barangay', barangay)
      formData.append('city', city)
      formData.append('province', province)
      formData.append('zipcode', zipcode)
      formData.append('owner_block', owner_block)
      formData.append('owner_lot', owner_lot)
      formData.append('owner_street', owner_street)
      formData.append('owner_barangay', owner_barangay)
      formData.append('owner_city', owner_city)
      formData.append('owner_province', owner_province)
      formData.append('owner_zipcode', owner_zipcode)
      Axios.post("http://localhost:3001/farmpprofileadd", formData);
      //Axios.post("http://localhost:3001/farmpprofileadd", {farm_name: farm_name, size: size, soil_type: soil_type, description: description, title : title, main_owner: main_owner, owner_name: owner_name, owner_type: owner_type, contact_num: contact_num, contact_email: contact_email, educational_attainment: educational_attainment, position: position, job_desc: job_desc, farm_contact_person_name: farm_contact_person_name, farm_position: farm_position, farm_contact_info_contact_num: farm_contact_info_contact_num, farm_contact_info_contact_email: farm_contact_info_contact_email, lot: lot, street: street, city: city, province: province, zipcode: zipcode, owner_lot: owner_lot, owner_street: owner_street, owner_city: owner_city, owner_province: owner_province, owner_zipcode: owner_zipcode});
      navigate('/farmprofiles', { replace: true });
      window.location.reload();
      alert("Farm recorded")
      console.log(formData)
      for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }
    }
  }
  return (
    <div className='App'>
        <div class="headform">
        <h1 class="titleheadform">General Information</h1>
      </div>
      <main class="container-fluid">
      <Link to="/farmprofiles"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
        <form class="formdiv" enctype="multipart/form-data" name="myform" required>
            <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Farm Name</label>
                <input name ="input1" type="text" class="form-control" placeholder="Farm Name" id="inputDefault" required onChange={(e) =>{setfarm_name(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label for="formFile" class="form-label mt-4">Image Map</label>
                <input name="input28" class="form-control" type="file" id="formFile" onChange={(e) =>{setimg_map(e.target.files[0])}} />
              </div>
              <div class="form-group">
                <label for="formFile" class="form-label mt-4">Google Map Image</label>
                <input name="input29" class="form-control" type="file" id="formFile" onChange={(e) =>{setgoogle_map(e.target.files[0])}} />
              </div>
              <div class="form-group">
                <label for="formFile" class="form-label mt-4">Organizational Chart</label>
                <input name="input30" class="form-control" type="file" id="formFile" onChange={(e) =>{setorg_chart(e.target.files[0])}} />
              </div>
              <label class="col-form-label mt-4" for="inputDefault"><h3>Address</h3></label>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Block</label>
                <input name ="input7" type="text" class="form-control" placeholder="Block" id="inputDefault" required onChange={(e) =>{setblock(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Lot</label>
                <input name ="input2" type="text" class="form-control" placeholder="Lot" id="inputDefault" required onChange={(e) =>{setlot(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Street</label>
                <input name ="input3" type="text" class="form-control" placeholder="Street" id="inputDefault" required onChange={(e) =>{setstreet(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Barangay</label>
                <input name ="input8" type="text" class="form-control" placeholder="Barangay" id="inputDefault" required onChange={(e) =>{setbarangay(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">City</label>
                <input name ="input4" type="text" class="form-control" placeholder="City" id="inputDefault" required onChange={(e) =>{setcity(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Province</label>
                <input name ="input24" type="text" class="form-control" placeholder="Province" id="inputDefault" required onChange={(e) =>{setprovince(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Zip Code</label>
                <input name ="input5" type="text" class="form-control" placeholder="Zip Code" id="inputDefault" required onChange={(e) =>{setzip_code(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Size in Hectares</label>
                <input name ="input6" type="text" class="form-control" placeholder="Size in Hectares" id="inputDefault" required onChange={(e) =>{setsize(e.target.value)}}/>
              </div>
              <h1 class="titleheadform">Contact Information</h1>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Contact Person</label>
                <input name ="input11" type="text" class="form-control" placeholder="format: First Name_Middle Initial_Last Name" id="inputDefault" required onChange={(e) =>{setcontact_person_name(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Position</label>
                <input name ="input12" type="text" class="form-control" placeholder="Position" id="inputDefault" required onChange={(e) =>{setcontact_info_position(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Contact Number</label>
                <input name ="input13" type="text" class="form-control" placeholder="Contact Number" id="inputDefault" required onChange={(e) =>{setcontact_info_contact_num(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Contact Email</label>
                <input name ="input14" type="text" class="form-control" placeholder="Contact Email" id="inputDefault" required onChange={(e) =>{setcontact_info_contact_email(e.target.value)}}/>
              </div>
              <h1 class="titleheadform">Owner Information</h1>
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
              <label class="col-form-label mt-4" for="inputDefault"><h3>Owner Address</h3></label>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Block</label>
                <input name ="input9" type="text" class="form-control" placeholder="Block" id="inputDefault" required onChange={(e) =>{setowner_block(e.target.value)}}/>
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
                <input name ="input10" type="text" class="form-control" placeholder="Barangay" id="inputDefault" required onChange={(e) =>{setowner_barangay(e.target.value)}}/>
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

export default Farmprofilesadd;
