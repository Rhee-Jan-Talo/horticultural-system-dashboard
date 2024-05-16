import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath, useParams } from 'react-router-dom';
import Axios from 'axios';

function Purchaseorderstockin() {
    const { final_po_id } = useParams();
    const x = final_po_id
    const navigate = useNavigate();
    const [polist, setpolist] = useState([]);
    const [purorderlist, setpurorderlist] = useState([]);
    var i1
    useEffect(() =>{
      Axios.get(`http://localhost:3001/purchaseorderconfirmedinfo/${x}`).then((response) => {
        setpolist(response.data);
      })
    }, [x])
    const ea = polist[0]
    for (var key in ea) {
        if (ea.hasOwnProperty(key)) {
            if (key === "po_id_list"){
              i1 = ea[key]
            }
        }
      }
    console.log("i1: ", i1)
    const [isLoading, setLoading] = useState(true);
    useEffect(() =>{
        Axios.get(`http://localhost:3001/purchaseorderlistinfoconfirmed/${i1}`).then((response) => {
            setpurorderlist(response.data);
            setLoading(false);
        })
    }, [i1])
    const [rdlist, setrdlist] = useState([]);
    useEffect(() =>{
      Axios.get(`http://localhost:3001/redeliverylist/${i1}`).then((response) => {
        setrdlist(response.data);
          setLoading(false);
      })
  }, [i1])
  console.log("red", rdlist)
    var id = 0
    var id1, id2, id3, id4
    function rowSelect(event) {
      id = event.po_id;
      id1 = event.supply_id
      id2 = event.status
      id3 = event.redelivery
      id4 = event.refund
      console.log(id)
    }
    var w, y, a
    var z = 0
    var zz
    if (z == 0){
      zz = "Not Perishable"
    }
    else if (z == 1){
      zz = "Perishable"
    }
    console.log(z)
    const handleProceed = (e) => {
        if (id3 != "true" && id4 != "true"){
          if (id == 0 ){
            alert("Select Item to Stock In")
        }
          else{
              for(let i = 0; i < purorderlist.length; i++){
                  for (var key in purorderlist[i]) {
                      if (purorderlist[i].hasOwnProperty(key)) {
                          if (key === "po_id"){
                              w = purorderlist[i][key]
                          }
                          if (w == id){
                              if (key === "supply_id"){
                                  a = purorderlist[i][key]
                              }
                              if(key === "perishability"){
                                  z = purorderlist[i][key]
                              }
                              y = w
                          }
                      }
                }
            }
            if (z === 0){
                //Axios.put("http://localhost:3001/purchaseorderstockin", {po_id: y, supply_id: a});
                //x && navigate(generatePath("/purchaseorderstockin/:x", { x }));
                //window.location.reload();
                //alert("Item Stocked In")
                navigate(generatePath("/purchaseorderstockininputnotperishable/:x/:y", { x,y }));
            }
            else if (z === 1){
                navigate(generatePath("/purchaseorderstockininput/:x/:y", { x,y }));
            }
        }
        }
        else if (id3 == "true") {
          alert("Pending redelivery can not be stocked in.")
        }
        else if (id4 == "true") {
          alert("Refunded quantity can not be stocked in.")
        }
    };
    const handleProceedRedeliver = (e) => {
      if (id4 == "true") {
        alert("Refunded orders can not be processed for redelivery.")
      }
      else {
        if (id == 0){
          alert("Select a row to edit for redelivery.")
        }
        else {
          navigate(generatePath("/purchaseorderredelivery/:x/:id/:id1", { x,id,id1 }));
        }
      }
    };
    const handleProceedRefund = (e) => {
      if (id3 == "true" || id4 == "true") {
        alert("Refunded and for redelivery orders can not be processed for refund again.")
      }
      else {
        if (id == 0){
          alert("Select a row to edit for refund.")
        }
        else {
          navigate(generatePath("/purchaseorderrefund/:x/:id/:id1", { x,id,id1 }));
        }
      }
    };
    if (isLoading) {
      return <div className="App">Loading...</div>;
    }
    return (
      <div className='App'>
          <div class="headform">
          <h1 class="titleheadform">Stock In Items in Purchase Order No. {x}</h1>
        </div>
        <main class="container-fluid">
        <Link to="/purchaseorderhistory"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
        <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceed}>Stock In</button>
        <button type="button" class="btn btn-outline-danger secondarybutton" onClick={handleProceedRedeliver}>Redeliver</button>
        <button type="button" class="btn btn-outline-dark secondarybutton" onClick={handleProceedRefund}>Refund</button>
        <div class="tablediv">
                <h4>Items List</h4>
                    <table class="table table-hover">
                    <thead>
                        <tr>
                          <th scope="col">PO ID</th>
                          <th scope="col">Item</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Units</th>
                          <th scope="col">Is Perishable</th>
                          <th scope="col">Quantity Stocked In</th>
                          <th scope="col">Available Quantity for Stock In</th>
                        </tr>
                      </thead>
                    <tbody>
                      {purorderlist.map((val)=> {
                        if(val.status != "Stocked In" && val.redelivery !="true" && val.refund != "true"){
                          let quanti = parseInt(val.po_quantity)
                          let siquanti = parseInt(val.stocked_in_quantity)
                          let avail = quanti - siquanti
                            return (
                                <tr class="table-active" onClick={rowSelect.bind(this, val)}>
                                  <th scope="row">{val.po_id}</th>
                                  <th scope="row">{val.supply_name}</th>
                                  <th scope="row">{val.po_quantity}</th>
                                  <th scope="row">{val.units}</th>
                                  <th scope="row">{zz}</th>
                                  <th scope="row">{val.stocked_in_quantity}</th>
                                  <th scope="row">{avail}</th>
                                  </tr>
                              )
                        }
                        else if(val.redelivery == "true"){
                          let quanti = parseInt(val.po_quantity)
                          let siquanti = parseInt(val.stocked_in_quantity)
                          let avail = quanti - siquanti
                          return (
                            <tr class="table-danger" onClick={rowSelect.bind(this, val)}>
                              <th scope="row">{val.po_id}</th>
                              <th scope="row">{val.supply_name}</th>
                              <th scope="row">{val.po_quantity}</th>
                              <th scope="row">{val.units}</th>
                              <th scope="row">{zz}</th>
                              <th scope="row">{val.stocked_in_quantity}</th>
                              <th scope="row">{avail}</th>
                              </tr>
                          )
                        }
                        else if(val.refund == "true"){
                          let quanti = parseInt(val.po_quantity)
                          let siquanti = parseInt(val.stocked_in_quantity)
                          let avail = quanti - siquanti
                          return (
                            <tr class="table-dark" onClick={rowSelect.bind(this, val)}>
                              <th scope="row">{val.po_id}</th>
                              <th scope="row">{val.supply_name}</th>
                              <th scope="row">{val.po_quantity}</th>
                              <th scope="row">{val.units}</th>
                              <th scope="row">{zz}</th>
                              <th scope="row">{val.stocked_in_quantity}</th>
                              <th scope="row">{avail}</th>
                              </tr>
                          )
                        }
                      })}
                      </tbody>
                </table>
              </div>
          </main>
        </div>
    );
  }

export default Purchaseorderstockin;


