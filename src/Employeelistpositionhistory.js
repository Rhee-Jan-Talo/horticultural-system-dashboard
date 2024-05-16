import React, {useEffect, useState} from 'react';
import './App.css';
import { Link, useParams, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Employeelistpositionhistory() {
  const navigate = useNavigate();
  const { employeeid } = useParams();
  const x = employeeid
  console.log(x)
  const [employeelist, setemployeelist] = useState([]);
  useEffect(() =>{
    Axios.get(`http://localhost:3001/employeelistpositionhistory/${x}`).then((response) => {
      setemployeelist(response.data);
    })
  }, [x])
  const [positionlist, setpositionlist] = useState([]);
  useEffect(() =>{
    Axios.get(`http://localhost:3001/employeelistpositionhistorydata/${x}`).then((response) => {
      setpositionlist(response.data);
    })
  }, [x])
  console.log(employeelist)
  const handleProceed = (e) => {
    x && navigate(generatePath("/employeeprofile/:x", { x }));
  };
  return (
    <div className='App'>
      {employeelist.map((val) => {
        return (
          <div>
          
    <div class="headform">
        <h1 class="titleheadform">{val.emp_name}'s Position History</h1>
        <h4>Employee ID:  {employeeid}</h4>
      </div>
      <br></br>
      <main class="container-fluid">
      <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceed}>Back</button>
        <div class="tablediv">
            <table class="table table-hover">
                <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Position</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                  {positionlist.map((valo)=> {
                    var cdate = (new Date(valo.date_given)).toLocaleDateString();
                    return (
                      <tr class="table-active tractive">
                            <td scope="row">{cdate}</td>
                            <td scope="row">{valo.emp_position}</td>
                            <td scope="row">{valo.emp_status}</td>
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

export default Employeelistpositionhistory;
