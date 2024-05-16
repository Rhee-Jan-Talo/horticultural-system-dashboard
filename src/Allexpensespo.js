import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Allexpensespo() {
    const [polist, setpolist] = useState([])
    useEffect(() =>{
      Axios.get(`http://localhost:3001/purchaseorderexpenses`).then((response) => {
        setpolist(response.data);
      })
    }, [])
    const navigate = useNavigate();
    const handleChange = (e) => {
      navigate('/allexpensesoe', { replace: true });
    }
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
    });
    const handleProceedHome = (e) => {
      navigate(generatePath("/home"));
      window.location.reload();
    };
    const myComponentStyle = {
      width: '50%'
   }
    const [searchinput, setsearchinput] = useState("");
    return (
      <div className='App'>
          <div class="headform">
          <h1 class="titleheadform">Purchase Orders Expenses</h1>
          <main class="container-fluid">
          <button type="button" class="btn btn-outline-dark backbutton" onClick={handleProceedHome}>Back</button>
        <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleChange}>View Paid Other Expenses</button>
        <br></br>
        <form class="d-flex" style={{width : '30%', float: 'left', margin: '20px'}}>
            <input class="form-control me-sm-2" type="text" placeholder="Search ID, Name, or Month" onChange={(e) =>{setsearchinput(e.target.value)}}/>
          </form>
              <div class="tablediv">
              <table class="table table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Payment PO ID</th>
                        <th scope="col">Supplier</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date Paid</th>
                      </tr>
                    </thead>
                        <tbody>
                          {polist.filter((val)=>{
                        let cdate2 = new Date(val.date_paid).toLocaleString('en-us',{month:'long'})
                        if(searchinput == ""){
                          return val
                        }
                        else if(val.company_name.toLowerCase().includes(searchinput.toLowerCase())){
                          return val
                        }
                        else if(val.payment_po_id == searchinput){
                          return val
                        }
                        else if(new Date(val.date_paid).toLocaleString('en-us',{month:'long'}).toLowerCase() == searchinput.toLowerCase()){
                          return val
                        }
                      }).map((val)=> {
                            var cdate1 = (new Date(val.date_paid)).toLocaleDateString();
                            var cdate2 = new Date(val.date_paid).toLocaleString('en-us',{month:'long'})
                            console.log(cdate2)
                            return(
                              <tr class="table-active tractive">
                              <td scope="row">{val.payment_po_id}</td>
                              <td scope="row">{val.company_name}</td>
                              <td scope="row">{formatter.format(val.dp_amount)}</td>
                              <td scope="row">{cdate1}</td>
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

export default Allexpensespo;


