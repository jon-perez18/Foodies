import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from './refreshToken';

const socket = io();
const clientId = process.env.GOOGLE_ID;


export function Login() {
  const [usernames, setusernames] = useState([]);
  const [emails, setemails] = useState([]);
  
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Successful Login ${res.profileObj.name}. \n`
    );
    refreshTokenSetup(res);
    document.getElementById("hide").style.visibility = "hidden";
    
    onLogin(res)
  };
  
  function onLogin(res) {
    const username = `${res.profileObj.name}`;
    setusernames((prevusernames) => [...prevusernames, username]);
    const email = `${res.profileObj.email}`;
    setemails((prevemails) => [...prevemails, email]);
    socket.emit("login", { username: username }, {email: email});
  }
  
  useEffect(() => {
    socket.on("login", (data_name, data_email) => {
      console.log("Login event received!");
      console.log(data_name);
      console.log(data_email);
      setusernames((prevusernames) => [...prevusernames, data_name.username]);
      setemails((prevemails) => [...prevemails, data_email.email]);
    });
  }, []);
  
  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login.`
    );
  };


  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;