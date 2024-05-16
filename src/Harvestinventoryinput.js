import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import DatePicker from "react-datepicker";


function Harvestinventoryinput() {
    const { batch_id } = useParams()
    const x = batch_id
    const navigate = useNavigate()
    const [harvestinfo, setharvestinfo] = useState([]);
    useEffect(() =>{
      async function fetchData(){
          await Axios.get(`http://localhost:3001/plantbatchinfo/${x}`).then((response) => {
            setharvestinfo(response.data);
      })
      }
      fetchData()
    }, [x])
    const ea = harvestinfo[0]
    var date_harvested
    const batch_status = "Ready for Sale"
    for (var key in ea) {
        if (ea.hasOwnProperty(key)) {
            if (key === "date_harvested"){
                date_harvested = ea[key]
            }
          }
      }
    const [batch_img, setbatch_img] = useState("")
    const [batch_quality, setbatch_quality] = useState("")
    const [remarks, setremarks] = useState("")
    const register = () => {
        var a = document.forms["myform"]["ainput"].value;
        if (a == "") {
          alert("Harvested Batch Quality must be filled out");
        }
        else {
            const formData = new FormData()
            formData.append('profileImg', batch_img)
            formData.append('batch_id', batch_id)
            formData.append('date_harvested', date_harvested)
            formData.append('batch_quality', batch_quality)
            formData.append('remarks', remarks)
            formData.append('batch_status', batch_status)
            Axios.post("http://localhost:3001/harvestbatchinput", formData);
            navigate('/harvestcalendarlist', { replace: true });
            window.location.reload();
            alert("Batch updated");
        }
      }
    return(
        <div className="App">
            <div class="headform">
            <h1 class="titleheadform">Input Batch {x}'s Crops for Sales</h1>
            </div>
            <main class="container-fluid">
            <Link to="/harvestcalendarlist"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
                <form class="formdiv" enctype="multipart/form-data" name="myform" required>
                <fieldset name="ainput" class="form-group" onChange={(e) =>{setbatch_quality(e.target.value)}} required>
                            <legend class="mt-4">Harvested Batch Quality</legend>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios1" value="A"/>
                            <label class="form-check-label" for="optionsRadios1">
                                A
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios2" value="B"/>
                            <label class="form-check-label" for="optionsRadios2">
                                B 
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios3" value="C"/>
                            <label class="form-check-label" for="optionsRadios3">
                                C
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios4" value="D"/>
                            <label class="form-check-label" for="optionsRadios4">
                                D
                            </label>
                            </div>
                    </fieldset>
                    <div class="form-group">
                        <label class="col-form-label mt-4" for="inputDefault">Image</label>
                        <input required class="form-control" type="file" id="formFile" onChange={(e) =>{setbatch_img(e.target.files[0]) }}/>
                    </div>
                    <div class="form-group">
                        <label class="col-form-label mt-4" for="inputDefault">Remarks</label>
                        <input type="text" class="form-control" placeholder="Remarks" id="inputDefault" onChange={(e) =>{setremarks(e.target.value)}} required/>
                    </div>
                    <button type="button" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
                </form>
            </main>

        </div>
    )
}

export default Harvestinventoryinput;