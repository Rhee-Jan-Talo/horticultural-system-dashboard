import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, useParams, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Employeejobdescriptionedit() {
    const { employeeid } = useParams();
    const x = employeeid
    console.log(employeeid)
    const navigate = useNavigate();
    const handleProceed = (e) => {
        x && navigate(generatePath("/employeelistedit/:x", { x }));
    };
    const [employeeinfo, setemployeeinfo] = useState([]);
    useEffect(() =>{
    Axios.get(`http://localhost:3001/employeelistedit/${x}`).then((response) => {
      setemployeeinfo(response.data);
    })
  }, [x])
  console.log(employeeinfo)
  const ea = employeeinfo[0]
  var i1
  for (var key in ea) {
    if (key === "employeejobdescription"){
        i1 = ea[key]
    }
  }
  console.log(i1)
  const [employeejobdescription, setemployeejobdescription] = useState("");
  useEffect(() =>{
    setemployeejobdescription(i1)
  }, [i1])
  const register = (employeeid) => {
    var a = document.forms["myform"]["ainput"].value;
    if (a == "") {
      alert("Required field must be filled out");
    }
    else {
      Axios.put("http://localhost:3001/employeejobdescriptionupdate", {employeejobdescription: employeejobdescription, employeeid: employeeid});
      setemployeejobdescription("");
      navigate('/employeelist', { replace: true });
        window.location.reload();
        alert("Employee Job Description File Updated");
    }
  }
  return (
    <div className='App'>
        {employeeinfo.map((val) => {
            return (
                <div>
                    <div class="headform">
                    <h1 class="titleheadform">Edit {val.employeelastname}'s Job Description</h1>
                    </div>
                    <main class="container-fluid">
                    <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
                    <form class="formdiv" name="myform" required>
                        <div class="form-group">
                            <label for="formFile" class="form-label mt-4">Job Description *</label>
                            <input name="ainput" class="form-control" type="file" id="formFile" onChange={(e) =>{setemployeejobdescription(e.target.value)}} required />
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

export default Employeejobdescriptionedit;
