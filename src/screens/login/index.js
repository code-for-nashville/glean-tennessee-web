import React, {Component} from 'react'
import {login} from '../../helpers'
import history from '../../navigation/history'
import Strings, {Regex} from '../../constants'
import './styles.css'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      emailError: '',
      password: ''
    }
  }

  validateEmail = email => {
    return !Regex.testEmail(email) ? 'Enter a valid email address' : ''
  }

  onInputChange = e => {
    const {value, name} = e.target
    this.setState({[name]: value})
  }

  onSubmit = async () => {
    const {email, password} = this.state
    if (email && password) {
      const [response, loginError] = await login(email, password)
      if (loginError) {
        this.setState({loginError})
      } else if (response) {
        history.push('/dashboard')
      }
    }
  }

  onEmailBlur = () => {
    const {email} = this.state
    const emailError = this.validateEmail(email)
    this.setState({emailError})
  }

  render() {
    const {emailError, loginError} = this.state
    const emailErrorDiv = emailError ? (
      <div id="emailError">{emailError}</div>
    ) : null
    const loginErrorDiv = loginError ? (
      <div id="emailError">{Strings.firebaseErrorMessage(loginError)}</div>
    ) : null
    return (
      <div className="container sign-in-body">
        <div className="row center-me">
          <div className="sign-in-box">
            <h2>Sign In to Get Started</h2>
            <div className="form-group">
              <label htmlFor="email">
                Email address
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="in-email"
                  placeholder="Email"
                  onChange={this.onInputChange}
                  onBlur={this.onEmailBlur}
                />
                {emailErrorDiv}
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="in-password">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="in-password"
                placeholder="Password"
                onChange={this.onInputChange}
              />
            </div>
            {loginErrorDiv}
            <button
              id="login-btn"
              type="submit"
              className="btn btn-default btn-sub"
              onClick={this.onSubmit}
            >
              Sign in
            </button>
            <p className="sign-up-offer">
              First time with the app?
              <span id="sign-up-show" className="fakelink">
                Sign up
              </span>
            </p>
          </div>
          <div className="about-us">
            <p>Thank you for donating to the Society of St. Andrew!</p>
            <p>
              Our volunteers will arrive to glean your produce, and we will
              deliver the food to food banks, churches, pantries, and other
              agencies at no cost to you.
            </p>
            <p>
              Because of your contribution, hungry people will get fresh,
              nutritious food.
            </p>
          </div>
        </div>
      </div>
    )
  }
}
