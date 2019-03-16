import React, {Component} from 'react'
import './App.css'
import {Navigation, Toast} from './components'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Toast />
        {this.props.children}
      </div>
    )
  }
}

export default App
