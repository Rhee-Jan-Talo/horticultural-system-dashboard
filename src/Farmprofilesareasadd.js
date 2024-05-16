import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath, useParams } from 'react-router-dom';
import Axios from 'axios';


function Farmprofilesareasadd() {
    const { farm_id } = useParams();
    const x = farm_id
    const navigate = useNavigate();
    const [soiltypelist, setsoiltypelist] = useState([]);
    useEffect(() =>{
      Axios.get('http://localhost:3001/plantutilitiessoiltype').then((response) => {
        setsoiltypelist(response.data);
      })
    }, [])
    const [area_name, setarea_name] = useState("");
    const [soil_type, setsoil_type] = useState("");
    const [size, setsize] = useState("");
    const register = () => {
        var a = document.forms["myform"]["ainput"].value;
        var b = document.forms["myform"]["binput"].value;
        var c = document.forms["myform"]["cinput"].value;
        if (a == "" ||b == "" || c == "") {
          alert("All fields must be filled out");
        }
        else {
            Axios.post("http://localhost:3001/farmareasadd", {farm_id: x, area_name: area_name, soil_type: soil_type, size: size});
            x && navigate(generatePath("/farmprofilesareas/:x", { x }));
            window.location.reload();
            alert("Area Registered")
        }
      }
      const handleProceedArea = (e) => {
        x && navigate(generatePath("/farmprofilesareas/:x", { x }));
      };
    return(
        <div className="App">
            <div class="headform">
            <h1 class="titleheadform">Add New Farm Area</h1>
            </div>
            <main class="container-fluid">
            <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceedArea}>Back</button>
                <form class="formdiv" name="myform" required>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Area Name</label>
                    <input name="ainput" type="text" class="form-control" placeholder="Area Name" id="inputDefault" onChange={(e) =>{setarea_name(e.target.value)}} required/>
                </div>
                <div class="form-group">
                    <label for="exampleSelect1" class="col-form-label mt-4">Soil Type <em>(you can add new soil type in utilities)</em></label>
                    <select  name="binput" required class="form-select" id="exampleSelect1" onChange={(e) =>{ setsoil_type(e.target.value) }}>
                        <option value="">Select Soil Type</option>
                        {soiltypelist.map((val) => {
                          return (
                            <option value={val.soiltypename}>{val.soiltypename}</option>
                          )
                        })}
                    </select>
                    </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Size in Hectares</label>
                    <input name="cinput" type="number" class="form-control" placeholder="Size in Hectares" id="inputDefault" onChange={(e) =>{setsize(e.target.value)}} required />
                </div>
                <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
                </form>
            </main>

        </div>
    )
}

export default Farmprofilesareasadd;