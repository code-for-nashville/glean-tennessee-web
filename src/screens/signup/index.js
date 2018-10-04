import React, {Component} from 'react'

export default class SignUp extends Component {
  state = {}

  onInputChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

  onSubmit = e => {
    e.preventDefault()
    console.log("The submit button was pushed");
    //TODO - link up to firebase stuff
  }

  render() {
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
                  id="up-email"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="up-password">Password</label>
                <input
                  type="password"
                  onChange={this.onInputChange}
                  className="form-control"
                  id="up-password"
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
            <button id="register-btn" type="submit" className="btn btn-default">
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  }
}
