import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import Supplierslist from "./Supplierslist";


function Suppliersedit() {
    const { supplier_id } = useParams();
    const x = supplier_id
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

    const [supplierinfo, setsupplierinfo] = useState([]);
    useEffect(() =>{
        Axios.get(`http://localhost:3001/suppliersinfo/${x}`).then((response) => {
            setsupplierinfo(response.data);
        })
      }, [x])
    const [addressinfo, setaddressinfo] = useState([]);
    useEffect(() =>{
        Axios.get(`http://localhost:3001/addressinfo/${x}`).then((response) => {
            setaddressinfo(response.data);
        })
    }, [x])
    const [contactinfoinfo, setcontactinfoinfo] = useState([]);
    useEffect(() =>{
        Axios.get(`http://localhost:3001/contactinfoinfo/${x}`).then((response) => {
            setcontactinfoinfo(response.data);
        })
    }, [x])
    var i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12
    const ea = supplierinfo[0]
    const oa = addressinfo[0]
    const ua = contactinfoinfo[0]
    for (var key in ea) {
        if (ea.hasOwnProperty(key)) {
            if (key === "company_name"){
              i1 = ea[key]
            }
        }
      }
    for (var key in oa) {
        if (oa.hasOwnProperty(key)) {
            if (key === "lot"){
                i2 = oa[key]
            }
            if (key === "street"){
                i3 = oa[key]
            }
            if (key === "city"){
                i4 = oa[key]
            }
            if (key === "province"){
                i5 = oa[key]
            }
            if (key === "zipcode"){
                i6 = oa[key]
            }
            if (key === "block"){
              i11 = oa[key]
            }
            if (key === "barangay"){
              i12 = oa[key]
            }
        }
    }
    for (var key in ua) {
        if (ua.hasOwnProperty(key)) {
            if (key === "contact_person_name"){
                i7 = ua[key]
            }
            if (key === "position"){
                i8 = ua[key]
            }
            if (key === "contact_num"){
                i9 = ua[key]
            }
            if (key === "contact_email"){
                i10 = ua[key]
            }
        }
    }
    useEffect(() =>{
        setcompany_name(i1)
        setlot(i2)
        setstreet(i3)
        setcity(i4)
        setprovince(i5)
        setzip_code(i6)
        setcontact_person_name(i7)
        setcontact_info_position(i8)
        setcontact_info_contact_num(i9)
        setcontact_info_contact_email(i10)
        setblock(i11)
        setbarangay(i12)
      }, [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12])
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
          alert("All fields must be filled out");
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
            Axios.put("http://localhost:3001/suppliersupdate", {supplier_id: x, company_name: company_name, contact_person_name: contact_person_name, position: position, contact_num: contact_num, contact_email: contact_email, block: block, lot: lot, street: street, barangay: barangay, city: city, province: province, zipcode: zipcode});
            navigate('/supplierslist', { replace: true });
            window.location.reload();
            alert("Supplier Updated")
        }
      }
    return(
        <div className="App">
            <div class="headform">
            <h1 class="titleheadform">Edit Supplier {i1} Profile</h1>
            </div>
            <main class="container-fluid">
            <Link to="/supplierslist"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
                <form class="formdiv" name="myform" required>
                {supplierinfo.map((val)=> {
                    return (
                        <div class="form-group">
                        <label class="col-form-label mt-4" for="inputDefault">Company Name</label>
                        <input name="ainput" type="text" class="form-control" placeholder={val.company_name} defaultValue={val.company_name} id="inputDefault" onChange={(e) =>{setcompany_name(e.target.value)}} required/>
                        </div>
                    )
                })}
                <label class="col-form-label mt-4" for="inputDefault"><h3>Address</h3></label>
              {addressinfo.map((val)=> {
                return (
                    <div>
                      <div class="form-group">
                      <label class="col-form-label mt-4" for="inputDefault">Block</label>
                      <input name="kinput" type="text" class="form-control" placeholder={val.block} defaultValue={val.block} id="inputDefault" onChange={(e) =>{setblock(e.target.value)}} />
                    </div>
                        <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Lot</label>
                <input name="binput" type="text" class="form-control" placeholder={val.lot} defaultValue={val.lot} id="inputDefault" onChange={(e) =>{setlot(e.target.value)}} required />
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Street</label>
                <input name="cinput" type="text" class="form-control" placeholder={val.street} defaultValue={val.street} id="inputDefault" onChange={(e) =>{setstreet(e.target.value)}} />
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Barangay</label>
                <input name="linput" type="text" class="form-control" placeholder={val.barangay} defaultValue={val.barangay} id="inputDefault" onChange={(e) =>{setbarangay(e.target.value)}} />
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">City</label>
                <input name="dinput" type="text" class="form-control" placeholder={val.city} defaultValue={val.city} id="inputDefault" onChange={(e) =>{setcity(e.target.value)}} required />
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Province</label>
                <input name="einput" type="text" class="form-control" placeholder={val.province} defaultValue={val.province} id="inputDefault" onChange={(e) =>{setprovince(e.target.value)}} required />
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Zip Code</label>
                <input name="finput" type="text" class="form-control" placeholder={val.zipcode} defaultValue={val.zipcode} id="inputDefault" onChange={(e) =>{setzip_code(e.target.value)}} />
              </div>
                    </div>
                )
              })}
              <label class="col-form-label mt-4" for="inputDefault"><h3>Contact Information</h3></label>
              {contactinfoinfo.map((val)=> {
                return (
                    <div>
                        <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Contact Person</label>
                <input name ="ginput" type="text" class="form-control" placeholder={val.contact_person_name} defaultValue={val.contact_person_name} id="inputDefault" required onChange={(e) =>{setcontact_person_name(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Position</label>
                <input name ="hinput" type="text" class="form-control" placeholder={val.position} defaultValue={val.position} id="inputDefault" required onChange={(e) =>{setcontact_info_position(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Contact Number</label>
                <input name ="iinput" type="text" class="form-control" placeholder={val.contact_num} defaultValue={val.contact_num} id="inputDefault" required onChange={(e) =>{setcontact_info_contact_num(e.target.value)}}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Contact Email</label>
                <input name ="jinput" type="text" class="form-control" placeholder={val.contact_email} defaultValue={val.contact_email} id="inputDefault" required onChange={(e) =>{setcontact_info_contact_email(e.target.value)}}/>
              </div>
                    </div>
                )
              })}
                <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
                </form>
            </main>

        </div>
    )
}

export default Suppliersedit;