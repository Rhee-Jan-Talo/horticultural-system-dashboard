import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';


function Harvestinventoryinputvariations() {
    const { harvest_id } = useParams()
    const x = harvest_id
    const [batchlist, setbatchlist] = useState([])
    useEffect(() =>{
    Axios.get(`http://localhost:3001/harvestinventoryonsalebatchesinfo/${x}`).then((response) => {
        setbatchlist(response.data);
    })
    }, [x])
    const ea = batchlist[0]
    var batch_id
    for (var key in ea) {
        if (ea.hasOwnProperty(key)) {
            if (key === "batch_id"){
                batch_id = ea[key]
            }
          }
      }
    const [unitlist, setunitlist] = useState([]);
    useEffect(() =>{
        Axios.get('http://localhost:3001/plantutilitiesunitsofmeasurement').then((response) => {
          setunitlist(response.data);
        })
      }, [])
    const navigate = useNavigate()
    const a_grade = "A"
    const [a_quantity_harvested, seta_quantity_harvested] = useState("")
    const [a_units, seta_units] = useState("")
    const [a_price_per_unit, seta_price_per_unit] = useState("")
    const b_grade = "B"
    const [b_quantity_harvested, setb_quantity_harvested] = useState("")
    const [b_units, setb_units] = useState("")
    const [b_price_per_unit, setb_price_per_unit] = useState("")
    const c_grade = "C"
    const [c_quantity_harvested, setc_quantity_harvested] = useState("")
    const [c_units, setc_units] = useState("")
    const [c_price_per_unit, setc_price_per_unit] = useState("")
    const d_grade = "D"
    const [d_quantity_harvested, setd_quantity_harvested] = useState("")
    const [d_units, setd_units] = useState("")
    const [d_price_per_unit, setd_price_per_unit] = useState("")
    const batch_status = "On Sale"
    const register = () => {
        if (a_quantity_harvested != ""){
            if (a_quantity_harvested < 0 || a_quantity_harvested === 0){
                alert("Invalid input for Grade A Quantity Harvest. Negative and zero values are not accepted.");
            }
        }
        else if (b_quantity_harvested != ""){
            if (b_quantity_harvested < 0 || b_quantity_harvested === 0){
                alert("Invalid input for Grade A Quantity Harvest. Negative and zero values are not accepted.");
            }
        }
        else if (c_quantity_harvested != ""){
            if (c_quantity_harvested < 0 || c_quantity_harvested === 0){
                alert("Invalid input for Grade A Quantity Harvest. Negative and zero values are not accepted.");
            }
        }
        else if (d_quantity_harvested != ""){
            if (d_quantity_harvested < 0 || d_quantity_harvested === 0){
                alert("Invalid input for Grade A Quantity Harvest. Negative and zero values are not accepted.");
            }
        }
        if (a_quantity_harvested != ""){
            if (a_units == "" || a_price_per_unit == ""){
                alert("Complete data for Grade A or remove the inputted data in the field if there's no quantity for Grade A.")
            }
        }
        else if (a_units != ""){
            if (a_quantity_harvested == "" || a_price_per_unit == ""){
                alert("Complete data for Grade A or remove the inputted data in the field if there's no quantity for Grade A.")
            }
        }
        else if (a_price_per_unit != ""){
            if (a_units == "" || a_quantity_harvested == ""){
                alert("Complete data for Grade A or remove the inputted data in the field if there's no quantity for Grade A.")
            }
        }
        //bb
        if (b_quantity_harvested != ""){
            if (b_units == "" || b_price_per_unit == ""){
                alert("Complete data for Grade B or remove the inputted data in the field if there's no quantity for Grade B.")
            }
        }
        else if (b_units != ""){
            if (b_quantity_harvested == "" || b_price_per_unit == ""){
                alert("Complete data for Grade B or remove the inputted data in the field if there's no quantity for Grade B.")
            }
        }
        else if (b_price_per_unit != ""){
            if (b_units == "" || b_quantity_harvested == ""){
                alert("Complete data for Grade B or remove the inputted data in the field if there's no quantity for Grade B.")
            }
        }
        //cc
        if (c_quantity_harvested != ""){
            if (c_units == "" || c_price_per_unit == ""){
                alert("Complete data for Grade C or remove the inputted data in the field if there's no quantity for Grade C.")
            }
        }
        else if (c_units != ""){
            if (c_quantity_harvested == "" || c_price_per_unit == ""){
                alert("Complete data for Grade C or remove the inputted data in the field if there's no quantity for Grade C.")
            }
        }
        else if (c_price_per_unit != ""){
            if (c_units == "" || c_quantity_harvested == ""){
                alert("Complete data for Grade C or remove the inputted data in the field if there's no quantity for Grade C.")
            }
        }
        //dd
        if (d_quantity_harvested != ""){
            if (d_units == "" || d_price_per_unit == ""){
                alert("Complete data for Grade D or remove the inputted data in the field if there's no quantity for Grade D.")
            }
        }
        else if (d_units != ""){
            if (d_quantity_harvested == "" || d_price_per_unit == ""){
                alert("Complete data for Grade D or remove the inputted data in the field if there's no quantity for Grade D.")
            }
        }
        else if (d_price_per_unit != ""){
            if (d_units == "" || d_quantity_harvested == ""){
                alert("Complete data for Grade D or remove the inputted data in the field if there's no quantity for Grade D.")
            }
        }
        if (a_quantity_harvested == "" && a_units == "" && a_price_per_unit == "" && b_quantity_harvested == "" && b_units == "" && b_price_per_unit == "" && c_quantity_harvested == "" && c_units == "" && c_price_per_unit == "" && d_quantity_harvested == "" && d_units == "" && d_price_per_unit == ""){
            alert("No data inputted.")
        }
        else {
            Axios.post("http://localhost:3001/harvestinputvariations", {harvest_id: harvest_id, a_grade: a_grade, a_quantity_harvested: a_quantity_harvested, a_units: a_units, a_price_per_unit: a_price_per_unit, b_grade: b_grade, b_quantity_harvested: b_quantity_harvested, b_units: b_units, b_price_per_unit: b_price_per_unit, c_grade: c_grade, c_quantity_harvested: c_quantity_harvested, c_units: c_units, c_price_per_unit: c_price_per_unit, d_grade: d_grade, d_quantity_harvested: d_quantity_harvested, d_units: d_units, d_price_per_unit: d_price_per_unit, batch_status: batch_status, batch_id: batch_id});
            navigate('/harvestcalendaronsale', { replace: true });
            window.location.reload();
            alert("Variations recorded");
        }
      }
    return(
        <div className="App">
            <div class="headform">
            <h1 class="titleheadform">Input Harvest {x}'s Variations for Sales</h1>
            </div>
            <main class="container-fluid">
            <Link to="/harvestcalendaronsale"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
                <form class="formdiv" name="myform" required>
                    <h3>Grade A Crops:</h3>
                    <div class="form-group">
                        <label class="col-form-label mt-4" for="inputDefault">Quantity Harvested</label>
                        <input type="number" class="form-control" placeholder="Quantity Harvested" id="inputDefault" onChange={(e) =>{seta_quantity_harvested(e.target.value)}} required/>
                    </div>
                    <div class="form-group">
                    <label for="exampleSelect1" class="col-form-label mt-4">Unit of measurement <em>(you can add new units of measurement in utilities)</em></label>
                    <select  required class="form-select" id="exampleSelect1" onChange={(e) =>{seta_units(e.target.value)}}>
                        <option value="">Select Unit of Measurement</option>
                        {unitlist.map((val) => {
                          return (
                            <option value={val.unit_name}>{val.unit_name}</option>
                          )
                        })}
                    </select>
                    </div>
                    <div class="form-group">
                        <label class="col-form-label mt-4" for="inputDefault">Price per Unit in Peso</label>
                        <input type="number" class="form-control" placeholder="Price per Unit in Peso" id="inputDefault" onChange={(e) =>{seta_price_per_unit(e.target.value)}} required/>
                    </div>
                    <br></br>
                    <h3>Grade B Crops:</h3>
                    <div class="form-group">
                        <label class="col-form-label mt-4" for="inputDefault">Quantity Harvested</label>
                        <input type="number" class="form-control" placeholder="Quantity Harvested" id="inputDefault" onChange={(e) =>{setb_quantity_harvested(e.target.value)}} required/>
                    </div>
                    <div class="form-group">
                    <label for="exampleSelect1" class="col-form-label mt-4">Unit of measurement <em>(you can add new units of measurement in utilities)</em></label>
                    <select  required class="form-select" id="exampleSelect1" onChange={(e) =>{setb_units(e.target.value)}}>
                        <option value="">Select Unit of Measurement</option>
                        {unitlist.map((val) => {
                          return (
                            <option value={val.unit_name}>{val.unit_name}</option>
                          )
                        })}
                    </select>
                    </div>
                    <div class="form-group">
                        <label class="col-form-label mt-4" for="inputDefault">Price per Unit in Peso</label>
                        <input type="number" class="form-control" placeholder="Price per Unit in Peso" id="inputDefault" onChange={(e) =>{setb_price_per_unit(e.target.value)}} required/>
                    </div>
                    <br></br>
                    <h3>Grade C Crops:</h3>
                    <div class="form-group">
                        <label class="col-form-label mt-4" for="inputDefault">Quantity Harvested</label>
                        <input type="number" class="form-control" placeholder="Quantity Harvested" id="inputDefault" onChange={(e) =>{setc_quantity_harvested(e.target.value)}} required/>
                    </div>
                    <div class="form-group">
                    <label for="exampleSelect1" class="col-form-label mt-4">Unit of measurement <em>(you can add new units of measurement in utilities)</em></label>
                    <select  required class="form-select" id="exampleSelect1" onChange={(e) =>{setc_units(e.target.value)}}>
                        <option value="">Select Unit of Measurement</option>
                        {unitlist.map((val) => {
                          return (
                            <option value={val.unit_name}>{val.unit_name}</option>
                          )
                        })}
                    </select>
                    </div>
                    <div class="form-group">
                        <label class="col-form-label mt-4" for="inputDefault">Price per Unit in Peso</label>
                        <input type="number" class="form-control" placeholder="Price per Unit in Peso" id="inputDefault" onChange={(e) =>{setc_price_per_unit(e.target.value)}} required/>
                    </div>
                    <br></br>
                    <h3>Grade D Crops:</h3>
                    <div class="form-group">
                        <label class="col-form-label mt-4" for="inputDefault">Quantity Harvested</label>
                        <input type="number" class="form-control" placeholder="Quantity Harvested" id="inputDefault" onChange={(e) =>{setd_quantity_harvested(e.target.value)}} required/>
                    </div>
                    <div class="form-group">
                    <label for="exampleSelect1" class="col-form-label mt-4">Unit of measurement <em>(you can add new units of measurement in utilities)</em></label>
                    <select  required class="form-select" id="exampleSelect1" onChange={(e) =>{setd_units(e.target.value)}}>
                        <option value="">Select Unit of Measurement</option>
                        {unitlist.map((val) => {
                          return (
                            <option value={val.unit_name}>{val.unit_name}</option>
                          )
                        })}
                    </select>
                    </div>
                    <div class="form-group">
                        <label class="col-form-label mt-4" for="inputDefault">Price per Unit in Peso</label>
                        <input type="number" class="form-control" placeholder="Price per Unit in Peso" id="inputDefault" onChange={(e) =>{setd_price_per_unit(e.target.value)}} required/>
                    </div>

                    <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
                </form>
            </main>

        </div>
    )
}

export default Harvestinventoryinputvariations;