import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath, useParams } from 'react-router-dom';
import Axios from 'axios';


function Farmprofilesareasedit() {
    const { area_id } = useParams();
    const x = area_id
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

    const [areainfo, setareainfo] = useState([]);
    useEffect(() =>{
      Axios.get(`http://localhost:3001/farmareasinfo/${x}`).then((response) => {
        setareainfo(response.data);
      })
    }, [x])
    const ea = areainfo[0]
    var i1, i2, i3
    for (var key in ea) {
        if (ea.hasOwnProperty(key)) {
            if (key === "area_name"){
              i1 = ea[key]
            }
            if (key === "soil_type"){
              i2 = ea[key]
            }
            if (key === "size"){
              i3 = ea[key]
            }
          }
      }
    useEffect(() =>{
        setarea_name(i1)
        setsoil_type(i2)
        setsize(i3)
  }, [i1, i2, i3])
    const register = () => {
        var a = document.forms["myform"]["ainput"].value;
        var b = document.forms["myform"]["binput"].value;
        var c = document.forms["myform"]["cinput"].value;
        if (a == "" ||b == "" || c == "") {
          alert("All fields must be filled out");
        }
        else {
            Axios.put("http://localhost:3001/farmareasupdate", {area_id: x, area_name: area_name, soil_type: soil_type, size: size});
            x && navigate(generatePath("/farmprofilesareas/:x", { x }));
            window.location.reload();
            alert("Area Updated")
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
                    <input name="ainput" type="text" class="form-control" placeholder={i1} defaultValue={i1} id="inputDefault" onChange={(e) =>{setarea_name(e.target.value)}} required/>
                </div>
                <div class="form-group">
                    <label for="exampleSelect1" class="col-form-label mt-4">Soil Type <em>(you can add new soil type in utilities)</em></label>
                    <select  name="binput" required class="form-select" id="exampleSelect1" onChange={(e) =>{ setsoil_type(e.target.value) }}>
                        <option value={i2}>{i2}</option>
                        {soiltypelist.map((val) => {
                          return (
                            <option value={val.soiltypename}>{val.soiltypename}</option>
                          )
                        })}
                    </select>
                    </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Size in Hectares</label>
                    <input name="cinput" type="number" class="form-control" placeholder={i3} defaultValue={i3} id="inputDefault" onChange={(e) =>{setsize(e.target.value)}} required />
                </div>
                <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
                </form>
            </main>

        </div>
    )
}

export default Farmprofilesareasedit;