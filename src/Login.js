import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import { GoogleLogin } from 'react-google-login';
import refreshTokenSetup from './refreshToken';
import logo from './Logo.PNG';

require('dotenv').config();

const client_id = process.env.REACT_APP_GOOGLE_ID;

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
    document.location.href = '/search'
  };

  function onLogin(res) {
    const username = `${res.profileObj.name}`;
    setusernames((prevusernames) => [...prevusernames, username]);
    const email = `${res.profileObj.email}`;
    setemails((prevemails) => [...prevemails, email]);
    socket.emit('login', { username }, { email });
  }

  useEffect(() => {
    socket.on('login', (dataName, dataEmail) => {
      // console.log('Login event received!');
      // console.log(dataName);
      // console.log(dataEmail);
      setUser(() => dataName);
      setusernames((prevusernames) => [...prevusernames, dataName.username]);
      setemails((prevemails) => [...prevemails, dataEmail.email]);
    });
  }, []);

  const onFailure = (res) => { // eslint-disable-line no-unused-vars
    // console.log('Login failed: res:', res);
    alert('Failed to login.'); // eslint-disable-line no-alert
  };

  return (
    <html>
      
      <div className="loginPage">
        <div className = "heading">
        
        <img id='logo' src={logo} alt="location picture" />
        
        &ensp; Foodies
        
          <div id = 'login'>
            <GoogleLogin id='login'
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
      </div>
      <div className='launchPage'>
        <h1>Meet Up and Eat Up!
        </h1>
      </div>
      <div className="launchInfo">
        <p>Host And Join Group Gatherings In Your Area </p>
        <p>Meet New People And Enjoy New Food</p>
      </div>
      <div className = "ourMission">
        <p></p>
        <h2>Our Mission</h2>
        <p></p>
        <p>In a technologically influenced world, it's worthwhile to make real-connections.</p>
        <p>Meet new people in neutral settings and enjoy the atmosphere the world has to offer.</p>
        <p>Our app is powered by Google and Yelp to make your experience as smooth as possible.</p>
        <p>Join us today and experience life.</p>
        <p></p>
      </div>
      <div className = "creatorInfo">
        <p>Contributors: Anuja Badeti, Jonathan Perex, Kelly Hopkins, Aushutosh</p>
      </div>
  
    </html>
  );
}

Login.propTypes = {
  socket: PropTypes.instanceOf(Object).isRequired,
};

export default Login;
