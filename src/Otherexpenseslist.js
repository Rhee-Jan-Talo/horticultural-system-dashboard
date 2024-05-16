import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath, useParams } from 'react-router-dom';
import Axios from 'axios';


function Otherexpenseslist() {
  const y = "Pending"
  const [oelist, setoelist] = useState([])
  useEffect(() =>{
    Axios.get(`http://localhost:3001/otherexpensespending/${y}`).then((response) => {
        setoelist(response.data);
    })
  }, [y])
  var id = 0
  function rowSelect(event) {
    id = event;
    console.log(id)
  }
  const navigate = useNavigate();
  const handleProceed = (e) => {
    if (id == 0){
        alert("Select a row to pay.")
      }
      else {
        id && navigate(generatePath("/otherexpensespayment/:id", { id }));
      }
  };
  const handleChange = (e) => {
    navigate('/otherexpensesadd', { replace: true });
  }
  const handlePaid = (e) => {
    navigate('/otherexpensespaid', { replace: true });
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
  });
  const handleProceedHome = (e) => {
    navigate(generatePath("/home"));
    window.location.reload();
  };
  const [searchinput, setsearchinput] = useState("");
  return (
    <div className='App'>
        <div class="headform">
        <h1 class="titleheadform">Pending Other Expenses</h1>
        <main class="container-fluid">
        <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceedHome}>Back</button>
      <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleChange}>Add New Other Expense</button>
      <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceed}>Pay Pending Other Expense</button>
      <button type="button" class="btn btn-outline-info secondarybutton" onClick={handlePaid}>View Paid Other Expenses</button>
      <form class="d-flex">
            <input class="form-control me-sm-2" type="text" placeholder="Search ID or Type" onChange={(e) =>{setsearchinput(e.target.value)}}/>
          </form>
            <div class="tablediv">
            <table class="table table-hover">
                <thead>
                    <tr>
                      <th scope="col">Other Expenses ID</th>
                      <th scope="col">Other Expenses Type</th>
                      <th scope="col">Total Amount</th>
                      <th scope="col">Period</th>
                      <th scope="col">Due Date</th>
                      <th scope="col">Barcode/Receipt No.</th>
                    </tr>
                  </thead>
                      <tbody>
                        {oelist.filter((val)=>{
                        if(searchinput == ""){
                          return val
                        }
                        else if(val.otherexpensesname.toLowerCase().includes(searchinput.toLowerCase())){
                          return val
                        }
                        else if(val.other_expenses_id == searchinput){
                          return val
                        }
                      }).map((val)=> {
                          var cdate1 = (new Date(val.period_from)).toLocaleDateString();
                          var cdate2 = (new Date(val.period_to)).toLocaleDateString();
                          var cdate3 = (new Date(val.due_date)).toLocaleDateString();
                          return(
                            <tr class="table-active tractive" onClick={rowSelect.bind(this, val.other_expenses_id)}>
                            <td scope="row">{val.other_expenses_id}</td>
                            <td scope="row">{val.otherexpensesname}</td>
                            <td scope="row">{formatter.format(val.total_amount)}</td>
                            <td scope="row">{cdate1} - {cdate2}</td>
                            <td scope="row">{cdate3}</td>
                            <td scope="row">{val.barcode_or_receipt}</td>
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
export default Otherexpenseslist;
