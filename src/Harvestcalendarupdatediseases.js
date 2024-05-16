import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, useParams, generatePath } from 'react-router-dom';
import Axios from 'axios';


function Harvestcalendarupdatediseases() {
    const navigate = useNavigate();
    const {values} = useParams();
    const w = JSON.parse(values)
    const wnew = JSON.stringify(w)
    const handleProceed = (e) => {
        wnew && navigate(generatePath("/harvestcalendarmonitoringevent/:wnew", { wnew }));
      };
    var x,y,z,ai,did // x for id, y for start date, z for start, ai for act_increment. did for disease_act_id
    for (var key in w) {
      if (w.hasOwnProperty(key)) {
          if (key === "id"){
            x = w[key]
          }
          if (key === "startd"){
            y = w[key]
          }
          if (key === "endd"){
            z = w[key]
          }
          if (key === "actinc"){
            ai = w[key]
          }
          if (key === "did"){
            did = w[key]
          }
      }
    }
    const [harvestdiseasesinfo, setharvestdiseasesinfo] = useState([]);
    useEffect(() =>{
      async function fetchData(){
          await Axios.get(`http://localhost:3001/harvestinputdiseases/${x}`).then((response) => {
            setharvestdiseasesinfo(response.data);
      })
      }
      fetchData()
    }, [x])
    const ea = harvestdiseasesinfo[0]
    var i1
    for (var key in ea) {
        if (ea.hasOwnProperty(key)) {
            if (key === "quantity"){
              i1 = ea[key]
            }
        }
      }
    const [num_of_plants_affected, setnum_of_plants_affected] = useState("")
    const [date_cured, setdate_cured] = useState("")
    const [disease_desc, setdisease_desc] = useState("")
    const [dis_status, setdis_status] = useState("")
    const activities_id = x
    const act_increment = ai
    const [diseasesinfo, setdiseasesinfo] = useState([]);
    useEffect(() =>{
    async function fetchData(){
        await Axios.get(`http://localhost:3001/harvestdiseasesinfo/${did}`).then((response) => {
            setdiseasesinfo(response.data);
    })
    }
    fetchData()
    }, [did])
    const oa = diseasesinfo[0]
    var j1, j2, j3, j4
    for (var key in oa) {
        if (oa.hasOwnProperty(key)) {
            if (key === "num_of_plants_affected"){
              j1 = oa[key]
            }
            if (key === "date_cured"){
                j2 = oa[key]
            }
            if (key === "disease_desc"){
                j3 = oa[key]
            }
            if (key === "dis_status"){
                j4 = oa[key]
            }
        }
      }
    useEffect(()=>{
        setnum_of_plants_affected(j1)
        setdate_cured(j2)
        setdisease_desc(j3)
        setdis_status(j4)
    }, [j1,j2,j3,j4])
    const register = () => {
        var a = document.forms["myform"]["ainput"].value;
        var b = document.forms["myform"]["binput"].value;
        var c = document.forms["myform"]["cinput"].value;
        if (a == "" ||b == "" || c == "") {
          alert("Required fields must be filled out");
        }
        if (b > i1){
            alert("Invalid input. Quantities affected are greater than the batch's actual quantity.");
        }
        else {
            Axios.put("http://localhost:3001/harvestdiseaseupdate", {disease_act_id: did, num_of_plants_affected: num_of_plants_affected, date_cured: z, disease_desc: disease_desc, dis_status: dis_status});
            x && navigate(generatePath("/harvestcalendar/:x", { x }));
            window.location.reload();
            alert("Plant Disease updated");
        }
      }
      var cdatey = (new Date(y)).toLocaleDateString();
      var cdatez = (new Date(z)).toLocaleDateString()
    return (
        <div className="App">
            <div class="headform">
            <h1 class="titleheadform">Update Disease {did} for Batch {x}</h1>
            <h6>From: {cdatey} To: {cdatez}</h6>
            </div>
            <main class="container-fluid">
            <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
            <form class="formdiv" name="myform" required>
            <p><em>NOTE: The cured date of the disease will be the end date of the selected event when its status is changed to CURED.</em></p>
                {diseasesinfo.map((val)=>{
                    return (
                        <div>
                        <div class="form-group">
                            <label class="col-form-label mt-4" for="inputDefault">Number of Plants Affected</label>
                            <input name="binput" type="number" class="form-control" placeholder={val.num_of_plants_affected} defaultValue={val.num_of_plants_affected} id="inputDefault" onChange={(e) =>{setnum_of_plants_affected(e.target.value)}} required/>
                        </div>
                        <div class="form-group">
                            <label class="col-form-label mt-4" for="inputDefault">Disease Description/Remarks</label>
                            <input name="cinput" type="text" class="form-control" placeholder={val.disease_desc} defaultValue={val.disease_desc} id="inputDefault" onChange={(e) =>{setdisease_desc(e.target.value)}} required/>
                        </div>
                        <fieldset name="ainput" class="form-group" onChange={(e) =>{setdis_status(e.target.value)}} required>
                            <legend class="mt-4">Status</legend>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios1" value="Active" defaultChecked={val.dis_status === "Active"}/>
                            <label class="form-check-label" for="optionsRadios1">
                                Active
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios2" value="Cured" defaultChecked={val.dis_status === "Cured"}/>
                            <label class="form-check-label" for="optionsRadios2">
                                Cured
                            </label>
                            </div>
                        </fieldset>
                    </div>
                    )
                })}
                
                <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
            </form>
            </main>
        </div>
    )
}

export default Harvestcalendarupdatediseases;