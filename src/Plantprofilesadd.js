import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Plantprofilesadd() {
  const [plantprofileplantname, setplantprofileplantname] = useState("")
  const [plantprofilecategory, setplantprofilecategory] = useState("")
  const [plantprofilepscientificname, setplantprofilepscientificname] = useState("")
  const [plantprofilevariety, setplantprofilevariety] = useState("")
  const [plantprofileplanttype, setplantprofileplanttype] = useState("")
  const [plantprofilemonths, setplantprofilemonths] = useState("")
  const [plantprofilepicture, setplantprofilepicture] = useState("")
  const [plantprofiledescription, setplantprofiledescription] = useState("")
  const [farmlist, setfarmlist] = useState([]);
  const [plantcategorylist, setplantcategorylist] = useState([]); //for category
  const [planttypelist, setplanttypelist] = useState([]); //for type
  const navigate = useNavigate();
  useEffect(() =>{
    Axios.get('http://localhost:3001/farmlist').then((response) => {
      setfarmlist(response.data);
    })
  }, [])
  useEffect(() =>{
    Axios.get('http://localhost:3001/plantutilitiesplantprofile').then((response) => {
      setplantcategorylist(response.data);
    })
  }, [])
  useEffect(() =>{
    Axios.get('http://localhost:3001/plantutilitiesplanttype').then((response) => {
      setplanttypelist(response.data);
    })
  }, [])
  const register = () => {
    var a = document.forms["myform"]["ainput"].value;
    var b = document.forms["myform"]["binput"].value;
    var c = document.forms["myform"]["cinput"].value;
    var d = document.forms["myform"]["dinput"].value;
    var e = document.forms["myform"]["einput"].value;
    var f = document.forms["myform"]["finput"].value;
    var g = document.forms["myform"]["ginput"].value;
    //var h = document.forms["myform"]["hinput"].value; farm unta diri
    var i = document.forms["myform"]["iinput"].value;
    if (a == "" ||b == "" || c == "" ||d == "" || e == "" ||f == "" || g == ""||i == "") {
      alert("Required fields must be filled out");
    }
    else {
      const formData = new FormData()
      formData.append('profileImg', plantprofilepicture)
      formData.append('plantprofileplantname', plantprofileplantname)
      formData.append('plantprofilecategory', plantprofilecategory)
      formData.append('plantprofilepscientificname', plantprofilepscientificname)
      formData.append('plantprofilevariety', plantprofilevariety)
      formData.append('plantprofileplanttype', plantprofileplanttype)
      formData.append('plantprofilemonths', plantprofilemonths)
      formData.append('plantprofiledescription', plantprofiledescription)
      Axios.post("http://localhost:3001/plantprofileadd", formData);
      navigate('/plantprofiles', { replace: true });
      window.location.reload();
      for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }
      alert("Plant Profile Registered");
    }
  }
  return (
    <div className='App'>
        <div class="headform">
        <h1 class="titleheadform">New Plant Profile</h1>
      </div>
      <main class="container-fluid">
      <Link to="/plantprofiles"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
        <form class="formdiv" enctype="multipart/form-data" name="myform" required>
            <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Plant Name</label>
                <input name="ainput" required type="text" class="form-control" placeholder="Plant Name" id="inputDefault" onChange={(e) =>{
          setplantprofileplantname(e.target.value)
        }}/>
              </div>
              <div class="form-group">
                    <label for="exampleSelect1" class="col-form-label mt-4">Category <em>(you can add new plant category in utilities)</em></label>
                    <select  name="binput" required class="form-select" id="exampleSelect1" onChange={(e) =>{
          setplantprofilecategory(e.target.value)
        }}>
                        <option value="">Select Plant Category</option>
                        {plantcategorylist.map((val) => {
                          return (
                            <option>{val.plantprofilename}</option>
                          )
                        })}
                    </select>
                    </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Scientific Name</label>
                <input  name="cinput" required type="text" class="form-control" placeholder="Scientific Name" id="inputDefault" onChange={(e) =>{
          setplantprofilepscientificname(e.target.value)
        }}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Variety</label>
                <input  name="dinput" required type="text" class="form-control" placeholder="Variety" id="inputDefault" onChange={(e) =>{
          setplantprofilevariety(e.target.value)
        }}/>
              </div>
              <div class="form-group">
                    <label for="exampleSelect1" class="col-form-label mt-4">Plant Type <em>(you can add new plant type in utilities)</em></label>
                    <select name="einput" required class="form-select" id="exampleSelect1"onChange={(e) =>{
          setplantprofileplanttype(e.target.value)
        }}>
                    <option value="">Select Plant Type</option>
                      {planttypelist.map((val) => {
                        return (
                          <option>{val.planttypename}</option>
                        )
                      })}
                    </select>
                    </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Estimated # of Months to be Harvested</label>
                <input name="finput" required type="text" class="form-control" placeholder="# of Months" id="inputDefault" onChange={(e) =>{
          setplantprofilemonths(e.target.value)
        }}/>
              </div>
              <div class="form-group">
                <label for="formFile" class="form-label mt-4">Plant Picture</label>
                <input name="ginput" required class="form-control" type="file" id="formFile" onChange={(e) =>{
          setplantprofilepicture(e.target.files[0])
        }}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Description</label>
                <input  name="iinput" required type="text" class="form-control" placeholder="Description" id="inputDefault" onChange={(e) =>{
          setplantprofiledescription(e.target.value)
        }}/>
              </div>
              <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
        </form>
        </main>
      </div>
  );
}

export default Plantprofilesadd;
