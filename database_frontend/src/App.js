import './App.css';
import React, { useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import Books from './components/Books/Books';
import Header from './components/Header/Header';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import { Routes, Route } from 'react-router-dom';
import UserInfo from './components/UserInfo/UserInfo';
import Book from './components/Book/Book';


function App(){

  const [route,setRoute] = useState('/');
  const [input,setInput] = useState('');
  const [userid,setUserid] = useState('')
  

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onButtonSubmit = () => {

  }

  const onRouteChange = (route) => {

  }
  return (
    <>
      <Routes>
        <Route path="/home" element={
          <div>
            <Navigation />
            <Header />
            <Books />
          </div>
        } />
         <Route path="/book" element={
          <div>
            <Navigation />
            <Book />
          </div>
        } />
        <Route path='/myProfile' element={
          <div>
            <Navigation />
            <UserInfo />
          </div>
        }/>
        <Route path='/borrowed' element={
          <div>
            <Navigation />
            <Books />
          </div>
        }/>
        <Route path='/requested' element={
          <div>
            <Navigation />
            <Books />
          </div>
        }/>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Register />} />
        </Routes>
    </>
  );
}

export default App;
