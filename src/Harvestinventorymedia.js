import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';


function Harvestinventorymedia() {
    const { harvest_id } = useParams();
    const x = harvest_id
    const [harvestlist, setharvestlist] = useState([]);
    useEffect(() =>{
      Axios.get(`http://localhost:3001/harvestinventoryonsalebatchesinfo/${x}`).then((response) => {
        setharvestlist(response.data);
      })
    }, [x])
    return(
        <div className="App">
            <div>
            <div class="headform">
            <h1 class="titleheadform">Image Harvest {x}</h1>
            </div>
            <main class="container-fluid">
            <Link to="/harvestcalendarreadyforsale"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
                    {harvestlist.map((val)=> {
                        return(
                            <div>
                            <p><h4><b>Plant Batch Image:</b></h4></p>
                            <img class="viewimage" alt="plant image" src={`data:image/jpeg;base64,${val.batch_img}`}></img>
                            </div>
                        )
                    })}
            </main>

        </div>
        </div>
    )
}

export default Harvestinventorymedia;