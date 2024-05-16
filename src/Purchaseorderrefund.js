import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, useParams, generatePath } from 'react-router-dom';
import Axios from 'axios';
import DatePicker from "react-datepicker";
import { parse } from "date-fns";


function Purchaseorderrefund() {
    const navigate = useNavigate();
    const { final_po_id } = useParams()
    const { po_id } = useParams()
    const { supply_id } = useParams()
    const x = final_po_id
    const y = po_id
    const z = supply_id
    const [amount, setamount] = useState("")
    const [ref_date, setref_date] = useState({start: ""})
    const [remarks, setremarks] = useState("")
    const [payment_method, setpayment_method] = useState("")
    const [account_id, setaccount_id] = useState("")
    const [account_name, setaccount_name] = useState("")
    const [poinfo, setpoinfo] = useState([]);
    useEffect(() =>{
        Axios.get(`http://localhost:3001/purchaseorderinfo/${y}`).then((response) => {
            setpoinfo(response.data);
        })
      }, [y])
    const [pmlist, setpmlist] = useState([]);
    useEffect(() =>{
      Axios.get('http://localhost:3001/plantutilitiespaymentmethod').then((response) => {
          setpmlist(response.data);
      })
    }, [])
    const ea = poinfo[0]
    var i1, i2, i3, expected_amount
    for (var key in ea) {
        if (ea.hasOwnProperty(key)) {
            if (key === "po_quantity"){
              i1 = ea[key]
            }
            if (key === "price_per_unit"){
              i2 = ea[key]
            }
            if (key === "stocked_in_quantity"){
              i3 = ea[key]
              if (i3 == null){
                i3 = 0
              }
            }
        }
      }
    i1 = parseFloat(i1)
    i2 = parseFloat(i2)
    i3 = parseFloat(i3)
    expected_amount = (i1 - i3) * i2
    expected_amount = parseFloat(expected_amount)
    console.log(i1, i2, i3)
    const [iteminfo, setiteminfo] = useState([]);
    useEffect(() =>{
        Axios.get(`http://localhost:3001/iteminventoryinfo/${z}`).then((response) => {
            setiteminfo(response.data);
        })
      }, [z])
    var j1
    const ia = iteminfo[0]
    for (var key in ia) {
      if (ia.hasOwnProperty(key)) {
          if (key === "supply_name"){
            j1 = ia[key]
          }
      }
    }
    const handleProceedBack = (e) => {
        navigate(generatePath("/purchaseorderstockin/:x", { x }));
      };
    const register = () => {
        var a = document.forms["myform"]["ainput"].value;
        var b = document.forms["myform"]["binput"].value;
        var c = document.forms["myform"]["ccinput"].value;
        var d = document.forms["myform"]["dinput"].value;
        var e = document.forms["myform"]["einput"].value;
        var f = document.forms["myform"]["finput"].value;
        if (a == "" || b == "" || c == "" || d == "" || e == "" || f == "") {
            alert("All fields must be filled out");
        }
        else{
            Axios.post("http://localhost:3001/inputrefund", {supply_id: z, po_id: y, amount: a, remarks: b, date: c, payment_method: d, account_id: e, account_name: f});
            navigate(generatePath("/purchaseorderstockin/:x", { x }));
            window.location.reload();
            alert("Refund Registered")
        }
      }
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
      });
    return(
        <div className="App">
            <div class="headform">
            <h1 class="titleheadform">Input Refund for Purchase Order {y} of Supply {j1}</h1>
            <h4><strong>Amount Expected from Stocks Left Multiplied by Price: </strong>{formatter.format(expected_amount)}</h4>
            </div>
            <main class="container-fluid">
            <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceedBack}>Back</button>
            <form class="formdiv" name="myform" required>
            <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Refunded Amount in Php</label>
                    <input name="ainput" type="number" class="form-control" placeholder="Amount in Php" id="inputDefault" onChange={(e) =>{setamount(e.target.value)}} required />
                </div>
                <div class="form-group">
                        <label class="col-form-label mt-4" for="inputDefault">Date Refunded:</label>
                            <DatePicker name="ccinput" placeholderText='Date Refunded' style={{marginRight:"10px"}} selected={ref_date.start} onChange={(start) =>{setref_date({...ref_date, start})}} />
                        </div>
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
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Remarks</label>
                    <input name="binput" type="text" class="form-control" placeholder="Remarks" id="inputDefault" onChange={(e) =>{setremarks(e.target.value)}} required />
                </div>
                <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
            </form>
            </main>

        </div>
    )
}

export default Purchaseorderrefund;