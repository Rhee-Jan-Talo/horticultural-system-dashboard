import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useParams, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Farmprofilesview() {
  const { farm_id } = useParams();
  const [atypeinfo, setatypeinfo] = useState("");
  const [isLoading, setLoading] = useState(true);
  Axios.get(`http://localhost:3001/atype`).then((response) => {
    setatypeinfo(response.data);
        setLoading(false);
      })
  console.log("type", atypeinfo)
  const x = farm_id
  console.log(x)
  const [ownerinfo, setownerinfo] = useState([]);
  useEffect(() =>{
    Axios.get(`http://localhost:3001/ownerlist/${x}`).then((response) => {
      setownerinfo(response.data);
    })
  }, [x])
  const [farminfo, setfarminfo] = useState([]);
  useEffect(() =>{
    Axios.get(`http://localhost:3001/farmprofileidget/${x}`).then((response) => {
      setfarminfo(response.data);
      console.log(farminfo)
    })
  }, [x])
  const [farmpicsinfo, setfarmpicsinfo] = useState([]);
  useEffect(() =>{
    Axios.get(`http://localhost:3001/farmprofilepcicsget/${x}`).then((response) => {
      setfarmpicsinfo(response.data);
      console.log("pics:", farmpicsinfo)
    })
  }, [x])
  const [addressinfo, setaddressinfo] = useState([]);
  useEffect(() =>{
    Axios.get(`http://localhost:3001/farmaddress/${x}`).then((response) => {
      setaddressinfo(response.data);
    })
  }, [x])
  const [owneraddressinfo, setowneraddressinfo] = useState([]);
  useEffect(() =>{
    Axios.get(`http://localhost:3001/owneraddress/${x}`).then((response) => {
      setowneraddressinfo(response.data);
    })
  }, [x])
  const [farmcontactinfo, setfarmcontactinfo] = useState([]);
  useEffect(() =>{
    Axios.get(`http://localhost:3001/farmcontact/${x}`).then((response) => {
      setfarmcontactinfo(response.data);
    })
  }, [x])
  var id = 0;
  const navigate = useNavigate();
  function rowSelect(event) {
    id = event;
    console.log(id)
  }
  const handleProceed = (e) => {
    if (id == 0){
      alert("Select an owner to edit.")
    }
    else {
      id && navigate(generatePath("/farmprofilesowner/:id", { id }));
    }
  };
  const handleProceedOwner = (e) => {
    x && navigate(generatePath("/farmprofilesowneradd/:x", { x }));
  };
  const handleProceedEdit = (e) => {
    x && navigate(generatePath("/farmprofilesedit/:x", { x }));
  };
  const handleProceedImgMap = (e) => {
    x && navigate(generatePath("/farmprofilesimagemap/:x", { x }));
  };
  const handleProceedGoogleMap = (e) => {
    x && navigate(generatePath("/farmprofilesgooglemap/:x", { x }));
  };
  const handleProceedOrgChart = (e) => {
    x && navigate(generatePath("/farmprofilesorgchart/:x", { x }));
  };
  if (isLoading) {
    return (<div className="App">Loading...</div>)
  }
  if(atypeinfo == "Admin"){
    return (
      <div className='App'>
        {farminfo.map((val)=> {
          return (
            <div>
              
          <div class="headform">
          <h1 class="titleheadform">View {val.farm_name} Profile</h1>
        </div>
        <main class="container-fluid">
        <Link to="/farmprofiles"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedEdit}>Edit Farm Profile</button>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceed}>Edit Owner Profile</button>
         <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedOwner}>Add New Owner</button>
          <br></br>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedImgMap}>Update Image Map</button>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedGoogleMap}>Update Google Map Image</button>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedOrgChart}>Update Organizational Chart Image</button>
          <br></br>
          {addressinfo.map((value)=>{
            return (
              <div class="viewdiv">
              <p><b><h1>General Information</h1></b></p>
              <br></br>
              <p><h3><b>Name: </b>{val.farm_name}</h3></p>
              <p><h3><b>Address:</b></h3></p>
              <p><h4><b>Block: </b>{value.block}</h4></p>
              <p><h4><b>Lot: </b>{value.lot}</h4></p>
              <p><h4><b>Street: </b>{value.street}</h4></p>
              <p><h4><b>Barangay: </b>{value.barangay}</h4></p>
              <p><h4><b>City: </b>{value.city}</h4></p>
              <p><h4><b>Province: </b>{value.province}</h4></p>
              <p><h4><b>Zipcode: </b>{value.zipcode}</h4></p>
              {farmpicsinfo.map((valorant)=> {
                return(
                  <div>
                    <p><h4><b>Image Map:</b></h4></p>
                    <img class="viewimage" alt="image map" src={`data:image/jpeg;base64,${valorant.img_map}`}></img>
                    <p><h4><b>Google Map Image:</b></h4></p>
                    <img class="viewimage" alt="google map image" src={`data:image/jpeg;base64,${valorant.google_map}`}></img>
                    <p><h4><b>Organizational Chart:</b></h4></p>
                    <img class="viewimage" alt="organizational chart" src={`data:image/jpeg;base64,${valorant.org_chart}`}></img>
                    </div>
                )
              })}
              <br></br>
              <p><h1>Social Information</h1></p>
              <br></br>
              {farmcontactinfo.map((vals)=> {
                return (
                  <div>
                    <p><h3><b>Contact Person: </b>{vals.contact_person_name}</h3></p>
                    <p><h3><b>Position: </b>{vals.position}</h3></p>
                    <p><h3><b>Contact Number: </b>{vals.contact_num}</h3></p>
                    <p><h3><b>Contact Email: </b>{vals.contact_email}</h3></p>
                    </div>
                )
              })}
              <br></br>
              <p><h1>Owner Information</h1></p>
          </div>
            )
          })}
              <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Owner Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Owner Type</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Contact Email</th>
                        <th scope="col">Educational Attainment</th>
                        <th scope="col">Position</th>
                        <th scope="col">Job Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ownerinfo.map((values)=> {
                        return(
                          <tr class="table-active tractive" onClick={rowSelect.bind(this, values.owner_id)}>
                            <td scope="row">{values.owner_name}</td>
                            {owneraddressinfo.map((valo)=> {
                              if (valo.owner_id == values.owner_id){
                                return (
                                  <td scope="row">Block {valo.block} Lot {valo.lot} {valo.street}, Brgy. {valo.barangay}, {valo.city}, {valo.province}, {valo.zipcode}</td>
                                )
                              }
                            })}
                              <td scope="row">{values.owner_type}</td>
                              <td scope="row">{values.contact_num}</td>
                              <td scope="row">{values.contact_email}</td>
                              <td scope="row">{values.educational_attainment}</td>
                              <td scope="row">{values.position}</td>
                              <td scope="row">{values.job_desc}</td>
                          </tr>
                        )
                      })}
                    </tbody>
              </table>
              </div>
          </main>
            </div>
          )
        })}
      </div>
    );
  }
  else {
    return (
      <div className='App'>
        {farminfo.map((val)=> {
          return (
            <div>
              
          <div class="headform">
          <h1 class="titleheadform">View {val.farm_name} Profile</h1>
        </div>
        <main class="container-fluid">
        <Link to="/farmprofiles"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
          <br></br>
          {addressinfo.map((value)=>{
            return (
              <div class="viewdiv">
              <p><b><h1>General Information</h1></b></p>
              <br></br>
              <p><h3><b>Name: </b>{val.farm_name}</h3></p>
              <p><h3><b>Address:</b></h3></p>
              <p><h4><b>Block: </b>{value.block}</h4></p>
              <p><h4><b>Lot: </b>{value.lot}</h4></p>
              <p><h4><b>Street: </b>{value.street}</h4></p>
              <p><h4><b>Barangay: </b>{value.barangay}</h4></p>
              <p><h4><b>City: </b>{value.city}</h4></p>
              <p><h4><b>Province: </b>{value.province}</h4></p>
              <p><h4><b>Zipcode: </b>{value.zipcode}</h4></p>
              {farmpicsinfo.map((valorant)=> {
                return(
                  <div>
                    <p><h4><b>Image Map:</b></h4></p>
                    <img class="viewimage" alt="image map" src={`data:image/jpeg;base64,${valorant.img_map}`}></img>
                    <p><h4><b>Google Map Image:</b></h4></p>
                    <img class="viewimage" alt="google map image" src={`data:image/jpeg;base64,${valorant.google_map}`}></img>
                    <p><h4><b>Organizational Chart:</b></h4></p>
                    <img class="viewimage" alt="organizational chart" src={`data:image/jpeg;base64,${valorant.org_chart}`}></img>
                    </div>
                )
              })}
              <br></br>
              <p><h1>Social Information</h1></p>
              <br></br>
              {farmcontactinfo.map((vals)=> {
                return (
                  <div>
                    <p><h3><b>Contact Person: </b>{vals.contact_person_name}</h3></p>
                    <p><h3><b>Position: </b>{vals.position}</h3></p>
                    <p><h3><b>Contact Number: </b>{vals.contact_num}</h3></p>
                    <p><h3><b>Contact Email: </b>{vals.contact_email}</h3></p>
                    </div>
                )
              })}
              <br></br>
              <p><h1>Owner Information</h1></p>
          </div>
            )
          })}
              <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Owner Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Owner Type</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Contact Email</th>
                        <th scope="col">Educational Attainment</th>
                        <th scope="col">Position</th>
                        <th scope="col">Job Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ownerinfo.map((values)=> {
                        return(
                          <tr class="table-active tractive" onClick={rowSelect.bind(this, values.owner_id)}>
                            <td scope="row">{values.owner_name}</td>
                            {owneraddressinfo.map((valo)=> {
                              if (valo.owner_id == values.owner_id){
                                return (
                                  <td scope="row">Block {valo.block} Lot {valo.lot} {valo.street}, Brgy. {valo.barangay}, {valo.city}, {valo.province}, {valo.zipcode}</td>
                                )
                              }
                            })}
                              <td scope="row">{values.owner_type}</td>
                              <td scope="row">{values.contact_num}</td>
                              <td scope="row">{values.contact_email}</td>
                              <td scope="row">{values.educational_attainment}</td>
                              <td scope="row">{values.position}</td>
                              <td scope="row">{values.job_desc}</td>
                          </tr>
                        )
                      })}
                    </tbody>
              </table>
              </div>
          </main>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Farmprofilesview;

                