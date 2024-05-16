import React, {useState, useEffect} from 'react';
import './App.css';
import { Link, useNavigate, generatePath, Navigate } from 'react-router-dom';
import Axios from 'axios';

function Employeeaccountsinactive() {
  const [searchinput, setsearchinput] = useState("");
  const navigate = useNavigate();
  const [employeelist, setemployeelist] = useState([]);
  useEffect(() =>{
    Axios.get('http://localhost:3001/employeesaccountinactive').then((response) => {
      setemployeelist(response.data);
    })
  }, [])
  const [atypeinfo, setatypeinfo] = useState("");
  const [isLoading, setLoading] = useState(true);
  Axios.get(`http://localhost:3001/atype`).then((response) => {
    setatypeinfo(response.data);
        setLoading(false);
      })
  console.log("type", atypeinfo)
  if (isLoading) {
    return (<div className="App">Loading...</div>)
  }
  if (atypeinfo != "Admin"){
    alert("Account type not permitted to view this page")
    return (<Navigate to="/home" />);
  }
  var id = 0;
  function rowSelect(event) {
    id = event;
    console.log(id)
  }
  const handleProceed = (e) => {
    if (id == 0){
      alert("Select a row to view.")
    }
    else {
      id && navigate(generatePath("/employeeaccountsedit/:id", { id }));
    }
  };
  const handleProceedHome = (e) => {
    navigate(generatePath("/home"));
    window.location.reload();
  };
  return (
    <div className='App'>
      
      <div>
        <div class="headform">
        <h1 class="titleheadform">Inactive Employee Accounts</h1>
      </div>
      <main class="container-fluid">
      <Link to="/employeeaccounts"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
      <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceed}>Edit</button>
      <form class="d-flex">
            <input class="form-control me-sm-2" type="text" placeholder="Search ID, Name, or Account Type" onChange={(e) =>{setsearchinput(e.target.value)}}/>
          </form>
        <div class="tablediv">
            <table class="table table-hover">
                <thead>
                    <tr>
                      <th scope="col">Employee ID</th>
                      <th scope="col">Employee Name</th>
                      <th scope="col">Username</th>
                      <th scope="col">Account Type</th>
                    </tr>
                  </thead>
                  <tbody>
                  {employeelist.filter((val)=>{
                        if(searchinput == ""){
                          return val
                        }
                        else if(val.emp_name.toLowerCase().includes(searchinput.toLowerCase())){
                          return val
                        }
                        else if(val.account_type.toLowerCase().includes(searchinput.toLowerCase())){
                          return val
                        }
                        else if(val.emp_id == searchinput){
                          return val
                        }
                      }).map((val)=> {
                    return (
                    <tr class="table-active tractive" onClick={rowSelect.bind(this, val.emp_id)}>
                    <td scope="row">{val.emp_id}</td>
                    <td scope="row">{val.emp_name}</td>
                    <td scope="row">{val.username}</td>
                    <td scope="row">{val.account_type}</td>
                  </tr>
                    )
                  })}
                  </tbody>
            </table>
        </div>
      </main>
          </div>
    </div>
  );
}

export default Employeeaccountsinactive;
