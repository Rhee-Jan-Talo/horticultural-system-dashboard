import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';


function Purchaseorderedit() {
    const { po_id } = useParams();
    const x = po_id
    console.log(x)
    const navigate = useNavigate()
    const [poinfo, setpoinfo] = useState([]);
    useEffect(() =>{
        Axios.get(`http://localhost:3001/purchaseorderinfo/${x}`).then((response) => {
            setpoinfo(response.data);
        })
    }, [x])
    const [status, setstatus] = useState("")
    const [quantity, setquantity] = useState("")
    const [units, setunits] = useState("")
    const [price_per_unit, setprice_per_unit] = useState("")
    var total_payment
    const ea = poinfo[0]
    var i1, i2, i3, i4
    for (var key in ea) {
        if (ea.hasOwnProperty(key)) {
            if (key === "po_quantity"){
              i1 = ea[key]
            }
            if (key === "units"){
              i2 = ea[key]
            }
            if (key === "price_per_unit"){
              i3 = ea[key]
            }
            if (key === "status"){
              i4 = ea[key]
            }
        }
      }
      useEffect(() =>{
        setquantity(i1)
        setunits(i2)
        setprice_per_unit(i3)
        setstatus(i4)
      }, [i1])
    const register = () => {
        var a = document.forms["myform"]["ainput"].value;
        var b = document.forms["myform"]["binput"].value;
        var c = document.forms["myform"]["cinput"].value;
        var d = document.forms["myform"]["dinput"].value;
        if (a == "" ||b == "" || c == "" ||d == "") {
          alert("Required fields must be filled out");
        }
        else {
            total_payment = quantity*price_per_unit
            Axios.put("http://localhost:3001/purchaseorderupdate", {quantity: quantity, units: units, price_per_unit: price_per_unit, total_payment: total_payment, status: status, po_id: x});
            navigate('/purchaseorderlistinfo', { replace: true });
            window.location.reload();
            alert("PO updated");
        }
      }
    return(
        <div className="App">
            {poinfo.map((val)=>{
                return(
                    <div>
            <div class="headform">
            <h1 class="titleheadform">Edit PO {val.po_id} Status</h1>
            </div>
            <main class="container-fluid">
            <Link to="/purchaseorderlistinfo"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
                <form class="formdiv" name="myform" required>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Quantity</label>
                    <input name="binput" type="number" class="form-control" placeholder={val.po_quantity} defaultValue={val.po_quantity} id="inputDefault" onChange={(e) =>{setquantity(e.target.value)}} required/>
                </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Units of Measurement: </label>
                    <h5>{i2}</h5>
                </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Price per Unit in Peso</label>
                    <input name="dinput" type="number" class="form-control" placeholder={val.price_per_unit} defaultValue={val.price_per_unit} id="inputDefault" onChange={(e) =>{setprice_per_unit(e.target.value)}} required/>
                </div>
                    <fieldset name="ainput" class="form-group" onChange={(e) =>{setstatus(e.target.value)}} required>
                        <legend class="mt-4">Status</legend>
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios1" value="Pending" defaultChecked={val.status === "Pending"}/>
                        <label class="form-check-label" for="optionsRadios1">
                        Pending
                        </label>
                        </div>
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios2" value="Inactive" defaultChecked={val.status === "Inactive"}/>
                        <label class="form-check-label" for="optionsRadios2">
                            Inactive 
                        </label>
                        </div>
                    </fieldset>
                <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
                </form>
            </main>

                     </div>   
                )
            })}
        </div>
    )
}

export default Purchaseorderedit;