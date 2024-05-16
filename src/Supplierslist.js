import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Supplierslist() {
  const [supplierslist, setsupplierslist] = useState([]);
  useEffect(() =>{
    Axios.get('http://localhost:3001/supplierslist').then((response) => {
      setsupplierslist(response.data);
    })
  }, [])
  const [atypeinfo, setatypeinfo] = useState("");
  const [isLoading, setLoading] = useState(true);
  Axios.get(`http://localhost:3001/atype`).then((response) => {
    setatypeinfo(response.data);
        setLoading(false);
      })
  console.log("type", atypeinfo)
  const [addresslist, setaddresslist] = useState([]);
  useEffect(() =>{
    Axios.get('http://localhost:3001/addresslist').then((response) => {
      setaddresslist(response.data);
    })
  }, [])
  const [contactinfolist, setcontactinfolist] = useState([]);
  useEffect(() =>{
    Axios.get('http://localhost:3001/contactinfolist').then((response) => {
      setcontactinfolist(response.data);
    })
  }, [])
  var id = 0
  function rowSelect(event) {
    id = event;
    console.log(id)
  }
  const navigate = useNavigate();
  const handleProceed = (e) => {
    if (id == 0){
      alert("Select a row to edit.")
    }
    else {
      id && navigate(generatePath("/suppliersedit/:id", { id }));
    }
  };
  const handleProceedHome = (e) => {
    navigate(generatePath("/home"));
    window.location.reload();
  };
  const [searchinput, setsearchinput] = useState("");
  if (isLoading) {
    return (<div className="App">Loading...</div>)
  }
  if(atypeinfo == "Admin"){
    return (
      <div className='App'>
          <div class="headform">
          <h1 class="titleheadform">Suppliers List</h1>
        </div>
        <main class="container-fluid">
        <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceedHome}>Back</button>
          <Link to="/suppliersadd"><button type="button" class="btn btn-outline-info secondarybutton">Add</button></Link>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceed}>Edit</button>
          <form class="d-flex">
              <input class="form-control me-sm-2" type="text" placeholder="Search ID or Name" onChange={(e) =>{setsearchinput(e.target.value)}}/>
            </form>
          <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Company ID</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Contact Person</th>
                        <th scope="col">Contact Person Position</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Contact Email</th>
                      </tr>
                    </thead>
                    <tbody>
                            {supplierslist.filter((val)=>{
                          if(searchinput == ""){
                            return val
                          }
                          else if(val.company_name.toLowerCase().includes(searchinput.toLowerCase())){
                            return val
                          }
                          else if(val.supplier_id == searchinput){
                            return val
                          }
                        }).map((val)=> {
                              return (
                                <tr class="table-active tractive" onClick={rowSelect.bind(this, val.supplier_id)}>
                                <th scope="row">{val.supplier_id}</th>
                                <th scope="row">{val.company_name}</th>
                                {addresslist.map((valo)=> {
                                  if(val.supplier_id == valo.supplier_id){
                                    return (
                                      <td scope="row">Block {valo.block} Lot {valo.lot} {valo.street}, Brgy. {valo.barangay}, {valo.city}, {valo.province}, {valo.zipcode}</td>
                                    )
                                  }
                                })}
                                {contactinfolist.map((valo)=> {
                                  if(val.supplier_id == valo.supplier_id){
                                    return (
                                        <th scope="row">{valo.contact_person_name}</th>
                                    )
                                  }
                                })}
                                {contactinfolist.map((valo)=> {
                                  if(val.supplier_id == valo.supplier_id){
                                    return (
                                        <th scope="row">{valo.position}</th>
                                    )
                                  }
                                })}
                                {contactinfolist.map((valo)=> {
                                  if(val.supplier_id == valo.supplier_id){
                                    return (
                                        <th scope="row">{valo.contact_num}</th>
                                    )
                                  }
                                })}
                                {contactinfolist.map((valo)=> {
                                  if(val.supplier_id == valo.supplier_id){
                                    return (
                                        <th scope="row">{valo.contact_email}</th>
                                    )
                                  }
                                })}
                                </tr>
                              )
                            })}
                    </tbody>
              </table>
              </div>
          </main>
        </div>
    );
  }
  else {
    return (
      <div className='App'>
          <div class="headform">
          <h1 class="titleheadform">Suppliers List</h1>
        </div>
        <main class="container-fluid">
        <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceedHome}>Back</button>
          <form class="d-flex">
              <input class="form-control me-sm-2" type="text" placeholder="Search ID or Name" onChange={(e) =>{setsearchinput(e.target.value)}}/>
            </form>
          <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Company ID</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Contact Person</th>
                        <th scope="col">Contact Person Position</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Contact Email</th>
                      </tr>
                    </thead>
                    <tbody>
                            {supplierslist.filter((val)=>{
                          if(searchinput == ""){
                            return val
                          }
                          else if(val.company_name.toLowerCase().includes(searchinput.toLowerCase())){
                            return val
                          }
                          else if(val.supplier_id == searchinput){
                            return val
                          }
                        }).map((val)=> {
                              return (
                                <tr class="table-active tractive" onClick={rowSelect.bind(this, val.supplier_id)}>
                                <th scope="row">{val.supplier_id}</th>
                                <th scope="row">{val.company_name}</th>
                                {addresslist.map((valo)=> {
                                  if(val.supplier_id == valo.supplier_id){
                                    return (
                                      <td scope="row">Block {valo.block} Lot {valo.lot} {valo.street}, Brgy. {valo.barangay}, {valo.city}, {valo.province}, {valo.zipcode}</td>
                                    )
                                  }
                                })}
                                {contactinfolist.map((valo)=> {
                                  if(val.supplier_id == valo.supplier_id){
                                    return (
                                        <th scope="row">{valo.contact_person_name}</th>
                                    )
                                  }
                                })}
                                {contactinfolist.map((valo)=> {
                                  if(val.supplier_id == valo.supplier_id){
                                    return (
                                        <th scope="row">{valo.position}</th>
                                    )
                                  }
                                })}
                                {contactinfolist.map((valo)=> {
                                  if(val.supplier_id == valo.supplier_id){
                                    return (
                                        <th scope="row">{valo.contact_num}</th>
                                    )
                                  }
                                })}
                                {contactinfolist.map((valo)=> {
                                  if(val.supplier_id == valo.supplier_id){
                                    return (
                                        <th scope="row">{valo.contact_email}</th>
                                    )
                                  }
                                })}
                                </tr>
                              )
                            })}
                    </tbody>
              </table>
              </div>
          </main>
        </div>
    );
  }
}

export default Supplierslist;


