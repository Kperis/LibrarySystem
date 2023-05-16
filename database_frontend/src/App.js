import './App.css';
import React, {  useEffect, useState } from 'react';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import Home from './components/HomeComponent/Home';
import Main_Admin from './components/Main_Admin/Main_Admin';


function App(){

  const [route,setRoute] = useState('signin');
  const [user,setUser] = useState({});
  const [isSignedIn,setIsSignedIn] = useState(false);
  
  useEffect(()=>{
    
    if(window.localStorage.getItem("isSignedIn") === null){
      setRoute('signin');
    }
    else{
      setUser(JSON.parse(window.localStorage.getItem('user')));
      setRoute(window.localStorage.getItem('route'));
    }
  },[isSignedIn])

  const onRouteChange = (route) => {
    if(isSignedIn){
      setRoute(window.localStorage.getItem("route"));
    }
    else{
      setRoute(route);
      window.localStorage.setItem("route",route);
    }
    
  }

  const onSignout = ()=>{
    setIsSignedIn(false);
  }

  const loadUser = (user,route) => {
    if(isSignedIn){
      setUser(JSON.parse(window.localStorage.getItem("user")));
      setRoute(window.localStorage.getItem("route"));
    }
    else{
      setUser(user);
      onRouteChange(route);
      window.localStorage.setItem("user",JSON.stringify(user));
      setIsSignedIn(true);
      window.localStorage.setItem("isSignedIn",true);
    }
    
  }

  return (
    <div className='App'>
      {route === 'register'
      ? <Register onRouteChange={onRouteChange}/>
      : (route === 'home' 
        ? <Home user={user} onRouteChange={onRouteChange} onSignout={onSignout}/>
        : (route === 'Main_Admin'
            ? <Main_Admin onRouteChange={onRouteChange} user={user} onSignout={onSignout} />
            : <SignIn onRouteChange={onRouteChange} loadUser={loadUser}/>
          )
      )
      }
    </div>
  );
}

export default App;
