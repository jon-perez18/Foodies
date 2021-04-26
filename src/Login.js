/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import refreshTokenSetup from './refreshToken';

require('dotenv').config();

const clientId = '635379765141-ki5q6ah4lejdjrqdleksr7eof9acq2vp.apps.googleusercontent.com';

export function Login(props) {
  const { socket } = props;

  const [usernames, setusernames] = useState([]); // eslint-disable-line no-unused-vars
  const [emails, setemails] = useState([]); // eslint-disable-line no-unused-vars
  const [user, setUser] = useState(null); // eslint-disable-line no-unused-vars

  function onLogin(res) {
    const username = `${res.profileObj.name}`;
    setusernames((prevusernames) => [...prevusernames, username]);
    const email = `${res.profileObj.email}`;
    setemails((prevemails) => [...prevemails, email]);
    socket.emit('login', { username }, { email });
  }

  const onSuccess = (res) => {
    //     console.log('Login Success: currentUser:', res.profileObj);
    alert(`Successful Login ${res.profileObj.name}. \n`); // eslint-disable-line no-alert

    refreshTokenSetup(res);
    onLogin(res);
    document.location.href = '/search';
  };

  useEffect(() => {
    socket.on('login', (data_name, data_email) => {
      // console.log('Login event received!');
      // console.log(dataName);
      // console.log(dataEmail);
      setUser(() => data_name);
      setusernames((prevusernames) => [...prevusernames, data_name.username]);
      setemails((prevemails) => [...prevemails, data_email.email]);
    });
  }, []);

  const onFailure = (res) => { // eslint-disable-line no-unused-vars
    // console.log('Login failed: res:', res);
    alert('Failed to login.'); // eslint-disable-line no-alert
  };

  return (
    <div>
      <div className="login" id="hide">
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy="single_host_origin"
          style={{ marginTop: '100px' }}
          isSignedIn
        />
      </div>
    </div>
  );
}

Login.propTypes = {
  socket: PropTypes.instanceOf(Object).isRequired,
};

export default Login;
