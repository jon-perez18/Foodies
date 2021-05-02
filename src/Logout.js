import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = process.env.GOOGLE_ID;

function Logout() {
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Sucessful Logout');
    document.location.href = '/';
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Logout;
