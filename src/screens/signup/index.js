import React, {Component} from 'react'
import {signup} from '../../helpers'
import history from '../../navigation/history'
import Strings, { Regex } from '../../constants'
export default class SignUp extends Component {
  state = {
    name: '',
    street: '',
    zip: '',
    phone: '',
    email: '',
    password: '',
    emailError: null,
    signupError: null,
  }

  onInputChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

  validateEmail = () => {
    const {email} = this.state
    const emailError = !Regex.testEmail(email) ? 'Enter a valid email address' : ''
    this.setState({emailError})
  }

  onSubmit = async () => {
    const data = {
      ...this.state
    }
    const [response, signupError] = await signup(data)
    if (signupError) {
      this.setState({signupError})
    } else if (response) {
      history.push('/dashboard')
    }
  }

  render() {
    const { emailError, signupError } = this.state
    const errorDiv = emailError ? (
      <div id="emailError">{emailError}</div>
    ) : null
    const signupErrorDiv = signupError ? (
      <div id="emailError">{Strings.firebaseErrorMessage(signupError)}</div>
    ) : null
    return (
      <div className="row">
        <div className="col-md">
          <div className="well">
            <h2>Register as a new user</h2>
            <h5>
              This is the information SoSA will use to get in touch with you.
            </h5>
            <form id="registrationForm" onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  onChange={this.onInputChange}
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="up-email">Email address</label>
                <input
                  onChange={this.onInputChange}
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  onBlur={this.validateEmail}
                />
                {errorDiv}
              </div>
              <div className="form-group">
                <label htmlFor="up-password">Password</label>
                <input
                  type="password"
                  onChange={this.onInputChange}
                  className="form-control"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone number</label>
                <input
                  type="tel"
                  className="form-control"
                  onChange={this.onInputChange}
                  id="phone"
                  placeholder="(615) 555-5555"
                />
              </div>
              <div className="form-group">
                <label htmlFor="street">Street Address</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.onInputChange}
                  id="street"
                  placeholder="123 Main Street"
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.onInputChange}
                  id="city"
                  placeholder="Nashville"
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.onInputChange}
                  id="state"
                  placeholder="Tennessee"
                />
              </div>
              <div className="form-group">
                <label htmlFor="zip">Zip Code</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={this.onInputChange}
                  id="zip"
                  placeholder="37211"
                />
              </div>
            </form>
            {signupErrorDiv}
            <button
              id="register-btn"
              type="submit"
              className="btn btn-default"
              onClick={this.onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  }
}
