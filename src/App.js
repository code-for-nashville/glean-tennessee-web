import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation.js'
import Login from"./components/login/Login"
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Login/>
      </div>
    );
  }
}

export default App;
