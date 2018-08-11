import React from 'react'

import './Navigation.css'
import icon from './icon.png'

const Navigation = () => (
  <nav id="sosa-nav" className="navbar navbar-expand-md navbar-dark">
    <a className="navbar-brand" href="http://endhunger.org/">
      <img className="img-fluid nav-icon" alt="" src={icon} />
    </a>

    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse">
      <div className="navbar-nav">
        <a className="nav-item nav-link active">Log In</a>
        <a className="nav-item nav-link">Register</a>
        <a className="nav-item nav-link">Gleaning Request</a>
        <a
          className="nav-item nav-link"
          target="_blank"
          rel="noopener noreferrer"
          href="http://endhunger.org/">Society of St. Andrew</a>
      </div>
    </div>
  </nav>
)

export default Navigation
