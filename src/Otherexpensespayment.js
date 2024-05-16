import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import DatePicker from "react-datepicker";


function Otherexpensespayment() {
    const navigate = useNavigate();
    const { other_expenses_id } = useParams()
    const x = other_expenses_id
    const [emp_id , setemp_id ] = useState("")
    const [paid_to , setpaid_to ] = useState("");
    const [date_paid , setdate_paid ] = useState({start: ""});
    const [payment_method , setpayment_method ] = useState("");
    const [total_payment , settotal_payment]  = useState("");
    const [account_id , setaccount_id] = useState("");
    const [account_name  , setaccount_name ] = useState("");
    const status = "Paid"
    const [otherexpensesinfo, setotherexpensesinfo] = useState([]);
    useEffect(() =>{
        Axios.get(`http://localhost:3001/otherexpensesinfo/${x}`).then((response) => {
            setotherexpensesinfo(response.data);
        })
    }, [x])
    const [employeelist, setemployeelist] = useState([]);
    useEffect(() =>{
        Axios.get('http://localhost:3001/employeelist').then((response) => {
          setemployeelist(response.data);
        })
      }, [])
    const [pmlist, setpmlist] = useState([]);
    useEffect(() =>{
      Axios.get('http://localhost:3001/plantutilitiespaymentmethod').then((response) => {
          setpmlist(response.data);
      })
    }, [])
    const ea = otherexpensesinfo[0]
    var i1, i2, i3
    for (var key in ea) {
        if (ea.hasOwnProperty(key)) {
            if (key === "total_amount"){
              i1 = ea[key]
            }
            if (key === "due_date"){
              i2 = ea[key]
            }
            if (key === "otherexpensesname"){
              i3 = ea[key]
            }
        }
      }
    const register = () => {
        var a = document.forms["myform"]["ainput"].value;
        var b = document.forms["myform"]["binput"].value;
        var c = document.forms["myform"]["ccinput"].value;
        var d = document.forms["myform"]["dinput"].value;
        var e = document.forms["myform"]["einput"].value;
        if (a == "" ||b == "" || c == "" ||d == "" || e == "") {
          alert("Required fields must be filled out");
        }
        else if (e <= 0) {
            alert("Inputted payment should not be less than or equal to zero.")
        }
        else {
            Axios.put("http://localhost:3001/otherexpensesupdate", {other_expenses_id: x, emp_id: emp_id, paid_to: paid_to, date_paid: date_paid.start, payment_method: payment_method, total_payment: total_payment, account_id: account_id, account_name: account_name, status: status});
            alert("Paid Expense Recorded")
            navigate('/otherexpensespaid', { replace: true });
            window.location.reload();
        }
      }
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
      });
      var cdate = (new Date(i2)).toLocaleDateString();
    return(
        <div className="App">
            <div class="headform">
            <h1 class="titleheadform">Payment for Other Expense No. {x}</h1>
            </div>
            <main class="container-fluid">
            <Link to="/otherexpenseslist"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
                <h4>Expense Type: {i3}</h4>
                <h4>Due Date: {cdate}</h4>
                <h4>Amount to Pay: {formatter.format(i1)}</h4>
                <form class="formdiv" name="myform" required>
                <div class="form-group">
                    <label for="exampleSelect1" class="form-label mt-4">Select Managing Employee</label>
                    <select  name="ainput" required class="form-select" id="exampleSelect1" onChange={(e) =>{setemp_id (e.target.value)}}>
                        <option value="">Select Employee</option>
                        {employeelist.map((val) => {
                          return (
                            <option value={val.emp_id}>{val.emp_id} {val.emp_name}</option>
                          )
                        })}
                    </select>
                    </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Paid to</label>
                    <input name="binput" type="text" class="form-control" placeholder="Paid to" id="inputDefault" onChange={(e) =>{setpaid_to (e.target.value)}} required/>
                </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Date Paid: </label>
                        <DatePicker name="ccinput" placeholderText='Date Paid' style={{marginRight:"10px"}} selected={date_paid.start} onChange={(start) =>{setdate_paid({...date_paid, start})}} />
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
                    <label class="col-form-label mt-4" for="inputDefault">Paid Amount</label>
                    <input name="einput" type="number" class="form-control" placeholder="Paid Amount" id="inputDefault" onChange={(e) =>{settotal_payment (e.target.value)}} required/>
                </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Account ID <em>(input none if paid with cash)</em></label>
                    <input type="text" class="form-control" placeholder="Account ID" id="inputDefault" onChange={(e) =>{setaccount_id (e.target.value)}} required/>
                </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Account Name <em>(input none if paid with cash)</em></label>
                    <input type="text" class="form-control" placeholder="Account Name" id="inputDefault" onChange={(e) =>{setaccount_name  (e.target.value)}} required/>
                </div>
                <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
                </form>
            </main>

        </div>
    )
}

export default Otherexpensespayment;