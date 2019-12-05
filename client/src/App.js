import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import './App.css';

function App() {
  // Setting state with the user details retrieved using googles Oauth
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  const responseGoogle = (response) => {
    setUserName(response.profileObj.givenName)
    setUserName(response.profileObj.googleId)
    console.log(response);
  }

  return (
    <div className="App">
      <h1>Welcome to Saturday Donut League</h1>
      <h3>please login with your google account</h3>
      <GoogleLogin
        clientId="801108272625-cbbc8i5j8v8s423p95mkte842cdp7d32.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default App;
