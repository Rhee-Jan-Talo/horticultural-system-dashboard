import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, useNavigate, generatePath, useParams } from 'react-router-dom';
import Axios from 'axios';

function Plantprofilesdiseaseedit() {
  const { disease_id } = useParams();
    const x = disease_id
    console.log(x)
    const navigate = useNavigate();
    const handleProceed = (e) => {
        i2 && navigate(generatePath("/plantprofilesview/:i2", { i2 }));
      };
    const [diseaseinfo, setdiseaseinfo] = useState([]);
    useEffect(() =>{
        Axios.get(`http://localhost:3001/plantprofilediseaseinfo/${x}`).then((response) => {
          setdiseaseinfo(response.data);
        })
      }, [x])
      console.log(diseaseinfo)    
      const [plantdisease, setplantdisease] = useState("");
      const submitPlantDisease = () => {
        Axios.put("http://localhost:3001/plantprofilediseaseedit", {disease_id: x, diseases: plantdisease});
        i2 && navigate(generatePath("/plantprofilesview/:i2", { i2 }));
      window.location.reload();
      alert("Plant Disease updated")
      };
      const ea = diseaseinfo[0]
      var i1, i2
      for (var key in ea) {
        if (ea.hasOwnProperty(key)) {
            if (key === "diseases"){
              i1 = ea[key]
            }
            if (key === "plant_id"){
              i2 = ea[key]
            }
        }
      }
      useEffect(() =>{
        setplantdisease(i1)
      }, [i1])
      
  return (
    <div className='App'>
        {diseaseinfo.map((val)=> {
            return (
                    <div>
                        <div class="headform">
                            <h1 class="titleheadform">Edit {val.diseases} </h1>
                        </div>
                        <main class="container-fluid">
                        <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
                        <div class="formdiv">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder={val.diseases} defaultValue={val.diseases} aria-label="Recipient's username" aria-describedby="button-addon2"onChange={(e) =>{
                                    setplantdisease(e.target.value)
                                    }}/>
                                <button class="btn btn-primary" type="button" id="button-addon2" onClick={submitPlantDisease}>Update</button>
                            </div>
                            </div>
                        </main>
                    </div>
            )
        })}
    </div>
  );
}

export default Plantprofilesdiseaseedit;
