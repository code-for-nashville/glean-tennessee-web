import React from 'react'
import Link from '../link'
import './styles.css'
import icon from '../../static/icon.png'

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
        <Link
          className="nav-item nav-link active"
          href="/login"
          title={'Log In'}
        />
        <Link className="nav-item nav-link" href="/signup" title={'Register'} />
        <Link
          className="nav-item nav-link"
          href="/dashboard"
          title={'Gleaning Request'}
        />
        <Link
          className="nav-item nav-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://endhunger.org/"
          title={'Society of St. Andrew'}
        />
      </div>
    </div>
  </nav>
)

export default Navigation
