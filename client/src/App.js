import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import './App.css';
import axios from 'axios';

function App() {
  // Setting state with the user details retrieved using googles Oauth
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const responseGoogle = (response) => {
    setUserName(response.profileObj.givenName)
    setUserId(response.profileObj.googleId)
    setUserEmail(response.profileObj.email)
      axios.post('/user/signup', {
        name: response.profileObj.name, 
        email: response.profileObj.email, 
      }).then(res => {
        console.log(`recieved: ${res}`)
      })
    console.log(response);
  }

  var usersName;
  if (userName) {
    usersName = (
    <h3>Welcome {userName}</h3>
    )
  } else {
    usersName = (
      <h3>please login with your google account</h3>
    )
  }

  return (
    <div className="App">
      <h1>Welcome to Saturday Donut League</h1>
      {usersName}
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
