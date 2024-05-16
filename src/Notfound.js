import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function Notfound() {
  return (
    <div className="App">
      <div class="headform">
      <h1>Error: Not Found</h1>
      </div>
      <Link to="/home"><button type="button" class="btn btn-outline-dark backbutton">Back to Home</button></Link>
    </div>
  );
}

export default Notfound;
