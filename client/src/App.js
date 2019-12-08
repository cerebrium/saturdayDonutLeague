import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import './App.css';
import axios from 'axios';
import League from './routes/league';
import Formation from './routes/formation';
import Team from './routes/team';
import Logout from './routes/logout';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

function App() {
  // Setting state with the user details retrieved using googles Oauth
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [user, setUser] = useState(null);

  // handles writting data to database and recieving google data
  const responseGoogle = (response) => {
    setUserName(response.profileObj.givenName)
    setUserId(response.profileObj.googleId)
    setUserEmail(response.profileObj.email)
      axios.post('/user/signup', {
        name: response.profileObj.name, 
        email: response.profileObj.email, 
        googleId: response.profileObj.googleId,
        team: {}
      }).then(res => {
        console.log(`data written`)
        setUser(res.data)
        console.log(res.data)
      })
  }

  // conditional rendering of nav bar
  var navbar;
  if (userName) {
    navbar = (
      <>
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/' render={ () => <League user={user} /> } />
        <Route exact path='/formation' render={ () => <Formation user={user} /> } />
        <Route exact path='/team' render={ () => <Team user={user} /> } />
      </>
    )
  } else {
    navbar = (
      <>
      <p> </p>
      </>
    )
  }

  // conditional rendering of name once logged in
  var content;
  if (userName) {
    content = (
      <>
        {navbar}
      </>
    )
  } else {
    content = (
      <div className='App donutPicture'>
        <div>
          <h1>Saturday Donut League: Fantasy Futbol with your Friends</h1>
        </div>
        <div>
          <h3>please login with your google account</h3>
          <GoogleLogin
            clientId="801108272625-cbbc8i5j8v8s423p95mkte842cdp7d32.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    )
  }

  return (
    <Router>
        {content}
    </Router>
  );
}

export default App;
