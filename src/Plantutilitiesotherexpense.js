import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Plantutilitiesotherexpense() {
  const [otherexpensesname, setotherexpensesname] = useState("")
  const [otherexpenseslist, setotherexpenseslist] = useState([]);
  useEffect(() =>{
    Axios.get('http://localhost:3001/plantutilitiesotherexpenses').then((response) => {
      setotherexpenseslist(response.data);
    })
  }, [])
  const [atypeinfo, setatypeinfo] = useState("");
  const [isLoading, setLoading] = useState(true);
  Axios.get(`http://localhost:3001/atype`).then((response) => {
    setatypeinfo(response.data);
        setLoading(false);
      })
  console.log("type", atypeinfo)
  const navigate = useNavigate();
  const submitOtherExpenses = async () => {
    var a = document.forms["myform"]["ainput"].value;
    if (a == ""){
      alert("No input")
    }
    else{
      let checker = 0
      for (let i = 0; i < otherexpenseslist.length; i++){
        for (var key in otherexpenseslist[i]){
          if(otherexpenseslist[i].hasOwnProperty(key)){
            if(key === "otherexpensesname"){
              if (otherexpenseslist[i][key] == otherexpensesname){
                checker = 1
              }
            }
        }
      }
      }
      if (checker == 0){
        Axios.post("http://localhost:3001/plantutilitiesotherexpensesadd", {otherexpensesname: otherexpensesname}).then((result) => {{console.log(result.data.insertId)}});
        setotherexpenseslist([...otherexpenseslist, {otherexpensesname: otherexpensesname}]);
        navigate('/plantutilitiesotherexpense', { replace: true });
        window.location.reload();
        alert("Other Expense Type Recorded")
      }
      else {
        alert("Other Expense type already existed.")
      }
    }
    
  };
  if (isLoading) {
    return (<div className="App">Loading...</div>)
  }
  if(atypeinfo == "Admin"){
    return (
      <div className='App'>
          <div class="headform">
        <h1 class="titleheadform">Utilities for Other Expense Type</h1>
      </div>
      <main class="container-fluid">
      <Link to="/plantutilities"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
          <div class="formdiv">
              <form class="formdiv" name="myform" required>
              <div class="input-group mb-3">
              <input name="ainput" type="text" class="form-control" placeholder="Other Expense" aria-label="Recipient's username" aria-describedby="button-addon2"onChange={(e) =>{
            setotherexpensesname(e.target.value)
          }}/>
              <button class="btn btn-primary" type="button" id="button-addon2" onClick={submitOtherExpenses}>Add</button>
          </div>
              </form>
          </div>
          <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Registered Other Expense</th>
                      </tr>
                    </thead>
                    <tbody>
                    {otherexpenseslist.map((val) => {
                            return(
                              <tr class="table-active tractive">
                              <td scope="row">{val.otherexpensesname}</td>
                              </tr>
                                )
                        })}
                    </tbody>
              </table>
          </div>
        </main>
      </div>
    );
  }
  else {
    return (
      <div className='App'>
          <div class="headform">
        <h1 class="titleheadform">Utilities for Other Expense Type</h1>
      </div>
      <main class="container-fluid">
      <Link to="/plantutilities"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
          
          <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Registered Other Expense</th>
                      </tr>
                    </thead>
                    <tbody>
                    {otherexpenseslist.map((val) => {
                            return(
                              <tr class="table-active tractive">
                              <td scope="row">{val.otherexpensesname}</td>
                              </tr>
                                )
                        })}
                    </tbody>
              </table>
          </div>
        </main>
      </div>
    );
  }
}

export default Plantutilitiesotherexpense;
