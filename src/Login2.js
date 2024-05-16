import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function Login() {
  const [opencity, setopencity] = useState("Admin")
  const container = [1]
  console.log(opencity)
  
    return (
      <div className="App">
      <div>
      <h1 class="company">Farm ADMIN</h1>
      <h2 class="datsys">Farm Management Information System</h2>
      
        <body class="login_body">
          <center>
            <div class="tab" >
              <button class="tablinks" value="User" onClick={(e) =>{setopencity(e.target.value)}}>User</button>
              <button class="tablinks" value="Admin" onClick={(e) =>{setopencity(e.target.value)}}>Admin</button>
              <div class=" tabcontent">
                <div class="login_box">
                  <form class="" method="POST" >
                    <input type="text" name="username" placeholder="Username" required />
                    <input type="password" name="password" placeholder="Password" required/>
                    <div clas="outer">
                      <div class="inner">
                        <button type="button">Submit</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </center>
        </body>
      </div>
    </div>
    )
  
  
}

export default Login;
