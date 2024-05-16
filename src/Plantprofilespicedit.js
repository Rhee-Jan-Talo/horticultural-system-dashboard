import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, useParams, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Plantprofilespicedit() {
    const { plantprofileid } = useParams();
    const x = plantprofileid
    console.log(x)
    const navigate = useNavigate();
    const handleProceed = (e) => {
        x && navigate(generatePath("/plantprofilesedit/:x", { x }));
    };
    const [plantprofilelist, setplantprofilelist] = useState([]);
    useEffect(() =>{
      Axios.get(`http://localhost:3001/plantprofilesview/${x}`).then((response) => {
        setplantprofilelist(response.data);
      })
    }, [x])
  const ea = plantprofilelist[0]
  var i1
  for (var key in ea) {
    if (key === "plantprofilepicture"){
        i1 = ea[key]
    }
  }
  console.log(i1)
  const [plantprofilepicture, setplantprofilepicture] = useState("");
  useEffect(() =>{
    setplantprofilepicture(i1)
  }, [i1])
  const register = (employeeid) => {
    var a = document.forms["myform"]["ainput"].value;
    if (a == "") {
      alert("Field must be filled out");
    }
    else {
      const formData = new FormData()
        formData.append('profileImg', plantprofilepicture)
        formData.append('plant_id', x)
      Axios.put("http://localhost:3001/plantprofilepicedit", formData);
      x && navigate(generatePath("/plantprofilesview/:x", { x }));
        window.location.reload();
        alert("Plant Picture Updated");
    }
  }
  return (
    <div className='App'>
        {plantprofilelist.map((val) => {
            return (
                <div>
                    <div class="headform">
                    <h1 class="titleheadform">Edit {val.plant_name}'s Picture</h1>
                    </div>
                    <main class="container-fluid">
                    <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
                    <form class="formdiv" enctype="multipart/form-data" name="myform" required>
                    <div>
                      <p><h4><b>Plant Image:</b></h4></p>
                      <img class="viewimage" alt="plant image" src={`data:image/jpeg;base64,${val.img}`}></img>
                      </div>
                        <div class="form-group">
                            <label for="formFile" class="form-label mt-4">Plant Picture</label>
                            <input name="ainput" class="form-control" type="file" id="formFile" onChange={(e) =>{setplantprofilepicture(e.target.files[0])}} required />
                        </div>
                        <button type="submit" value="Submit" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
                    </form>
                    </main>
                </div>
            )
        })}
    </div>
  );
}

export default Plantprofilespicedit;
