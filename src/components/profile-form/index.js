import React, {Component} from 'react'
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
    message: 'Please enter a password at least 8 characters long which contains only letters (upper or lowercase) and numbers.'
},
  weekday: {minLength: 1, message: 'Please select at least one day.'},
  timeOfDay: {minLength: 1, message: 'Please select at least one time of day.'},
  validate(key, value) {
    const validator = this[key]
    let valid = false
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
export default class ProfileForm extends Component {
  static defaultProps = {
    showPassword: false
  }

  constructor(props) {
    super(props)
    const {defaultValues} = props
    const {
      name = '',
      street = '',
      zip = '',
      phone = '',
      email = '',
      password = '',
      city = '',
      state = '',
      organic = 'inorganic',
      weekday = [],
      timeOfDay = []
    } =
      defaultValues || {}
    this.state = {
      values: {
        name,
        street,
        zip,
        phone,
        email,
        password,
        city,
        state,
        organic,
        weekday,
        timeOfDay
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

  componentDidUpdate(prevProps) {
    const {defaultValues} = this.props
    if (!prevProps.defaultValues && defaultValues) {
      this.setState({values: defaultValues})
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

  validate = e => {
    const {showPassword} = this.props
    if (e && e.target.name) {
      const {name, value} = e.target
      const valid = Validators.validate(name, value)
      this.setState(prevState => ({
        errors: {...prevState.errors, [name]: valid}
      }))
    } else {
      const {values} = this.state
      const errors = Object.entries(values).reduce((acc, [key, value]) => {
        acc[key] = Validators.validate(key, value)
        return acc
      }, {})
      // The password field might be hidden and makred as invalid
      if (showPassword === false) {
        errors.password = false
      }
      this.setState({errors})
      return Object.values(errors).filter(e => e).length === 0
    }
  }

  onSubmit = e => {
    e.preventDefault()
    const {
      password,
      name,
      street,
      zip,
      phone,
      email,
      city,
      state,
      organic,
      weekday,
      timeOfDay
    } = this.state.values
    const data = {
      name,
      street,
      zip,
      phone,
      email,
      city,
      state,
      organic,
      weekday,
      timeOfDay
    }
    const valid = this.validate()
    if (valid) {
      this.submitForm(data, password)
    }
  }

  submitForm = async (data, password) => {
    const {onSubmit} = this.props
    await onSubmit(data, password)
  }

  renderPassword = () => {
    const {showPassword} = this.props
    const {errors, values} = this.state
    if (showPassword) {
      return (
        <Input
          id="password"
          label="Password"
          placeholder="Password"
          onChange={this.onInputChange}
          error={errors.password && Validators.password.message}
          type="password"
          required
          onBlur={this.validate}
          value={values.password}
        />
      )
    }
    return null
  }

  render() {
    const {submitText, formError} = this.props
    const {errors, values} = this.state
    const signupErrorDiv = formError ? (
      <div id="emailError">{Strings.firebaseErrorMessage(formError)}</div>
    ) : null
    return (
      <form id="registrationForm">
        <Input
          id="name"
          label="Name"
          placeholder="Name"
          onChange={this.onInputChange}
          error={errors.name && Validators.name.message}
          required
          onBlur={this.validate}
          value={values.name}
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
          value={values.email}
        />
        {this.renderPassword()}
        <Input
          id="phone"
          label="Phone number"
          placeholder="Phone Number"
          onChange={this.onInputChange}
          error={errors.phone && Validators.phone.message}
          type="tel"
          required
          onBlur={this.validate}
          value={values.phone}
        />
        <Input
          id="street"
          label="Street Address"
          placeholder="Street Address"
          onChange={this.onInputChange}
          error={errors.street && Validators.street.message}
          required
          onBlur={this.validate}
          value={values.street}
        />
        <Input
          id="city"
          label="City"
          placeholder="City"
          onChange={this.onInputChange}
          error={errors.city && Validators.city.message}
          required
          onBlur={this.validate}
          value={values.city}
        />
        <Input
          id="state"
          label="State"
          placeholder="State"
          onChange={this.onInputChange}
          error={errors.state && Validators.state.message}
          required
          onBlur={this.validate}
          value={values.state}
        />
        <Input
          id="zip"
          label="Zip Code"
          placeholder="Zip Code"
          onChange={this.onInputChange}
          error={errors.zip && Validators.zip.message}
          type="number"
          required
          onBlur={this.validate}
          value={values.zip}
        />
        <RadioGroup
          onChange={this.onInputChange}
          options={[
            {value: 'organic', label: 'Organic'},
            {value: 'inorganic', label: 'Inorganic'}
          ]}
          name={'organic'}
          label={'Is this an organic farm?'}
          value={values.organic}
          vertical
          required
        />
        <CheckboxGroup
          onChange={this.onCheckboxChange}
          options={[
            {value: 'monday', label: 'Monday'},
            {value: 'tuesday', label: 'Tuesday'},
            {value: 'wednesday', label: 'Wednesday'},
            {value: 'thursday', label: 'Thursday'},
            {value: 'friday', label: 'Friday'},
            {value: 'saturday', label: 'Saturday'},
            {value: 'sunday', label: 'Sunday'}
          ]}
          name={'weekday'}
          label={'What days of the week are best for pickup?'}
          error={errors.weekday && Validators.weekday.message}
          value={values.weekday}
          vertical
          required
        />
        <CheckboxGroup
          onChange={this.onCheckboxChange}
          options={[
            {value: 'morning', label: 'Morning'},
            {value: 'afternoon', label: 'Afternoon'},
            {value: 'evening', label: 'Evening'}
          ]}
          name={'timeOfDay'}
          label={'What time of day is best for pickup?'}
          error={errors.timeOfDay && Validators.timeOfDay.message}
          value={values.timeOfDay}
          vertical
          required
        />
        {signupErrorDiv}
        <button
          id="register-btn"
          type="submit"
          className="btn btn-primary"
          onClick={this.onSubmit}
        >
          {submitText}
        </button>
      </form>
    )
  }
}
