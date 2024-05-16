import React, {useEffect, useState} from 'react';
import './App.css';
import { Link, useNavigate, generatePath, useParams } from 'react-router-dom';
import Axios from 'axios';

function Plantprofilesview() {
  const { plantprofileid } = useParams();
  const x = plantprofileid
  const navigate = useNavigate();
  const [atypeinfo, setatypeinfo] = useState("");
  const [isLoading, setLoading] = useState(true);
  Axios.get(`http://localhost:3001/atype`).then((response) => {
    setatypeinfo(response.data);
        setLoading(false);
      })
  console.log("type", atypeinfo)
  const handleProceed = (e) => {
    x && navigate(generatePath("/plantprofilesedit/:x", { x }));
  };
  const handleProceedImage = (e) => {
    x && navigate(generatePath("/plantprofilespicedit/:x", { x }));
  };
  var id = 0;
  function rowSelect(event) {
    id = event;
    console.log(id)
  }
  const handleProceedDiseaseEdit = (e) => {
    if (id == 0){
      alert("Select a disease to edit.")
    }
    else {
      id && navigate(generatePath("/plantprofilesdiseaseedit/:id", { id }));
    }
  };
  const handleProceedDiseaseAdd = (e) => {
    x && navigate(generatePath("/plantprofilesdiseaseadd/:x", { x }));
  };
  const [plantprofilelist, setPlantprofilelist] = useState([]);
  useEffect(() =>{
    Axios.get(`http://localhost:3001/plantprofilesview/${x}`).then((response) => {
      setPlantprofilelist(response.data);
    })
  }, [x])
  const [plantdiseaselist, setplantdiseaselist] = useState([]);
  useEffect(() =>{
    Axios.get(`http://localhost:3001/plantprofilediseaselist/${x}`).then((response) => {
      setplantdiseaselist(response.data);
    })
  }, [x])
  if (isLoading) {
    return (<div className="App">Loading...</div>)
  }
  if(atypeinfo == "Admin"){
    return (
      <div className='App'>
          {plantprofilelist.map((val)=> {
            return (
              <div>
                <div class="headform">
                 <  h1 class="titleheadform">View {val.plant_name} Profile</h1>
                </div>
                <main class="container-fluid">
                <Link to="/plantprofiles"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
                  <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceed}>Edit Profile</button>
                  <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedImage}>Edit Plant Image</button>
                  <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedDiseaseEdit}>Edit Disease</button>
                  <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleProceedDiseaseAdd}>Add a Disease</button>
                  <br></br>
                  <div class="viewdiv">
                      <p><h3><b>Name: </b>{val.plant_name}</h3></p>
                      <p><h3><b>Category: </b>{val.category}</h3></p>
                      <p><h3><b>Scientific Name: </b>{val.sci_name}</h3></p>
                      <p><h3><b>Variety: </b>{val.variety}</h3></p>
                      <p><h3><b>Estimated # of Months to be Harvested :</b>{val.num_of_mon_to_harvest} Months</h3></p>
                      <p><h3><b>Description: </b>{val.plant_desc}</h3></p>
                      <p><h3><b>Plant Image: </b></h3></p>
                      <img class="viewimage" alt="plant picture" src={`data:image/jpeg;base64,${val.img}`}></img>
                      <br></br>
                      <br></br>
                      <h2>Plant's Possible Diseases</h2>
                      <div class="tablediv">
                        <table class="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">Disease ID</th>
                              <th scope="col">Disease Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {plantdiseaselist.map((valo)=> {
                              return (
                                <tr class="table-active tractive" onClick={rowSelect.bind(this, valo.disease_id)}>
                                <td>{valo.disease_id}</td>
                                <td>{valo.diseases}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                  </div>
                  </main>
              </div>
            )
          })}
        </div>
    );
  }
  else {
    return (
      <div className='App'>
          {plantprofilelist.map((val)=> {
            return (
              <div>
                <div class="headform">
                 <  h1 class="titleheadform">View {val.plant_name} Profile</h1>
                </div>
                <main class="container-fluid">
                <Link to="/plantprofiles"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
                  <br></br>
                  <div class="viewdiv">
                      <p><h3><b>Name: </b>{val.plant_name}</h3></p>
                      <p><h3><b>Category: </b>{val.category}</h3></p>
                      <p><h3><b>Scientific Name: </b>{val.sci_name}</h3></p>
                      <p><h3><b>Variety: </b>{val.variety}</h3></p>
                      <p><h3><b>Estimated # of Months to be Harvested :</b>{val.num_of_mon_to_harvest} Months</h3></p>
                      <p><h3><b>Description: </b>{val.plant_desc}</h3></p>
                      <p><h3><b>Plant Image: </b></h3></p>
                      <img class="viewimage" alt="plant picture" src={`data:image/jpeg;base64,${val.img}`}></img>
                      <br></br>
                      <br></br>
                      <h2>Plant's Possible Diseases</h2>
                      <div class="tablediv">
                        <table class="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">Disease ID</th>
                              <th scope="col">Disease Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {plantdiseaselist.map((valo)=> {
                              return (
                                <tr class="table-active tractive" onClick={rowSelect.bind(this, valo.disease_id)}>
                                <td>{valo.disease_id}</td>
                                <td>{valo.diseases}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                  </div>
                  </main>
              </div>
            )
          })}
        </div>
    );
  }
}

export default Plantprofilesview;
