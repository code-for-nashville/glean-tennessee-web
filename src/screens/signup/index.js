import React, {Component} from 'react'

export default class SignUp extends Component {
  render() {
    return (
      <div class="row">
        <div class="col-md">
          <div class="well">
            <h2>Let's Register</h2>
            <h5>
              This is the information SoSA will use to get in touch with you.
            </h5>
            <form id="registrationForm">
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Name"
                />
              </div>
              <div class="form-group">
                <label for="up-email">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="up-email"
                  placeholder="Email"
                />
              </div>
              <div class="form-group">
                <label for="up-password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="up-password"
                  placeholder="Password"
                />
              </div>
              <div class="form-group">
                <label for="phone">Phone number</label>
                <input
                  type="tel"
                  class="form-control"
                  id="phone"
                  placeholder="(615) 555-5555"
                />
              </div>
              <div class="form-group">
                <label for="street">Street Address</label>
                <input
                  type="text"
                  class="form-control"
                  id="street"
                  placeholder="123 Main Street"
                />
              </div>
              <div class="form-group">
                <label for="city">City</label>
                <input
                  type="text"
                  class="form-control"
                  id="city"
                  placeholder="Nashville"
                />
              </div>
              <div class="form-group">
                <label for="state">State</label>
                <input
                  type="text"
                  class="form-control"
                  id="state"
                  placeholder="Tennessee"
                />
              </div>
              <div class="form-group">
                <label for="zip">Zip Code</label>
                <input
                  type="number"
                  class="form-control"
                  id="zip"
                  placeholder="37211"
                />
              </div>
            </form>
            <button id="register-btn" type="" class="btn btn-default">
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  }
}
