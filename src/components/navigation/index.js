import React from 'react'

import './styles.css'
import icon from '../../static/icon.png'
import { logout } from '../../helpers'

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
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse">
      <div className="navbar-nav">
        <a className="nav-item nav-link active" href="/login">
          Log In
        </a>
        <a className="nav-item nav-link" href="/signup">
          Register
        </a>
        <a className="nav-item nav-link" href="/dashboard">
          Gleaning Request
        </a>
        <a
          className="nav-item nav-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://endhunger.org/"
        >
          Society of St. Andrew
        </a>
        <a className="nav-item nav-link active" onClick={logout}>
          Log Out
        </a>
      </div>
    </div>
  </nav>
)

export default Navigation
