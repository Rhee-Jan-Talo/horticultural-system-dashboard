import React, {useEffect, useState} from 'react';
import './App.css';
import { Link, Navigate, useNavigate, generatePath  } from 'react-router-dom';
import Axios from 'axios';

function Nav() {
  const [userinfo, setuserinfo] = useState(0);
  const navigate = useNavigate
  useEffect(() =>{
    async function fetchData(){
      await Axios.get(`http://localhost:3001/`).then((response) => {
        setuserinfo(response.data);
      })
      }
  fetchData()
  }, [])
  console.log(userinfo)
  const handleHome = () =>{
    navigate('/home', { replace: true });
      window.location.reload();
  }
  if (userinfo.length <= 0 || userinfo == undefined){
    alert("Not logged in")
    return (<Navigate to="/" />);
  }
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse navi" id="navbarColor01">
    <ul class="navbar-nav me-auto">
    <Link class="nav-link" to='/home'><li class="nav-item">Home</li></Link>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Profiles</a>
            <div class="dropdown-menu">
            <Link class="nav-link" to='/farmprofiles'><li class="dropdown-item">Farm</li></Link> {/* nav-item for superhero*/}
            <Link class="nav-link" to='/employeelist'><li class="dropdown-item">Employees</li></Link>
            <Link class="nav-link" to='/iteminventory'><li class="dropdown-item">Items</li></Link>
            <Link class="nav-link" to='/plantprofiles'><li class="dropdown-item">Plants</li></Link>
            <Link class="nav-link" to='/supplierslist'><li class="dropdown-item">Suppliers</li></Link>
            <Link class="nav-link" to='/plantutilities'><li class="dropdown-item">Utilities</li></Link>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Harvests</a>
            <div class="dropdown-menu">
            <Link class="nav-link" to='/harvestcalendarlist'><li class="dropdown-item">Harvest Calendars</li></Link>
            <Link class="nav-link" to='/harvestinventory'><li class="dropdown-item">Harvest Inventory</li></Link>
            <Link class="nav-link" to='/availableplants'><li class="dropdown-item">Available and Wasted Plants</li></Link>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Expenses</a>
            <div class="dropdown-menu">
            <Link class="nav-link" to='/purchaseorders'><li class="dropdown-item">Purchase Orders</li></Link>
            <Link class="nav-link" to='/otherexpenseslist'><li class="dropdown-item">Other Expenses</li></Link>
            <Link class="nav-link" to='/allexpensespo'><li class="dropdown-item">All Expenses</li></Link>
            <Link class="nav-link" to='/redeliverylist'><li class="dropdown-item">Redelivery List</li></Link>
            <Link class="nav-link" to='/refundlist'><li class="dropdown-item">Refund List</li></Link>
            </div>
          </li>
        <Link class="nav-link" to='/employeeaccounts'><li class="nav-item">Employee Accounts</li></Link>
      </ul>
    </div>
  </div>
</nav>
  );
}


            
export default Nav;
