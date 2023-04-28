import './App.css';
import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Books from './components/Books/Books';
import Header from './components/Header/Header';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';

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
      <div className="App">
        {this.state.route === 'home' 
        ? <div>
            <Navigation />
            <Header />
            <Books />
          </div>
        : (this.state.route === 'signin' 
          ? <SignIn />
          : <Register />
        )        
    }
      </div>
    );
  }
}

export default App;
