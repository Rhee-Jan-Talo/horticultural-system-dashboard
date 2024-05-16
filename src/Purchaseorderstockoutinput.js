import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, useParams, generatePath } from 'react-router-dom';
import Axios from 'axios';


function Purchaseorderstockoutinput() {
    const navigate = useNavigate();
    const { values } = useParams()
    const { assign_id } = useParams()
    const { supply_id } = useParams()
    const wnew = values
    const x = assign_id
    const y = supply_id
    const [quantity, setquantity] = useState("")
    const [itemlist, setitemlist] = useState([]);
    useEffect(() =>{
      Axios.get(`http://localhost:3001/stockoutitemsinfo/${y}`).then((response) => {
        setitemlist(response.data);
      })
    }, [y])
    const ea = itemlist[0]
    var i1, i2, i3, i4
    for (var key in ea) {
      if (ea.hasOwnProperty(key)) {
          if (key === "quantity"){
            i1 = ea[key]
          }
          if (key === "units"){
            i2 = ea[key]
          }
          if (key === "perishability"){
            i3 = ea[key]
          }
          if (key === "supply_name"){
            i4 = ea[key]
          }
      }
    }
    const status = "Not Expired"
    const [perishablelist, setperishablelist] = useState([]);
    useEffect(() =>{
      Axios.get(`http://localhost:3001/stockoutitemsperishable/${y}/${status}`).then((response) => {
        setperishablelist(response.data);
      })
    }, [y, status])
    var id = 0, id1 ,id2
    function rowSelect(event) {
    id = event;
    alert("ID "+ id.perishable_items_id+ " is selected for input.")
    id1 = id.perishable_items_id
    id2 = id.quantity
  }
  var today = new Date();
    const register = () => {
        var a = document.forms["myform"]["ainput"].value;
        if (i3 == 1) {
          if (id == 0) {
            alert("Select a row for input.")
          }
          else if (a == "" ) {
            alert("Required fields must be filled out");
          }
          else if (a > id2) {
            alert("Invalid input. Inputted quantity exceeds the available quantity.")
          }
          else if (a <= 0) {
            alert("Invalid input. Inputted quantity should not be less than or equal to 0.")
          }
          else {
            Axios.post("http://localhost:3001/stockoutitemsinputperishable", {supply_id: y, assign_id: x, perishable_items_id: id1, quantity: quantity, date: today});
            navigate(generatePath("/harvestcalendarmonitoringevent/:wnew", { wnew}));
            window.location.reload();
            alert("Item Stocked Out")
          }
        }
        else if (i3 == 0) {
          if (a == "" ) {
            alert("Required fields must be filled out");
          }
          else if (a > i1) {
            alert("Invalid input. Inputted quantity exceeds the available quantity.")
          }
          else if (a <= 0) {
            alert("Invalid input. Inputted quantity should not be less than or equal to 0.")
          }
          else {
            Axios.post("http://localhost:3001/stockoutitemsinputnotperishable", {supply_id: y, assign_id: x, quantity: quantity, date: today});
            navigate(generatePath("/harvestcalendarmonitoringevent/:wnew", { wnew}));
            window.location.reload();
            alert("Item Stocked Out")
          }
        }
      }
      const handleBack = (e) => {
        navigate(generatePath("/purchaseorderstockoutinventory/:wnew/:x", { wnew, x }));
      };
    return(
        <div className="App">
            <div class="headform">
            <h1 class="titleheadform">Input Stock Out Quantity in {i4} for Activity {x} wa{i3}</h1>
            </div>
            <main class="container-fluid">
            <button type="button" class="btn btn-outline-dark backbutton" onClick={handleBack}>Back</button>
            <h5><strong>Quantity Available: </strong>{i1}</h5> <h5><strong>Units: </strong>{i2}</h5>
            <h6><em>input quantity first before selecting a row for perishable items</em></h6>
                <form class="formdiv" name="myform" required>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Quantity</label>
                    <input name="ainput" type="number" class="form-control" placeholder="Quantity" id="inputDefault" onChange={(e) =>{setquantity(e.target.value)}} required/>
                </div>
                <div class="tablediv">
                  <table class="table table-hover">
                  <thead>
                  {itemlist.map((val)=> {
                  if(i3 == 1){
                    return (
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Expiration Date</th>
                      </tr>
                    )
                  }
                })}
                  </thead>
                <tbody>
                {perishablelist.map((val)=> {
                  if(i3 == 1){
                    var cdatey = (new Date(val.exp_date)).toLocaleDateString();
                    if(val.quantity > 0){
                      return (
                        <tr class="table-primary tractive" onClick={rowSelect.bind(this, val)}>
                          <th scope="row">{val.perishable_items_id}</th>
                          <th scope="row">{val.quantity}</th>
                          <th scope="row">{cdatey}</th>
                        </tr>
                      )
                    }
                  }
                })}
                </tbody>
                  </table>
                </div>
                <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
                </form>
            </main>

        </div>
    )
}

export default Purchaseorderstockoutinput;