import './App.css';
import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Books from './components/Books/Books';
import Header from './components/Header/Header';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import { Routes, Route } from 'react-router-dom';


class App extends React.Component{
  constructor(){
    super();
    this.state = {
      route: 'home',
      input: '',
      usr_type: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {

  }

  onRouteChange = (route) => {

  }

  render(){
    return (
      <>
       <Routes>
          <Route path="/home" element={
              <div>
                <Navigation />
                <Header />
                <Books />
              </div>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
       </Routes>
    </>
    );
  }
}

export default App;
