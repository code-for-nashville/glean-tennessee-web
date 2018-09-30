import React, {Component} from 'react'
import './styles.css'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  onInputChange = e => {
    const {value, name} = e.target
    this.setState({[name]: value})
  }

  render() {
    return (
      <div className="container sign-in-body">
        <div className="row center-me">
          <div className="sign-in-box">
            <h2>Sign In to Get Started</h2>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="in-email"
                placeholder="Email"
                onChange={this.onInputChange}
              />
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
            <button
              id="login-btn"
              type="submit"
              className="btn btn-default btn-sub"
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
