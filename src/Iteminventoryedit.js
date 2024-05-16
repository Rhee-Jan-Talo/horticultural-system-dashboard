import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';


function Iteminventoryedit() {
    const { supply_id } = useParams();
    const x = supply_id
    const navigate = useNavigate();
    const [iteminfo, setiteminfo] = useState([]);
    useEffect(() =>{
        Axios.get(`http://localhost:3001/iteminventoryinfo/${x}`).then((response) => {
            setiteminfo(response.data);
        })
      }, [x])
    const ea = iteminfo[0]
    var i1, i2, i3, i4, i5, i6
    for (var key in ea) {
        if (ea.hasOwnProperty(key)) {
            if (key === "supply_name"){
              i1 = ea[key]
            }
            if (key === "category"){
              i2 = ea[key]
            }
            if (key === "perishability"){
              i3 = ea[key]
            }
            if (key === "re_order_lvl"){
              i4 = ea[key]
            }
            if (key === "units"){
              i5 = ea[key]
            }
            if (key === "description"){
              i6 = ea[key]
            }
        }
      }
    const [supply_name, setsupply_name] = useState("")
    const [category, setcategory] = useState("")
    const [units, setunits] = useState("")
    const [perishability, setperishability] = useState("")
    const [re_order_lvl, setre_order_lvl] = useState("")
    const [description, setdescription] = useState("")
      useEffect(() =>{
        setsupply_name(i1)
        setcategory(i2)
        setperishability(i3)
        setre_order_lvl(i4)
        setunits(i5)
        setdescription(i6)
      }, [i1, i2, i3, i4, i5, i6])
      const [categorylist, setcategorylist] = useState([]);
      useEffect(() =>{
          Axios.get('http://localhost:3001/plantutilitiesitemcategory').then((response) => {
            setcategorylist(response.data);
          })
        }, [])
      const [unitlist, setunitlist] = useState([]);
      useEffect(() =>{
          Axios.get('http://localhost:3001/plantutilitiesunitsofmeasurement').then((response) => {
            setunitlist(response.data);
          })
        }, [])
    
    const register = () => {
        var a = document.forms["myform"]["ainput"].value;
        var b = document.forms["myform"]["binput"].value;
        var c = document.forms["myform"]["cinput"].value;
        var d = document.forms["myform"]["dinput"].value;
        var e = document.forms["myform"]["einput"].value;
        if (a == "" ||b == "" || c == "" ||d == "" || e =="") {
          alert("Required fields must be filled out");
        }
        else {
            Axios.put("http://localhost:3001/iteminventoryupdate", {supply_id: x, supply_name: supply_name, category: category, units: units, perishability: perishability, re_order_lvl: re_order_lvl, description: description});
            navigate('/iteminventory', { replace: true });
            window.location.reload();
            alert("Item Profile Updated");
        }
      }
    return(
        <div className="App">
            {iteminfo.map((val)=> {
                return (
                    <div>
                        <div class="headform">
            <h1 class="titleheadform">Edit Item {val.supply_name}</h1>
            </div>
            <main class="container-fluid">
            <Link to="/iteminventory"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
                <form class="formdiv" name="myform" required>
                <div class="form-group">
                <label for="exampleSelect1" class="col-form-label mt-4">Item Category <em>(you can add new item category in utilities)</em></label>
                    <select  name="einput" required class="form-select" id="exampleSelect1" onChange={(e) =>{setcategory(e.target.value)}}>
                    <option value={val.category}>{val.category}</option>
                        {categorylist.map((val) => {
                          return (
                            <option value={val.itemcategory_name}>{val.itemcategory_name}</option>
                          )
                        })}
                    </select>
                    </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Name</label>
                    <input name="ainput" type="text" class="form-control" placeholder={val.supply_name} defaultValue={val.supply_name} id="inputDefault" onChange={(e) =>{setsupply_name(e.target.value)}} required/>
                </div>
                
                <fieldset name="binput" class="form-group" onChange={(e) =>{setperishability(e.target.value)}} required>
                <legend class="mt-4">Perishable</legend>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios1" value="1" defaultChecked={val.perishability === 1}/>
                  <label class="form-check-label" for="optionsRadios1">
                    Yes
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios2" value="0" defaultChecked={val.perishability === 0}/>
                  <label class="form-check-label" for="optionsRadios2">
                    No
                  </label>
                </div>
              </fieldset>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Reorder Level Quantity</label>
                    <input name="cinput" type="number" class="form-control" placeholder={val.re_order_lvl} defaultValue={val.re_order_lvl} id="inputDefault" onChange={(e) =>{setre_order_lvl(e.target.value)}} required/>
                </div>
                <div class="form-group">
                    <label for="exampleSelect1" class="col-form-label mt-4">Unit of measurement <em>(you can add new units of measurement in utilities)</em></label>
                    <select  name="dinput" required class="form-select" id="exampleSelect1" onChange={(e) =>{setunits(e.target.value)}}>
                        <option value={val.units}>{val.units}</option>
                        {unitlist.map((val) => {
                          return (
                            <option value={val.unit_name}>{val.unit_name}</option>
                          )
                        })}
                    </select>
                    </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Description</label>
                    <input type="text" class="form-control" placeholder={val.description} defaultValue={val.description} id="inputDefault" onChange={(e) =>{setdescription(e.target.value)}} required/>
                </div>
                <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
                </form>
            </main>
                    </div>
                )
            })}

        </div>
    )
}

export default Iteminventoryedit;