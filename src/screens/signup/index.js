import React, {Component} from 'react'
import api from '../../helpers'
import history from '../../navigation/history'
import {CheckboxGroup, Input, RadioGroup} from '../../components'
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
  },
  weekday: {minLength: 1, message: 'Please select at least one day.'},
  timeOfDay: {minLength: 1, message: 'Please select at least one time of day.'},
  validate(key, value) {
    const validator = this[key]
    let valid = true
    if (validator) {
      if (validator.regex) {
        valid = !validator.regex.test(value)
      } else if (typeof validator.minLength === 'number') {
        valid = value.length < validator.minLength
      }
    }

    return valid
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
        state: '',
        organic: false,
        weekday: [],
        timeOfDay: []
      },
      errors: {
        street: null,
        zip: null,
        phone: null,
        email: null,
        password: null,
        name: null,
        city: null,
        state: null,
        organic: null,
        weekday: null,
        timeOfDay: null
      },
      signupError: null
    }
  }

  onInputChange = e => {
    const {value, name} = e.target
    this.setState(prevState => ({
      ...prevState,
      values: {...prevState.values, [name]: value}
    }))
  }

  onCheckboxChange = e => {
    const {value, name} = e.target
    this.setState(prevState => {
      const currentValues = prevState.values[name]
      const checkedValueIdx = currentValues.indexOf(value)
      if (checkedValueIdx > -1) {
        currentValues.splice(checkedValueIdx, 1)
      } else {
        currentValues.push(value)
      }
      return {
        ...prevState,
        values: {...prevState.values, [name]: currentValues}
      }
    })
  }

  validate = () => {
    const {values} = this.state
    const errors = Object.entries(values).reduce((acc, [key, value]) => {
      acc[key] = Validators.validate(key, value)
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
    const {errors, signupError} = this.state
    const signupErrorDiv = signupError ? (
      <div id="emailError">{Strings.firebaseErrorMessage(signupError)}</div>
    ) : null
    return (
      <div className="container">
        <div className="row">
          <div className="col-md">
            <div className="well">
              <h2>Register as a new user</h2>
              <h5>
                This is the information SoSA will use to get in touch with you.
              </h5>
              <form id="registrationForm" onSubmit={this.onSubmit}>
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
                <RadioGroup
                  onChange={this.onInputChange}
                  options={[
                    {value: true, label: 'Organic'},
                    {value: false, label: 'Inorganic'}
                  ]}
                  name={'organic'}
                  label={'Is this an organic farm?'}
                  vertical
                  required
                />
                <CheckboxGroup
                  onChange={this.onCheckboxChange}
                  options={[
                    {value: 'Monday', label: 'Monday'},
                    {value: 'Tuesday', label: 'Tuesday'},
                    {value: 'Wednesday', label: 'Wednesday'},
                    {value: 'Thursday', label: 'Thursday'},
                    {value: 'Friday', label: 'Friday'},
                    {value: 'Saturday', label: 'Saturday'},
                    {value: 'Sunday', label: 'Sunday'}
                  ]}
                  name={'weekday'}
                  label={'What days of the week are best for pickup?'}
                  error={errors.weekday && Validators.weekday.message}
                  vertical
                  required
                />
                <CheckboxGroup
                  onChange={this.onCheckboxChange}
                  options={[
                    {value: 'Morning', label: 'Morning'},
                    {value: 'Afternoon', label: 'Afternoon'},
                    {value: 'Evening', label: 'Evening'}
                  ]}
                  name={'timeOfDay'}
                  label={'What time of day is best for pickup?'}
                  error={errors.timeOfDay && Validators.timeOfDay.message}
                  vertical
                  required
                />
              </form>
              {signupErrorDiv}
              <button
                id="register-btn"
                type="submit"
                className="btn btn-primary"
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
