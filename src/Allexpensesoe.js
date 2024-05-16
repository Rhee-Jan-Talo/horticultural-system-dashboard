import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Allexpensesoe() {
    const y = "Paid"
    const [oelist, setoelist] = useState([])
    useEffect(() =>{
      Axios.get(`http://localhost:3001/otherexpensespaid/${y}`).then((response) => {
          setoelist(response.data);
      })
    }, [y])
    const navigate = useNavigate();
    const handleChange = (e) => {
      navigate('/allexpensespo', { replace: true });
    }
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
    });
    const [searchinput, setsearchinput] = useState("");
    return (
      <div className='App'>
          <div class="headform">
          <h1 class="titleheadform">Other Expenses</h1>
          <main class="container-fluid">
        <Link to="/allexpensespo"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
        <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleChange}>View Purchase Order Expenses</button>
        <br></br>
        <form class="d-flex" style={{width : '30%', float: 'left', margin: '20px'}}>
            <input class="form-control me-sm-2" type="text" placeholder="Search ID, Type, Paid to, or Month" onChange={(e) =>{setsearchinput(e.target.value)}}/>
          </form>
              <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Other Expenses ID</th>
                        <th scope="col">Other Expenses Type</th>
                        <th scope="col">Paid to</th>
                        <th scope="col">Barcode/Receipt No.</th>
                        <th scope="col">Date Paid</th>
                        <th scope="col">Amount Paid</th>
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
                        else if(val.paid_to.toLowerCase().includes(searchinput.toLowerCase())){
                          return val
                        }
                        else if(val.other_expenses_id == searchinput){
                          return val
                        }
                        else if(new Date(val.date_paid).toLocaleString('en-us',{month:'long'}).toLowerCase() == searchinput.toLowerCase()){
                          return val
                        }
                      }).map((val)=> {
                            var cdate1 = (new Date(val.date_paid)).toLocaleDateString();
                            return(
                              <tr class="table-active tractive">
                              <td scope="row">{val.other_expenses_id}</td>
                              <td scope="row">{val.otherexpensesname}</td>
                              <td scope="row">{val.paid_to}</td>
                              <td scope="row">{val.barcode_or_receipt}</td>
                              <td scope="row">{cdate1}</td>
                              <td scope="row">{formatter.format(val.total_payment)}</td>
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

export default Allexpensesoe;


