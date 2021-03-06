import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import './App.css';
import { GoogleLogin } from 'react-google-login';
import refreshTokenSetup from './refreshToken';
import logo from './Logo.PNG';
import Logout from './Logout';

require('dotenv').config();

const client_id = process.env.REACT_APP_GOOGLE_ID; // eslint-disable-line camelcase

export function check_login(check) { // eslint-disable-line camelcase
  if (check) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('logout').style.display = 'block';
    document.getElementById('navbar').style.display = 'block';
  }
}

export function Login(props) {
  const { socket, setUser } = props;
  const [usernames, setusernames] = useState([]); // eslint-disable-line no-unused-vars
  const [emails, setemails] = useState([]); // eslint-disable-line no-unused-vars
  const [imgUrl, setUrl] = useState(null); // eslint-disable-line no-unused-vars
  function onLogin(res) {
    const username = `${res.profileObj.name}`;
    setusernames((prevusernames) => [...prevusernames, username]);
    const email = `${res.profileObj.email}`;
    setemails((prevemails) => [...prevemails, email]);
    // console.log(usernames, emails);
    socket.emit('login', { username }, { email });
  }

  const onSuccess = (res) => {
    // console.log('Login Success: currentUser:', res.profileObj);
    alert(`Successful Login ${res.profileObj.name}. \n`); // eslint-disable-line no-alert

    check_login(`${res.isSignedIn}`);
    refreshTokenSetup(res);
    onLogin(res);
    setUser(() => res.profileObj.name);
    // console.log(history);
    // document.location.href = '/search';
  };

  const onFailure = (res) => { // eslint-disable-line no-unused-vars
    // console.log('Login failed: res:', res);
    alert('Failed to login.'); // eslint-disable-line no-alert
  };

  return (
    <div className="background">
      <div className="loginPage">
        <div className="heading">

          <img id="logo" src={logo} alt="App logo" />

        &ensp; Foodies

          <div id="login">
            <GoogleLogin
              id="login"
              clientId={client_id} // eslint-disable-line camelcase
              buttonText="Login"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy="single_host_origin"
              style={{ marginTop: '100px' }}
              isSignedIn
            />
          </div>
          <div id="logout">
            <Logout />
          </div>
        </div>
      </div>
      <div className="launchPage">
        <h1>
          Meet Up and Eat Up!
        </h1>
      </div>
      <div className="launchInfo">
        <p>Host And Join Group Gatherings In Your Area </p>
        <p>Meet New People And Enjoy New Food</p>
      </div>
      <div className="ourMission">
        <p />
        <p>&ensp;</p>
        <h2>Our Mission</h2>
        <p />
        <p>&ensp;</p>
        <p>In a technologically influenced world, it&apos;sworthwhile to make real-connections.</p>
        <p>Meet new people in neutral settings and enjoy the atmosphere the world has to offer.</p>
        <p>Our app is powered by Google and Yelp to make your experience as smooth as possible.</p>
        <p>Join us today and experience life.</p>
        <p />
        <p>&ensp;</p>
        <p>
          Find out more about our app on&nbsp;
          <a href="https://github.com/jon-perez18/Foodies">GitHub</a>
          <p>&ensp;</p>
        </p>
        <p />
      </div>
      <div className="creatorInfo">
        <p>Contributors: Anuja Badeti, Jonathan Perez, Kelly Hopkins, Ashutosh Rana</p>
      </div>
    </div>
  );
}

Login.propTypes = {
  socket: PropTypes.instanceOf(Object).isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Login;
