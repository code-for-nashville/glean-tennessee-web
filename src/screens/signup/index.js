import React, {Component} from 'react'
import api from '../../helpers'
import history from '../../navigation/history'
import {ProfileForm} from '../../components'

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signupError: null
    }
  }

  submitForm = async (data, password) => {
    const [response, signupError] = await api.signup(data, password)
    if (signupError) {
      this.setState({signupError})
    } else if (response) {
      history.push('/dashboard')
    }
  }

  render() {
    const {signupError} = this.state
    return (
      <div className="container">
        <div className="row">
          <div className="col-md">
            <div className="well">
              <h2>Register as a new user</h2>
              <h5>
                This is the information SoSA will use to get in touch with you.
              </h5>
              <ProfileForm
                submitText="Submit"
                onSubmit={this.submitForm}
                formError={signupError}
                showPassword
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
