import './App.css';
import React, { useEffect, useState } from 'react';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import Home from './components/HomeComponent/Home';


function App(){

  const [route,setRoute] = useState('/');
  const [user,setUser] = useState({
    username: '',
    password:'',
    first_name: '',
    last_name: '',
    birthday: '',
    role: '',
    school: ''
  })

  

  const onRouteChange = (route) => {
    setRoute(route);
  }


  const loadUser = (user) => {
    setUser(user);
  }

  return (
    <div className='App'>
      {route === 'register'
      ? <Register onRouteChange={onRouteChange}/>
      : (route === 'home' 
        ? <Home user={user} />
        : <SignIn onRouteChange={onRouteChange} loadUser={loadUser}/>
      )
      }
    </div>
  );
}

export default App;
