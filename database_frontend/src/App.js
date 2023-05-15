import './App.css';
import React, {  useEffect, useState } from 'react';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import Home from './components/HomeComponent/Home';


function App(){

  const [route,setRoute] = useState('signin');
  const [user,setUser] = useState({});
  const [isSignedIn,setIsSignedIn] = useState(false);
  
  useEffect(()=>{
    
    if(window.localStorage.getItem("isSignedIn") === null){
    }
    else{
      loadUser(JSON.parse(window.localStorage.getItem("user")),"home");
    }
  },[])

  const onRouteChange = (route) => {
    if(isSignedIn){
      setRoute(JSON.parse(window.localStorage.getItem("route")));
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
      setRoute(JSON.parse(window.localStorage.getItem("route")));
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
        : <SignIn onRouteChange={onRouteChange} loadUser={loadUser}/>
      )
      }
    </div>
  );
}

export default App;
