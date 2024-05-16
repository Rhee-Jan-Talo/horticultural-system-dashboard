import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Purchaseorderlistinfo() {
    const stat = "Pending"
    const [polist, setpolist] = useState([]);
    useEffect(() =>{
      Axios.get(`http://localhost:3001/purchaseorderlistinfo/${stat}`).then((response) => {
        setpolist(response.data);
      })
    }, [stat])
    const [supplierlist, setsupplierlist] = useState([]);
    useEffect(() =>{
      Axios.get('http://localhost:3001/supplierslist').then((response) => {
        setsupplierlist(response.data);
      })
    }, [])
    var currpolist = []
    var uniqueIds = []
    var uniqueIdsnew = []
    for (let i = 0; i < polist.length; i++){
      for (var key in polist[i]){
        var si
        if(polist[i].hasOwnProperty(key)){
          if(key === "supplier_id"){
            si = polist[i][key]
          }
          if(key === "company_name"){
            let kk = {company_name: polist[i][key], supplier_id: si}
            currpolist.push(kk)
            console.log("KK: ", kk)
          }
      }
    }
    }
    const unique = currpolist.filter(element => {
      const isDuplicate = uniqueIds.includes(element.company_name);
    
      if (!isDuplicate) {
        uniqueIds.push(element.company_name);
        uniqueIdsnew.push(element);
        return true;
      }
    
      return false;
    });
    console.log("sup: ", currpolist)
    console.log("sup1: ", uniqueIdsnew)
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
        id && navigate(generatePath("/purchaseorderedit/:id", { id }));
      }
    };
    const handleProceedConfirm = (sid) => {
      sid && navigate(generatePath("/purchaseorderconfirmation/:sid", { sid }));
    };
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
    });
    const [searchinput, setsearchinput] = useState("");
    return (
      <div className='App'>
          <div class="headform">
          <h1 class="titleheadform">Select Purchase Order for Confirmation</h1>
        </div>
        <main class="container-fluid">
        <Link to="/purchaseorders"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
          <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceed}>Edit PO</button>
          <form class="d-flex">
            <input class="form-control me-sm-2" type="text" placeholder="Search ID, Name, or Supplier" onChange={(e) =>{setsearchinput(e.target.value)}}/>
          </form>
          {uniqueIdsnew.map((valo)=> {
            return (
              <div class="tablediv">
                <br></br>
                <h3>{valo.company_name}</h3>
                    <table class="table table-hover">
                    <thead>
                        <tr>
                          <th scope="col">PO ID</th>
                          <th scope="col">Item</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Units</th>
                          <th scope="col">Price per Unit</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      
                      {polist.filter((val)=>{
                        if(searchinput == ""){
                          return val
                        }
                        else if(val.supply_name.toLowerCase().includes(searchinput.toLowerCase())){
                          return val
                        }
                        else if(val.company_name.toLowerCase().includes(searchinput.toLowerCase())){
                          return val
                        }
                        else if(val.po_id == searchinput){
                          return val
                        }
                      }).map((val)=> {
                        if(valo.company_name == val.company_name){
                          return (
                            <tbody>
                            <tr class="table-primary tractive" onClick={rowSelect.bind(this, val.po_id)}>
                              <th scope="row">{val.po_id}</th>
                              <th scope="row">{val.supply_name}</th>
                              <th scope="row">{val.po_quantity}</th>
                              <th scope="row">{val.units}</th>
                              <th scope="row">{formatter.format(val.price_per_unit)}</th>
                              <th scope="row">{formatter.format(val.total_payment)}</th>
                              </tr>
                              </tbody>
                          )
                        }
                      })}
                </table>
                <button type="button" class="btn btn-outline-primary"  onClick={() => {handleProceedConfirm(valo.supplier_id)}}>Check Out {valo.company_name}'s PO</button>
                <br></br>
                <br></br>
              </div>
            )
          })}
          </main>
        </div>
    );
  }

export default Purchaseorderlistinfo;


