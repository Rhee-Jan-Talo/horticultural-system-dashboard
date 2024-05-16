import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, useParams, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Employeeidpicedit() {
    const { employeeid } = useParams();
    const x = employeeid
    console.log(employeeid)
    const navigate = useNavigate();
    const handleProceed = (e) => {
        x && navigate(generatePath("/employeeprofile/:x", { x }));
    };
    const [employeelist, setemployeelist] = useState([]);
    useEffect(() =>{
      Axios.get(`http://localhost:3001/employeelistpositionhistory/${x}`).then((response) => {
        setemployeelist(response.data);
      })
    }, [x])
  const [employeeidpicture, setemployeeidpicture] = useState("");
  const register = (employeeid) => {
    var a = document.forms["myform"]["ainput"].value;
    if (a == "") {
      alert("Field must be filled out");
    }
    else {
      const formData = new FormData()
        formData.append('profileImg', employeeidpicture)
        formData.append('employeeid', x)
      Axios.put("http://localhost:3001/employeeidpicupdate", formData);
      navigate('/employeelist', { replace: true });
        window.location.reload();
        alert("Employee Picture ID Updated");
    }
  }
  return (
    <div className='App'>
        {employeelist.map((val) => {
            return (
                <div>
                    <div class="headform">
                    <h1 class="titleheadform">Update {val.emp_name}'s ID PIC</h1>
                    </div>
                    <main class="container-fluid">
                    <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
                    <form class="formdiv" enctype="multipart/form-data" name="myform" required>
                    <p><h4><b>Image Map:</b></h4></p>
                    <img class="viewimage" alt="image map" src={`data:image/jpeg;base64,${val.id_pic}`}></img>
                        <div class="form-group">
                            <label for="formFile" class="form-label mt-4">ID Picture</label>
                            <input name="ainput" class="form-control" type="file" id="formFile" onChange={(e) =>{setemployeeidpicture(e.target.files[0])}} required />
                        </div>
                        <button type="submit" value="Submit" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
                    </form>
                    </main>
                </div>
            )
        })}
    </div>
  );
}

export default Employeeidpicedit;
