import React, {Component} from 'react'
import './App.css'
import {Footer, Navigation, Toast} from './components'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Toast />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default App
