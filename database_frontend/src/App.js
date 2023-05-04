import './App.css';
import React, { useEffect, useState } from 'react';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import Home from './components/HomeComponent/Home';


function App(){

  const [route,setRoute] = useState('home');
  const [user,setUser] = useState({
    username: 'kostas',
    password:'',
    first_name: 'kostas',
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
        ? <Home user={user} onRouteChange={onRouteChange} />
        : <SignIn onRouteChange={onRouteChange} loadUser={loadUser}/>
      )
      }
    </div>
  );
}

export default App;
