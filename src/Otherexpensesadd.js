import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import DatePicker from "react-datepicker";


function Otherexpensesadd() {
    const navigate = useNavigate();
    const [otherexpensesid, setotherexpensesid] = useState("")
    const [total_amount, settotal_amount] = useState("");
    const [period_from, setperiod_from] = useState({start: ""});
    const [period_to, setperiod_to] = useState({start: ""});
    const [due_date, setdue_date] = useState({start: ""});
    const [barcode_or_receipt, setbarcode_or_receipt] = useState("");
    const status = "Pending"
    const [otherexpenseslist, setotherexpenseslist] = useState([]);
    useEffect(() =>{
        Axios.get('http://localhost:3001/plantutilitiesotherexpenses').then((response) => {
        setotherexpenseslist(response.data);
        })
    }, [])
    const register = () => {
        var a = document.forms["myform"]["ainput"].value;
        var b = document.forms["myform"]["binput"].value;
        var c = document.forms["myform"]["ccinput"].value;
        var d = document.forms["myform"]["dinput"].value;
        if (a == "" ||b == "" || c == "" ||d == "") {
          alert("Required fields must be filled out");
        }
        else {
            Axios.post("http://localhost:3001/otherexpensesadd", {otherexpensesid: otherexpensesid, total_amount: total_amount, period_from: period_from.start, period_to: period_to.start, due_date: due_date.start, status: status, barcode_or_receipt: barcode_or_receipt});
            alert("Pending Expense Recorded")
            navigate('/otherexpenseslist', { replace: true });
            window.location.reload();
            
        }
      }
    return(
        <div className="App">
            <div class="headform">
            <h1 class="titleheadform">Add New Other Expense Bill</h1>
            </div>
            <main class="container-fluid">
            <Link to="/otherexpenseslist"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
                <form class="formdiv" name="myform" required>
                <div class="form-group">
                    <label for="exampleSelect1" class="form-label mt-4">Select Expense Type</label>
                    <select  name="ainput" required class="form-select" id="exampleSelect1" onChange={(e) =>{setotherexpensesid(e.target.value)}}>
                        <option value="">Select Expense Type</option>
                        {otherexpenseslist.map((val) => {
                          return (
                            <option value={val.otherexpensesid}>{val.otherexpensesid} {val.otherexpensesname}</option>
                          )
                        })}
                    </select>
                    </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Amount to Pay</label>
                    <input name="binput" type="number" class="form-control" placeholder="Amount to Pay" id="inputDefault" onChange={(e) =>{settotal_amount(e.target.value)}} required/>
                </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Period Covered From: <em>(can be leave as blank if there is no period covered)</em></label>
                        <DatePicker placeholderText='Period Covered From' style={{marginRight:"10px"}} selected={period_from.start} onChange={(start) =>{setperiod_from({...period_from, start})}} />
                    </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Period Covered To: <em>(can be leave as blank if there is no period covered)</em></label>
                        <DatePicker placeholderText='Period Covered To' style={{marginRight:"10px"}} selected={period_to.start} onChange={(start) =>{setperiod_to({...period_to, start})}} />
                    </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Due Date: </label>
                        <DatePicker name="ccinput" placeholderText='Due Date' style={{marginRight:"10px"}} selected={due_date.start} onChange={(start) =>{setdue_date({...due_date, start})}} />
                    </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Barcode or Receipt Number</label>
                    <input name="dinput" type="text" class="form-control" placeholder="Barcode or Receipt Number" id="inputDefault" onChange={(e) =>{setbarcode_or_receipt(e.target.value)}} required/>
                </div>
                <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
                </form>
            </main>

        </div>
    )
}

export default Otherexpensesadd;