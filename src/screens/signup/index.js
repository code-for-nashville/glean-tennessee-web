import React, {Component} from 'react'
import api from '../../helpers'
import history from '../../navigation/history'
import {Input} from '../../components'
import Strings, {Regex} from '../../constants'

const Validators = {
  name: {regex: Regex.notBlank, message: 'Please enter your name.'},
  street: {regex: Regex.notBlank, message: 'Please enter your street address.'},
  city: {regex: Regex.notBlank, message: 'Please enter your city.'},
  state: {regex: Regex.notBlank, message: 'Please enter your state.'},
  zip: {regex: Regex.zip, message: 'Please enter your zipcode.'},
  phone: {regex: Regex.phone, message: 'Please enter a valid phone number.'},
  email: {regex: Regex.email, message: 'Please enter a valid email.'},
  password: {
    regex: Regex.password,
    message: 'Please enter a password at least 8 characters long.'
  }
}
export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      values: {
        name: '',
        street: '',
        zip: '',
        phone: '',
        email: '',
        password: '',
        city: '',
        state: ''
      },
      errors: {
        street: null,
        zip: null,
        phone: null,
        email: null,
        password: null,
        name: null,
        city: null,
        state: null
      },
      signupError: null,
      submitted: false
    }
  }

  onInputChange = e => {
    const {value, name} = e.target
    this.setState(prevState => ({
      ...prevState,
      values: {...prevState.values, [name]: value}
    }))
  }

  validate = () => {
    const {values} = this.state
    const errors = Object.entries(values).reduce((acc, [key, value]) => {
      acc[key] = !Validators[key].regex.test(value)
      return acc
    }, {})
    this.setState({errors})
    return Object.values(errors).filter(e => e).length === 0
  }

  onSubmit = () => {
    const {password, name, street, zip, phone, email, city, state} = this.state
    const data = {
      name,
      street,
      zip,
      phone,
      email,
      city,
      state
    }
    const valid = this.validate()
    this.setState({submitted: true})
    if (valid) {
      this.submitForm(data, password)
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
    const {errors, signupError, submitted} = this.state
    const signupErrorDiv = signupError ? (
      <div id="emailError">{Strings.firebaseErrorMessage(signupError)}</div>
    ) : null
    const wasValidatedClass = submitted ? '' : ''

    return (
      <div className="container">
        <div className="row">
          <div className="col-md">
            <div className="well">
              <h2>Register as a new user</h2>
              <h5>
                This is the information SoSA will use to get in touch with you.
              </h5>
              <form
                id="registrationForm"
                onSubmit={this.onSubmit}
                className={wasValidatedClass}
              >
                <Input
                  id="name"
                  label="Name"
                  placeholder="Name"
                  onChange={this.onInputChange}
                  error={errors.name && Validators.name.message}
                  required
                  onBlur={this.validate}
                />
                <Input
                  id="email"
                  label="Email address"
                  placeholder="Email"
                  onChange={this.onInputChange}
                  error={errors.email && Validators.email.message}
                  type="email"
                  required
                  onBlur={this.validate}
                />
                <Input
                  id="password"
                  label="Password"
                  placeholder="Password"
                  onChange={this.onInputChange}
                  error={errors.password && Validators.password.message}
                  type="password"
                  required
                  onBlur={this.validate}
                />
                <Input
                  id="phone"
                  label="Phone number"
                  placeholder="(615) 555-5555"
                  onChange={this.onInputChange}
                  error={errors.phone && Validators.phone.message}
                  type="tel"
                  required
                  onBlur={this.validate}
                />
                <Input
                  id="street"
                  label="Street Address"
                  placeholder="123 Main Street"
                  onChange={this.onInputChange}
                  error={errors.street && Validators.street.message}
                  required
                  onBlur={this.validate}
                />
                <Input
                  id="city"
                  label="City"
                  placeholder="Nashville"
                  onChange={this.onInputChange}
                  error={errors.city && Validators.city.message}
                  required
                  onBlur={this.validate}
                />
                <Input
                  id="state"
                  label="State"
                  placeholder="Tennessee"
                  onChange={this.onInputChange}
                  error={errors.state && Validators.state.message}
                  required
                  onBlur={this.validate}
                />
                <Input
                  id="zip"
                  label="Zip Code"
                  placeholder="37211"
                  onChange={this.onInputChange}
                  error={errors.zip && Validators.zip.message}
                  type="number"
                  required
                  onBlur={this.validate}
                />
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
      </div>
    )
  }
}
