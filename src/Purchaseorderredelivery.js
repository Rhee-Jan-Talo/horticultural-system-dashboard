import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, useParams, generatePath } from 'react-router-dom';
import Axios from 'axios';
import DatePicker from "react-datepicker";


function Purchaseorderrelivery() {
    const navigate = useNavigate();
    const { final_po_id } = useParams()
    const { po_id } = useParams()
    const { supply_id } = useParams()
    const x = final_po_id
    const y = po_id
    const z = supply_id
    const [poinfo, setpoinfo] = useState([]);
    useEffect(() =>{
        Axios.get(`http://localhost:3001/purchaseorderinfo/${y}`).then((response) => {
            setpoinfo(response.data);
        })
      }, [y])
    const ea = poinfo[0]
    var i1, i2, rdid
    for (var key in ea) {
        if (ea.hasOwnProperty(key)) {
            if (key === "redelivery"){
              i1 = ea[key]
            }
        }
      }
    const [redinfo, setredinfo] = useState([]);
    useEffect(() =>{
        Axios.get(`http://localhost:3001/redeliveryinfo/${y}/${z}`).then((response) => {
            setredinfo(response.data);
        })
    }, [y,z])
    const ia = redinfo[0]
    for (var key in ia) {
        if (ia.hasOwnProperty(key)) {
            if (key === "po_redelivery_id"){
                rdid = ia[key]
              }
            if (key === "prev_status"){
              i2 = ia[key]
            }
        }
      }
    console.log("y: ", y)
    const [remarks, setremarks] = useState("")
    const [exp_date, setexp_date] = useState({start: ""})
    const handleProceedBack = (e) => {
        navigate(generatePath("/purchaseorderstockin/:x", { x }));
      };
    const register = () => {
        if (i1 != "true"){
            var a = document.forms["myform"]["ainput"].value;
            if (a == "" ) {
            alert("Field must be filled out");
            }
            else {
                Axios.post("http://localhost:3001/inputredelivery", {supply_id: z, po_id: y, remarks: a, prev_status: i1});
                navigate(generatePath("/purchaseorderstockin/:x", { x }));
                window.location.reload();
                alert("Redelivery Registered")
            }
        }
        else {
            var c = document.forms["myform"]["ccinput"].value;
            if (c == "" ) {
            alert("Field must be filled out");
            }
            else {
                Axios.put("http://localhost:3001/updateredelivery", {po_id: y, redelivery_id: rdid, date_delivered: c, prev_status: i2});
                navigate(generatePath("/purchaseorderstockin/:x", { x }));
                window.location.reload();
                alert("Redelivery Updated")
            }
        }
      }
    return(
        <div className="App">
            <div class="headform">
            <h1 class="titleheadform">Input Data for Redelivery for Purchase Order {y} of Supply {z}</h1>
            </div>
            <main class="container-fluid">
            <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceedBack}>Back</button>
                {poinfo.map((val)=> {
                    if (i1 != "true") {
                        return (
                            <form class="formdiv" name="myform" required>
                        <div class="form-group">
                            <label class="col-form-label mt-4" for="inputDefault">Remarks</label>
                            <input name="ainput" type="text" class="form-control" placeholder="Remarks" id="inputDefault"   onChange={(e) =>{setremarks(e.target.value)}} required/>
                        </div>
                        <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
                        </form>
                        )
                    }
                    else {
                        return (
                            <form class="formdiv" name="myform" required>
                        <div class="form-group">
                        <label class="col-form-label mt-4" for="inputDefault">Date Delivered:</label>
                            <DatePicker name="ccinput" placeholderText='Date Delivered' style={{marginRight:"10px"}} selected={exp_date.start} onChange={(start) =>{setexp_date({...exp_date, start})}} />
                        </div>
                        <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
                        </form>
                        )
                    }
                })}
            </main>

        </div>
    )
}

export default Purchaseorderrelivery;