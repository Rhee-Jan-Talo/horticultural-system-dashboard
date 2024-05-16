import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useParams, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Plantprofilesedit() {
    const { plantprofileid } = useParams();
  const x = plantprofileid
  console.log(x)
  const [plantprofileplantname, setplantprofileplantname] = useState("")
  const [plantprofilecategory, setplantprofilecategory] = useState("")
  const [plantprofilescientificname, setplantprofilescientificname] = useState("")
  const [plantprofilevariety, setplantprofilevariety] = useState("")
  const [plantprofileplanttype, setplantprofileplanttype] = useState("")
  const [plantprofilemonths, setplantprofilemonths] = useState("")
  const [plantprofiledescription, setplantprofiledescription] = useState("")
  const [plantprofilelist, setplantprofilelist] = useState([]);
  const [farmlist, setfarmlist] = useState([]);
  const [plantcategorylist, setplantcategorylist] = useState([]); //for category
  const [planttypelist, setplanttypelist] = useState([]); //for type
  const navigate = useNavigate();
  useEffect(() =>{
    Axios.get(`http://localhost:3001/plantprofilesview/${x}`).then((response) => {
      setplantprofilelist(response.data);
    })
  }, [x])
  useEffect(() =>{
    Axios.get('http://localhost:3001/farmlist').then((response) => {
      setfarmlist(response.data);
    })
  }, [])
  console.log(plantprofilelist)
  const ea = plantprofilelist[0]
  var i1, i2, i3, i4, i5, i6, i7;
  for (var key in ea) {
    if (ea.hasOwnProperty(key)) {
        if (key === "plant_name"){
          i1 = ea[key]
        }
        if (key === "category"){
          i2 = ea[key]
        }
        if (key === "sci_name"){
          i3 = ea[key]
        }
        if (key === "variety"){
          i4 = ea[key]
        }
        if (key === "plant_type"){
          i5 = ea[key]
        }
        if (key === "num_of_mon_to_harvest"){
          i6 = ea[key]
        }
        if (key === "plant_desc"){
          i7 = ea[key]
        }
    }
  }
  const handleProceedPic = (e) => {
    x && navigate(generatePath("/plantprofilespicedit/:x", { x }));
  };
  const handleProceed = (e) => {
    x && navigate(generatePath("/plantprofilesview/:x", { x }));
  };
  useEffect(() =>{
    setplantprofileplantname(i1)
    setplantprofilecategory(i2)
    setplantprofilescientificname(i3)
    setplantprofilevariety(i4)
    setplantprofileplanttype(i5)
    setplantprofilemonths(i6)
    setplantprofiledescription(i7)
  }, [i1, i2, i3, i4, i5, i6, i7])
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
    // no ginput kay gilahi ang pic edit
    var a = document.forms["myform"]["ainput"].value;
    var b = document.forms["myform"]["binput"].value;
    var c = document.forms["myform"]["cinput"].value;
    var d = document.forms["myform"]["dinput"].value;
    var e = document.forms["myform"]["einput"].value;
    var f = document.forms["myform"]["finput"].value;
    //var h = document.forms["myform"]["hinput"].value; //naay sumting wrong sa pagpilig farm pero ok lang na wala sa if else
    if (a == "" ||b == "" || c == "" ||d == "" || e == "" ||f == "" ) {
      alert("Required fields must be filled out");
    }
    else {
        Axios.put("http://localhost:3001/plantprofileedit", {plantprofileid: x, plantprofileplantname: plantprofileplantname, plantprofilecategory: plantprofilecategory, plantprofilescientificname: plantprofilescientificname, plantprofilevariety: plantprofilevariety, plantprofileplanttype: plantprofileplanttype, plantprofilemonths: plantprofilemonths, plantprofiledescription: plantprofiledescription});
        x && navigate(generatePath("/plantprofilesview/:x", { x }));
        window.location.reload();
        alert("Plant Profile Updated");
    }
  }
  return (
    <div className='App'>
        {plantprofilelist.map((val)=> {
            return (
                <div>
                    <div class="headform">
        <h1 class="titleheadform">Edit {val.plant_name}</h1>
      </div>
      <main class="container-fluid">
      <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
      <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedPic}>Edit Plant Picture File</button>
        <form class="formdiv" name="myform" required>
            <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Plant Name</label>
                <input name="ainput" required type="text" class="form-control" placeholder={val.plant_name} defaultValue={val.plant_name} id="inputDefault" onChange={(e) =>{
          setplantprofileplantname(e.target.value)
        }}/>
              </div>
              <div class="form-group">
                    <label for="exampleSelect1" class="col-form-label mt-4">Category <em>(you can add new plant category in utilities)</em></label>
                    <select  name="binput" required class="form-select" id="exampleSelect1" onChange={(e) =>{
          setplantprofilecategory(e.target.value)
        }}>
                    <option>{val.category}</option>
                        {plantcategorylist.map((val) => {
                          return (
                            <option>{val.plantprofilename}</option>
                          )
                        })}
                    </select>
                    </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Scientific Name</label>
                <input  name="cinput" required type="text" class="form-control" placeholder={val.sci_name} defaultValue={val.sci_name} id="inputDefault" onChange={(e) =>{
          setplantprofilescientificname(e.target.value)
        }}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Variety</label>
                <input  name="dinput" required type="text" class="form-control" placeholder={val.variety} defaultValue={val.variety} id="inputDefault" onChange={(e) =>{
          setplantprofilevariety(e.target.value)
        }}/>
              </div>
              <div class="form-group">
                    <label for="exampleSelect1" class="col-form-label mt-4">Plant Type <em>(you can add new plant type in utilities)</em></label>
                    <select name="einput" required class="form-select" id="exampleSelect1"onChange={(e) =>{
          setplantprofileplanttype(e.target.value)
        }}>
                    <option>{val.plant_type}</option>
                      {planttypelist.map((val) => {
                        return (
                          <option>{val.planttypename}</option>
                        )
                      })}
                    </select>
                    </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Estimated # of Months to be Harvested</label>
                <input name="finput" required type="text" class="form-control" placeholder={val.num_of_mon_to_harvest} defaultValue={val.num_of_mon_to_harvest} id="inputDefault" onChange={(e) =>{
          setplantprofilemonths(e.target.value)
        }}/>
              </div>
              <div class="form-group">
                <label class="col-form-label mt-4" for="inputDefault">Description</label>
                <input name="hinput" required type="text" class="form-control" placeholder={val.plant_desc} defaultValue={val.plant_desc} id="inputDefault" onChange={(e) =>{
          setplantprofiledescription(e.target.value)
        }}/>
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

export default Plantprofilesedit;
