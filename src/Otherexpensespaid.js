import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath, useParams } from 'react-router-dom';
import Axios from 'axios';


function Otherexpensespaid() {
  const y = "Paid"
  const [oelist, setoelist] = useState([])
  useEffect(() =>{
    Axios.get(`http://localhost:3001/otherexpensespaid/${y}`).then((response) => {
        setoelist(response.data);
    })
  }, [y])
  const navigate = useNavigate();
  const handleChange = (e) => {
    navigate('/otherexpensesadd', { replace: true });
  }
  const handlePending = (e) => {
    navigate('/otherexpenseslist', { replace: true });
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
  });
  const [searchinput, setsearchinput] = useState("");
  return (
    <div className='App'>
        <div class="headform">
        <h1 class="titleheadform">Paid Other Expenses</h1>
        <main class="container-fluid">
      <Link to="/otherexpenseslist"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
      <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleChange}>Add New Other Expense</button>
      <button type="button" class="btn btn-outline-info secondarybutton" onClick={handlePending}>View Pending Other Expenses</button>
      <form class="d-flex">
            <input class="form-control me-sm-2" type="text" placeholder="Search ID, Type, Employee, or Paid to" onChange={(e) =>{setsearchinput(e.target.value)}}/>
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
                      <th scope="col">Managed by</th>
                      <th scope="col">Paid To</th>
                      <th scope="col">Amount Paid</th>
                      <th scope="col">Date Paid</th>
                      <th scope="col">Payment Method</th>
                      <th scope="col">Account ID</th>
                      <th scope="col">Account Name</th>
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
                        else if(val.emp_name.toLowerCase().includes(searchinput.toLowerCase())){
                          return val
                        }
                        else if(val.paid_to.toLowerCase().includes(searchinput.toLowerCase())){
                          return val
                        }
                        else if(val.other_expenses_id == searchinput){
                          return val
                        }
                      }).map((val)=> {
                          var cdate1 = (new Date(val.period_from)).toLocaleDateString();
                          var cdate2 = (new Date(val.period_to)).toLocaleDateString();
                          var cdate3 = (new Date(val.due_date)).toLocaleDateString();
                          var cdate4 = (new Date(val.date_paid)).toLocaleDateString();
                          return(
                            <tr class="table-active tractive">
                            <td scope="row">{val.other_expenses_id}</td>
                            <td scope="row">{val.otherexpensesname}</td>
                            <td scope="row">{formatter.format(val.total_amount)}</td>
                            <td scope="row">{cdate1} - {cdate2}</td>
                            <td scope="row">{cdate3}</td>
                            <td scope="row">{val.barcode_or_receipt}</td>
                            <td scope="row">{val.emp_name}</td>
                            <td scope="row">{val.paid_to}</td>
                            <td scope="row">{formatter.format(val.total_payment)}</td>
                            <td scope="row">{cdate4}</td>
                            <td scope="row">{val.payment_method}</td>
                            <td scope="row">{val.account_id}</td>
                            <td scope="row">{val.account_name}</td>
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
export default Otherexpensespaid;
