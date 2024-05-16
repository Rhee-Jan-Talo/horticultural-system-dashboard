import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath, useParams } from 'react-router-dom';
import Axios from 'axios';

function Purchaseorderconfirmedinfo() {
    const { final_po_id } = useParams();
    const x = final_po_id
    const navigate = useNavigate();
    const [polist, setpolist] = useState([]);
    const [purorderlist, setpurorderlist] = useState([]);
    var i1, i2, i3, i4, i5
    useEffect(() =>{
      Axios.get(`http://localhost:3001/purchaseorderconfirmedinfo/${x}`).then((response) => {
        setpolist(response.data);
        setLoading(false);
      })
    }, [x])
    const [paymentlist, setpaymentlist] = useState([]);
    useEffect(() =>{
      Axios.get(`http://localhost:3001/purchaseorderpaymentinfo/${x}`).then((response) => {
        setpaymentlist(response.data);
        setLoading(false);
      })
    }, [x])
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
            if (key === "company_name"){
              i5 = ea[key]
          }
        }
      }
    const [isLoading, setLoading] = useState(true);
    useEffect(() =>{
        Axios.get(`http://localhost:3001/purchaseorderlistinfoconfirmed/${i1}`).then((response) => {
            setpurorderlist(response.data);
            setLoading(false);
        })
    }, [i1])
    console.log("pur:",purorderlist)
    const handleProceed = (e) => {
        x && navigate(generatePath("/purchaseorderpayment/:x", { x }));
      };
    var today = new Date();
    const handlePaid = (e) => {
      Axios.put("http://localhost:3001/purchaseorderpaid", {final_po_id: x, date_paid: today});
      navigate('/purchaseorderhistory', { replace: true });
      window.location.reload();
      alert("Purchase Order Fully Paid")
    };
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
    });
    let amount1 = i2 - i4
    let amount2 = formatter.format(amount1)
    var cdate = (new Date(i3)).toLocaleDateString();
    if (isLoading) {
      return <div className="App">Loading...</div>;
    }
    return (
      <div className='App'>
          <div class="headform">
          <h1 class="titleheadform">Active Purchase Order No. {x} to {i5}</h1>
        </div>
        <main class="container-fluid">
        <Link to="/purchaseorderconfirmedlist"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
        {polist.map((val)=> {
          if(i4 >= i2){
            return (
              <button type="button" class="btn btn-outline-info secondarybutton" onClick={handlePaid}>Confirm for Stock In</button>
            )
          }
          else if(i4 < i2){
            return (
              <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceed}>Add Payment</button>
            )
          }
        })}
            <h5><strong>Total Amount</strong>: {formatter.format(i2)}</h5>
            <h5><strong>Paid Amount</strong>: {formatter.format(i4)}</h5>
            <h5><strong>Balance Amount</strong>: {amount2}</h5>
            <h5><strong>Date Confirmed</strong>: {cdate}</h5>
            <br></br>
            <div class="tablediv">
                <h4>Items List</h4>
                    <table class="table table-hover">
                    <thead>
                        <tr>
                          <th scope="col">PO ID</th>
                          <th scope="col">Item</th>
                          <th scope="col">Category</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Units</th>
                          <th scope="col">Price per Unit</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      {purorderlist.map((val)=> {
                        return (
                            <tbody>
                            <tr class="table-active">
                              <th scope="row">{val.po_id}</th>
                              <th scope="row">{val.supply_name}</th>
                              <th scope="row">{val.category}</th>
                              <th scope="row">{val.po_quantity}</th>
                              <th scope="row">{val.units}</th>
                              <th scope="row">{formatter.format(val.price_per_unit)}</th>
                              <th scope="row">{formatter.format(val.total_payment)}</th>
                              </tr>
                              </tbody>
                          )
                      })}
                </table>
                <br></br>
              </div>
              <div class="tablediv">
                <h4>Payments Made</h4>
                    <table class="table table-hover">
                    <thead>
                        <tr>
                          <th scope="col">Payment ID</th>
                          <th scope="col">Due Date</th>
                          <th scope="col">Payment Percentage</th>
                          <th scope="col">Payment Amount</th>
                          <th scope="col">Payment Method</th>
                          <th scope="col">Account ID</th>
                          <th scope="col">Account Name</th>
                          <th scope="col">Date Paid</th>
                        </tr>
                      </thead>
                      {paymentlist.map((val)=> {
                        var cdate1 = (new Date(val.due_date)).toLocaleDateString();
                        var cdate2 = (new Date(val.date_paid)).toLocaleDateString();
                        if (cdate1 > cdate2){
                          return (
                            <tbody>
                            <tr class="table-active">
                              <th scope="row">{val.payment_po_id}</th>
                              <th scope="row">{cdate1}</th>
                              <th scope="row">{val.dp_percentage} %</th>
                              <th scope="row">{formatter.format(val.dp_amount)}</th>
                              <th scope="row">{val.payment_method}</th>
                              <th scope="row">{val.account_id}</th>
                              <th scope="row">{val.account_name}</th>
                              <th scope="row">{cdate2}</th>
                              </tr>
                              </tbody>
                          )
                        }
                        else {
                          return (
                            <tbody>
                            <tr class="table-danger">
                              <th scope="row">{val.payment_po_id}</th>
                              <th scope="row">{cdate1}</th>
                              <th scope="row">{val.dp_percentage} %</th>
                              <th scope="row">{formatter.format(val.dp_amount)}</th>
                              <th scope="row">{val.payment_method}</th>
                              <th scope="row">{val.account_id}</th>
                              <th scope="row">{val.account_name}</th>
                              <th scope="row">{cdate2}</th>
                              </tr>
                              </tbody>
                          )
                        }
                      })}
                </table>
                <br></br>
              </div>
          </main>
        </div>
    );
  }

export default Purchaseorderconfirmedinfo;


