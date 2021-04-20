import React, { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from './refreshToken';

require('dotenv').config();
const client_id=process.env.REACT_APP_GOOGLE_ID;

export function Login(props) {
  const { socket } = props;
  const [usernames, setusernames] = useState([]);
  const [emails, setemails] = useState([]);
  const [user, setUser] = useState(null);

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(`Successful Login ${res.profileObj.name}. \n`);
    
    refreshTokenSetup(res);
    onLogin(res);
    document.location.href = '/view'
  };

  function onLogin(res) {
    const username = `${res.profileObj.name}`;
    setusernames((prevusernames) => [...prevusernames, username]);
    const email = `${res.profileObj.email}`;
    setemails((prevemails) => [...prevemails, email]);
    socket.emit("login", { username: username }, { email: email });
  }

  useEffect(() => {
    socket.on("login", (data_name, data_email) => {
      console.log("Login event received!");
      console.log(data_name);
      console.log(data_email);
      setUser(() => data_name);
      setusernames((prevusernames) => [...prevusernames, data_name.username]);
      setemails((prevemails) => [...prevemails, data_email.email]);
    });
  }, []);

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(`Failed to login.`);
  };

  return (
    <div>
      <div className="login" id="hide">
      <GoogleLogin
        clientId={client_id}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
      </div>
    </div>
  );
}

Login.propTypes = {
    socket: PropTypes.object.isRequired,
};

export default Login;
