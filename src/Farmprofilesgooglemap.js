import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, useNavigate, useParams, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Farmprofilesgooglemap() {
  const { farm_id } = useParams();
  const x = farm_id
  const navigate = useNavigate();
  const [google_map, setgoogle_map] = useState("");
  const [farmpicsinfo, setfarmpicsinfo] = useState([]);
  useEffect(() =>{
    Axios.get(`http://localhost:3001/farmprofilepcicsget/${x}`).then((response) => {
      setfarmpicsinfo(response.data);
      console.log("pics:", farmpicsinfo)
    })
  }, [x])
  const register = () => {
    var i1 = document.forms["myform"]["input1"].value;
    if (i1 == "" ) {
      alert("Field must be filled out");
    }
    else {
        const formData = new FormData()
        formData.append('profileImg', google_map)
        formData.append('farm_id', x)
      Axios.put("http://localhost:3001/farmgooglemapupdate", formData);
      x && navigate(generatePath("/farmprofilesview/:x", { x }));
      window.location.reload();
      alert("Image Map updated");
    }
  }
  const handleProceed = (e) => {
    x && navigate(generatePath("/farmprofilesview/:x", { x }));
  };
  return (
    <div className='App'>
        <div>
            <div class="headform">
        <h1 class="titleheadform">Update Google Map Image</h1>
      </div>
      <main class="container-fluid">
      <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
        <form class="formdiv" enctype="multipart/form-data" name="myform" required>
        {farmpicsinfo.map((valorant)=> {
              return(
                <div>
                  <p><h4><b>Google Map Image:</b></h4></p>
                  <img class="viewimage" alt="image map" src={`data:image/jpeg;base64,${valorant.google_map}`}></img>
                  </div>
              )
            })}
            <div class="form-group">
                <label for="formFile" class="form-label mt-4">Google Map Image</label>
                <input name="input1" class="form-control" type="file" id="formFile" onChange={(e) =>{setgoogle_map(e.target.files[0])}} />
              </div>
              <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
              </form>
        </main>
          </div>
    </div>
  );
}

export default Farmprofilesgooglemap;
