import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import refreshTokenSetup from './refreshToken';

require('dotenv').config();

const clientId = process.env.REACT_APP_GOOGLE_ID;
export function Login(props) {
  const { socket, setUser, history } = props;
  const [usernames, setusernames] = useState([]); // eslint-disable-line no-unused-vars
  const [emails, setemails] = useState([]); // eslint-disable-line no-unused-vars
  function onLogin(res) {
    const username = `${res.profileObj.name}`;
    setusernames((prevusernames) => [...prevusernames, username]);
    const email = `${res.profileObj.email}`;
    setemails((prevemails) => [...prevemails, email]);
    // console.log(usernames, emails);
    socket.emit('login', { username }, { email });
  }

  const onSuccess = (res) => {
    //     console.log('Login Success: currentUser:', res.profileObj);
    alert(`Successful Login ${res.profileObj.name}. \n`); // eslint-disable-line no-alert

    refreshTokenSetup(res);
    onLogin(res);
    setUser(() => res.profileObj.name);
    console.log(history);
    // document.location.href = '/search';
  };

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
  setUser: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Login;
