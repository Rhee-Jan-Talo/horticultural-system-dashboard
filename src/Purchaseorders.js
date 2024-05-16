import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';


function Purchaseorders() {
  const navigate = useNavigate()
  const handleProceedHome = (e) => {
    navigate(generatePath("/home"));
    window.location.reload();
  };
  return (
    <div className='App'>
        <div class="headform">
        <h1 class="titleheadform">Purchase Orders</h1>
        <main class="container-fluid">
        <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceedHome}>Back</button>
      <p>
      <Link to="/purchaseorderlist"><button type="button" class="btn btn-outline-info secondarybutton">New Purchase Order</button></Link>
      <Link to="/purchaseorderlistinfo"><button type="button" class="btn btn-outline-info secondarybutton">Purchase Order Cart</button></Link>
      <Link to="/purchaseorderconfirmedlist"><button type="button" class="btn btn-outline-info secondarybutton">Purchase Order List</button></Link>
      <Link to="/purchaseorderhistory"><button type="button" class="btn btn-outline-info secondarybutton">Stock In Paid Purchase Orders</button></Link>
      </p>

        </main>
      </div>
      </div>
  );
}
export default Purchaseorders;
