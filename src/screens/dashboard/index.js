import React, {Component} from 'react'
import api, {toast} from '../../helpers'
import {Input, Select, Textarea, RadioGroup} from '../../components'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      values: {
        details: '',
        bestByDate: '',
        location: '',
        picked: 'unpicked',
        volume: 0,
        unit: 'lbs'
      },
      errors: {
        location: null,
        bestByDate: null
      }
    }
  }

  validate = () => {
    const {bestByDate} = this.state.values
    const bestByError = bestByDate.length === 0 || null
    if (bestByError) {
      this.setState({
        errors: {bestByDate: bestByError}
      })
      return false
    }
    return true
  }

  submit = (e: Event) => {
    e.preventDefault()
    const valid = this.validate()
    if (valid) {
      this.submitForm()
    } else {
      toast.error('Please fill in required fields.')
    }
  }

  submitForm = async () => {
    const {values} = this.state
    const [_, err] = await api.sendMessage(values) // eslint-disable-line no-unused-vars
    if (err === null) {
      toast.success('Your request was successfully submitted.')
      this.setState({
        values: {
          details: '',
          location: '',
          volume: '',
          unit: '',
          picked: ''
        }
      })
    } else {
      toast.error(
        'There was an error submitting your request. Please try again.'
      )
    }
  }

  onChange = e => {
    e.persist()
    const {value, name} = e.target
    this.setState(prevState => ({values: {...prevState.values, [name]: value}}))
  }

  render() {
    const {errors, values} = this.state
    const {details, location, volume, unit, picked, bestByDate} = values
    return (
      <div className="container">
        <div className="row">
          <div className="col-md">
            <div className="well">
              <h2>Submit a Request for Gleaners</h2>
              <h5>
                The Society of St. Andrew will contact you to set up gleaning!
                Please provide any details you would like us to know before we
                contact you.
              </h5>
              <form>
                <div className="form-group">
                  <label htmlFor="location">Address/ Directions:</label>
                  <Textarea
                    name="location"
                    id="location"
                    placeholder="Direction / address / location information"
                    value={location}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="details">Notes:</label>
                  <Textarea
                    name="details"
                    id="details"
                    placeholder="Type and amount of food for donation, location of field, etc."
                    value={details}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <Input
                    id="bestByDate"
                    label="Best By Date"
                    onChange={this.onChange}
                    type="date"
                    required
                    value={bestByDate}
                    error={errors.bestByDate && 'This field is required'}
                  />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6">
                      <Input
                        id="volume"
                        label="Volume"
                        placeholder="0"
                        onChange={this.onChange}
                        type="number"
                        value={volume}
                      />
                    </div>
                    <div className="col-sm-6">
                      <Select
                        id="unit"
                        label="Units"
                        onChange={this.onChange}
                        value={unit}
                        options={[
                          {value: 'lbs', label: 'lbs'},
                          {value: 'rows', label: 'rows'},
                          {value: 'fields', label: 'fields'},
                          {value: 'crates', label: 'crates'}
                        ]}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <RadioGroup
                      onChange={this.onChange}
                      options={[
                        {value: 'picked', label: 'Picked'},
                        {value: 'unpicked', label: 'Unpicked'}
                      ]}
                      name="picked"
                      label={'Has the produce been picked?'}
                      value={picked}
                      vertical
                    />
                  </div>
                </div>
                <button
                  id="submit-btn"
                  type="submit"
                  className="form-control btn btn-primary btn-block btn-lg"
                  onClick={this.submit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
