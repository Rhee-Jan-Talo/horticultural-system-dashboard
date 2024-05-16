import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, useParams, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Plantprofilesdiseaseadd() {
    const { plant_id } = useParams();
    const x = plant_id
    console.log(x)
    const navigate = useNavigate();
    const handleProceed = (e) => {
        x && navigate(generatePath("/plantprofilesview/:x", { x }));
      };
    const [plantprofilelist, setPlantprofilelist] = useState([]);
    useEffect(() =>{
        Axios.get(`http://localhost:3001/plantprofilesview/${x}`).then((response) => {
          setPlantprofilelist(response.data);
        })
      }, [x])    
      const [plantdisease, setplantdisease] = useState("");
      const submitPlantDisease = () => {
        Axios.post("http://localhost:3001/plantprofilediseaseadd", {plant_id: x, diseases: plantdisease});
        x && navigate(generatePath("/plantprofilesview/:x", { x }));
      window.location.reload();
      alert("Plant Disease recorded")
      };
  return (
    <div className='App'>
        {plantprofilelist.map((val)=> {
            return (
                    <div>
                        <div class="headform">
                            <h1 class="titleheadform">Add a Plant Disease for {val.plant_name} </h1>
                        </div>
                        <main class="container-fluid">
                        <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
                        <div class="formdiv">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Plant Disease" aria-label="Recipient's username" aria-describedby="button-addon2"onChange={(e) =>{
                                    setplantdisease(e.target.value)
                                    }}/>
                                <button class="btn btn-primary" type="button" id="button-addon2" onClick={submitPlantDisease}>Add</button>
                            </div>
                            </div>
                        </main>
                    </div>
            )
        })}
    </div>
  );
}

export default Plantprofilesdiseaseadd;
