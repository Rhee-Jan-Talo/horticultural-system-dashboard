import React, {useEffect, useState} from 'react';
import './App.css';
import { Link, useNavigate, generatePath, Navigate } from 'react-router-dom';
import Axios from 'axios';

function Home() {
  Axios.put("http://localhost:3001/expireditems", {})
  const navigate = useNavigate();
  const [userinfo, setuserinfo] = useState("");
  const [isLoading, setLoading] = useState(true);
  Axios.get(`http://localhost:3001/`).then((response) => {
        setuserinfo(response.data);
        setLoading(false);
      })
  console.log("user:",userinfo)
  const handleLogout = (e) => {
    Axios.post("http://localhost:3001/logout", {})
    alert("Logged out")
    navigate(generatePath("/", { replace: true }));
    window.location.reload()
  }
  if (isLoading) {
    return (<div className="App">Loading...</div>)
  }
  return (
    <div className="App">
      <div class="headform">
      <h1 class="titleheadform">Hello, {userinfo}</h1>
    </div>
    <main class="container-fluid">
    <button type="button" class="btn btn-outline-dark backbutton" onClick={handleLogout}>Log Out</button>
      <div class="row">
      <Link class="mainbutton" to='/farmprofiles'>Farm Profiles</Link>
      <Link class="mainbutton" to='/employeelist'>Employees</Link>
      <Link class="mainbutton" to='/plantutilities'>Plant Utilities</Link>
      <Link class="mainbutton" to='/plantprofiles'>Plant Profiles</Link>
      <Link class="mainbutton" to='/harvestcalendarlist'>Harvest Calendars</Link>
      <Link class="mainbutton" to='/harvestinventory'>Harvest Inventory</Link>
      <Link class="mainbutton" to='/availableplants'>Available and Wasted Plants</Link>
      <Link class="mainbutton" to='/iteminventory'>Item Inventory</Link>
      <Link class="mainbutton" to='/purchaseorders'>Purchase Orders</Link>
      <Link class="mainbutton" to='/otherexpenseslist'>Other Expenses</Link>
      <Link class="mainbutton" to='/allexpensespo'>All Expenses</Link>
      <Link class="mainbutton" to='/employeeaccounts'>Employee Accounts</Link>
        </div>
      </main>
    </div>
  );
}

export default Home;
