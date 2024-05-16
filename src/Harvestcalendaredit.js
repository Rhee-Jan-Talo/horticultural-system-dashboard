import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import DatePicker from "react-datepicker";


function Harvestcalendaredit() {
    const { batch_id } = useParams();
    const x = batch_id
    console.log(x)
    const navigate = useNavigate()
    const [batchinfo, setbatchinfo] = useState([]);
    useEffect(() =>{
        Axios.get(`http://localhost:3001/plantbatchinfo/${x}`).then((response) => {
            setbatchinfo(response.data);
        })
    }, [x])
    const [newEvent, setnewEvent] = useState({title: "", start: "", end: ""})

    const [harvestplantname, setharvestplantname] = useState("")
    const [harveststatus, setharveststatus] = useState("")
    const [harveststart, setharveststart] = useState("")
    const [harvestend, setharvestend] = useState("")
    const [harvestquantity, setharvestquantity] = useState("")
    const [harvestmeasurement, setharvestmeasurement] = useState("")
    const [plantprofilelist, setplantprofilelist] = useState([]);
    const [area_id, setarea_id] = useState("")
    const ea = batchinfo[0]
    var i1,i2,i3,i4,i5,i6, i7, i8, i9
    for (var key in ea) {
        if (ea.hasOwnProperty(key)) {
            if (key === "plant_id"){
              i1 = ea[key]
            }
            if (key === "batch_status"){
              i2 = ea[key]
            }
            if (key === "farm_period_start"){
              i3 = ea[key]
            }
            if (key === "expected_harvest_period"){
              i4 = ea[key]
            }
            if (key === "quantity"){
              i5 = ea[key]
            }
            if (key === "measurement"){
              i6 = ea[key]
            }
            if (key === "area_id"){
              i7 = ea[key]
            }
            if (key === "area_name"){
              i8 = ea[key]
            }
            if (key === "size"){
              i9 = ea[key]
            }
        }
      }
      useEffect(() =>{
        setharvestplantname(i1)
        setharveststatus(i2)
        setharveststart(i3)
        setharvestend(i4)
        setharvestquantity(i5)
        setharvestmeasurement(i6)
        setarea_id(i7)
      }, [i1, i2, i3, i4, i5, i6, i7])
    useEffect(() =>{
        Axios.get('http://localhost:3001/plantprofile').then((response) => {
        setplantprofilelist(response.data);
        })
    }, [])
    const [arealist, setarealist] = useState([]);
    useEffect(() =>{
      Axios.get(`http://localhost:3001/farmareaslist`).then((response) => {
          setarealist(response.data);
      })
    }, [])
    console.log("status", harveststatus)
    const register = () => {
        Axios.put("http://localhost:3001/plantbatchedit", {batch_status: harveststatus, batch_id: x, area_id: area_id});
        navigate('/harvestcalendarlist', { replace: true });
        window.location.reload();
        console.log(harveststatus)
        console.log(area_id)
        alert("Batch updated");
      }
    return(
        <div className="App">
            {batchinfo.map((val)=>{
                return(
                    <div>
            <div class="headform">
            <h1 class="titleheadform">Edit Batch {val.batch_id} Info</h1>
            </div>
            <main class="container-fluid">
            <Link to="/harvestcalendarlist"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
                <form class="formdiv" name="myform" required>
                    <fieldset name="binput" class="form-group" onChange={(e) =>{setharveststatus(e.target.value)}} required>
                        <legend class="mt-4">Status</legend>
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios1" value="Active" defaultChecked={val.batch_status === "Active"}/>
                        <label class="form-check-label" for="optionsRadios1">
                            Active
                        </label>
                        </div>
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios2" value="Inactive" defaultChecked={val.batch_status === "Inactive"}/>
                        <label class="form-check-label" for="optionsRadios2">
                            Inactive 
                        </label>
                        </div>
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios3" value="Harvested" defaultChecked={val.batch_status === "Harvested"}/>
                        <label class="form-check-label" for="optionsRadios3">
                            Harvested {/*<em>(after labeled as harvested, you can view it later at the Harvest Calendar to input harvest data.)</em>*/}
                        </label>
                        </div>
                      <br></br>
                    </fieldset>
                      <div class="form-group">
                    <label for="exampleSelect1" class="col-form-label mt-4">Area <em>(you can add new area in farm profiles)</em></label>
                    <select  name="ainput" required class="form-select" id="exampleSelect1" onChange={(e) =>{ setarea_id(e.target.value) }}>
                        <option value={i7}>{i8} size: {i9}</option>
                        {arealist.map((val) => {
                          return (
                            <option value={val.area_id}>{val.area_name} size: {val.size} hectares</option>
                          )
                        })}
                    </select>
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

export default Harvestcalendaredit;