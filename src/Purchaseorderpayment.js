import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, useParams, generatePath } from 'react-router-dom';
import Axios from 'axios';
import DatePicker from "react-datepicker";


function Purchaseorderpayment() {
    const navigate = useNavigate();
    const { final_po_id } = useParams();
    const x = final_po_id
    const [polist, setpolist] = useState([]);
    var i1, i2, i3, i4
    useEffect(() =>{
      Axios.get(`http://localhost:3001/purchaseorderconfirmedinfo/${x}`).then((response) => {
        setpolist(response.data);
      })
    }, [x])
    const [pmlist, setpmlist] = useState([]);
    useEffect(() =>{
      Axios.get('http://localhost:3001/plantutilitiespaymentmethod').then((response) => {
          setpmlist(response.data);
      })
    }, [])
    const ea = polist[0]
    for (var key in ea) {
        if (ea.hasOwnProperty(key)) {
            if (key === "po_id_list"){
              i1 = ea[key]
            }
            if (key === "total_amount"){
                i2 = ea[key]
            }
            if (key === "date_confirmed"){
                i3 = ea[key]
            }
            if (key === "total_paid"){
                i4 = ea[key]
            }
        }
      }
    const [due_date, setdue_date] = useState({start: ""})
    const [dp_percentage, setdp_percentage] = useState("")
    const [dp_amount, setdp_amount] = useState("")
    const [payment_method, setpayment_method] = useState("")
    const [account_id, setaccount_id] = useState("")
    const [account_name, setaccount_name] = useState("")
    const [selectinput, setselectinput] = useState("")
    var newdp_percentage, newdp_amount
    var today = new Date();
    console.log("am: ",dp_amount)
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
      });
    let amount1 = i2 - i4
    let amount2 = formatter.format(amount1)
    const register = () => {
        if (selectinput == "Percentage"){
            var a = document.forms["myform"]["aainput"].value;
            var b = document.forms["myform"]["binput"].value;
            var d = document.forms["myform"]["dinput"].value;
            var e = document.forms["myform"]["einput"].value;
            var f = document.forms["myform"]["finput"].value;
            if (a == "" ||b == ""||d == "" || e == "" || f == "") {
                alert("Required fields must be filled out");
            }
            else if (b > 100 || b <= 0) {
                alert("Invalid input. Payment percentage must not be greater than 100% or less than or equal to 0%.")
            }
            else if (dp_amount != "") {
                alert("Payment percentage and amount are not equal. Please clear the other fields before inputting the selected payment input.")
            }
            else {
                newdp_amount = i2*(dp_percentage*0.01)
                Axios.post("http://localhost:3001/purchaseorderpayment", {final_po_id: x, due_date: due_date.start, dp_percentage: dp_percentage, dp_amount: newdp_amount, payment_method: payment_method, account_id: account_id, account_name: account_name, date_paid: today});
                x && navigate(generatePath("/purchaseorderconfirmedinfo/:x", { x }));
                alert("Payment Recorded")
            }
        }
        else if (selectinput == "Amount"){
            var a = document.forms["myform"]["aainput"].value;
            var c = document.forms["myform"]["cinput"].value;
            var d = document.forms["myform"]["dinput"].value;
            var e = document.forms["myform"]["einput"].value;
            var f = document.forms["myform"]["finput"].value;
            if (a == "" ||c == ""||d == "" || e == "" || f == "") {
                alert("Required fields must be filled out");
            }
            else if (c > i2 || c <= 0) {
                alert("Invalid input. Payment amount must not be greater than the total amount or less than or equal to 0.")
            }
            else if (dp_percentage != "") {
                alert("Payment amount and percentage are not equal. Please clear the other fields before inputting the selected payment input.")
            }
            else {
                newdp_percentage = (dp_amount/i2) * 100
                newdp_amount = dp_amount
                newdp_amount = parseInt(newdp_amount)
                Axios.post("http://localhost:3001/purchaseorderpayment", {final_po_id: x, due_date: due_date.start, dp_percentage: newdp_percentage, dp_amount: newdp_amount, payment_method: payment_method, account_id: account_id, account_name: account_name, date_paid: today});
                x && navigate(generatePath("/purchaseorderconfirmedinfo/:x", { x }));
                window.location.reload();
                alert("Payment Recorded")
            }
        }
        else {
            alert("Select Payment Input")
        }
      }
      const handleProceed = (e) => {
        x && navigate(generatePath("/purchaseorderconfirmedinfo/:x", { x }));
      };
    return(
        <div className="App">
            <div class="headform">
            <h1 class="titleheadform">Payment for Confirmed Purchase Order No. {x}</h1>
            </div>
            <main class="container-fluid">
            <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
            <h5><strong>Total Amount</strong>: {formatter.format(i2)}</h5>
            <h5><strong>Paid Amount</strong>: {formatter.format(i4)}</h5>
            <h5><strong>Balance Amount</strong>: {amount2}</h5>
                <form class="formdiv" name="myform" required>
                    <div class="form-group">
                        <label class="col-form-label mt-4" for="inputDefault">Due Date:</label>
                        <DatePicker name="aainput" placeholderText='Due Date' style={{marginRight:"10px"}} selected={due_date.start} onChange={(start) =>{setdue_date({...due_date, start})}} />
                    </div>
                    <fieldset class="form-group" onChange={(e) =>{setselectinput(e.target.value)}} required>
                        <legend class="mt-4">Select Payment Input</legend>
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios1" value="Percentage"/>
                        <label class="form-check-label" for="optionsRadios1">
                        Payment Percentage
                        </label>
                        </div>
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios2" value="Amount"/>
                        <label class="form-check-label" for="optionsRadios2">
                        Payment Amount 
                        </label>
                        </div>
                    </fieldset>
                    {polist.map((val)=> {
                        if(selectinput == "Percentage"){
                            return (
                                <div>
                                    <div class="form-group">
                                    <label class="col-form-label mt-4" for="inputDefault">Down Payment Percentage</label>
                                    <input name="binput" type="number" class="form-control" placeholder="Down Payment %" id="inputDefault" onChange={(e) =>{setdp_percentage(e.target.value)}} required />
                                </div>
                                <div class="form-group">
                                    <label class="col-form-label mt-4" for="inputDefault">Down Payment Amount <em>(automatically adjusts depending on the inputted payment %.clear field first if you want to change payment input to see real time values.)</em></label>
                                    <input name="cinput" type="number" class="form-control" placeholder={i2*(dp_percentage*0.01)} id="inputDefault" onChange={(e) =>{setdp_amount(e.target.value)}} required />
                                </div>
                                </div>
                            )
                        }
                        else if(selectinput == "Amount") {
                            return (
                                <div>
                                    <div class="form-group">
                                    <label class="col-form-label mt-4" for="inputDefault">Down Payment Percentage <em>(automatically adjusts depending on the inputted payment amount.clear field first if you want to change payment input to see real time values.)</em></label>
                                    <input name="binput" type="number" class="form-control" placeholder={(dp_amount/i2) * 100} id="inputDefault" onChange={(e) =>{setdp_percentage(e.target.value)}} required />
                                </div>
                                <div class="form-group">
                                    <label class="col-form-label mt-4" for="inputDefault">Down Payment Amount</label>
                                    <input name="cinput" type="number" class="form-control" placeholder="Down Payment Amount" id="inputDefault" onChange={(e) =>{setdp_amount(e.target.value)}} required />
                                </div>
                                </div>
                            )
                        }
                    })}
                    <div class="form-group">
                    <label for="exampleSelect1" class="col-form-label mt-4">Payment Method: Bank Name/Digital Wallet Name <em>(you can add new payment method in utilities)</em></label>
                    <select  name="dinput" required class="form-select" id="exampleSelect1" onChange={(e) =>{
          setpayment_method(e.target.value)
        }}>
                        <option value="">Select Payment Method</option>
                        {pmlist.map((val) => {
                          return (
                            <option value={val.paymentmethod_name}>{val.paymentmethod_name}</option>
                          )
                        })}
                    </select>
                    </div>
                    <div class="form-group">
                        <label class="col-form-label mt-4" for="inputDefault">Account ID <em>(input none if paid with cash)</em></label>
                        <input name="einput" type="text" class="form-control" placeholder="Account ID" id="inputDefault" onChange={(e) =>{setaccount_id(e.target.value)}} required />
                    </div>
                    <div class="form-group">
                        <label class="col-form-label mt-4" for="inputDefault">Account Name <em>(input none if paid with cash)</em></label>
                        <input name="finput" type="text" class="form-control" placeholder="Account Name" id="inputDefault" onChange={(e) =>{setaccount_name(e.target.value)}} required />
                    </div>
                <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
                </form>
            </main>

        </div>
    )
}

export default Purchaseorderpayment;