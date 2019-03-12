import React, {Component} from 'react'
import api, {toast} from '../../helpers'
export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      details: '',
      subject: '',
      phone: '',
      address: ''
    }
  }
  submitForm = async () => {
    const {details, subject, phone, address} = this.state
    const [_, err] = await api.sendMessage({details, subject, phone, address})
    if (err === null) {
      toast.success('Your request was successfully submitted.')
      this.setState({details: '', subject: '', phone: '', address: ''})
    } else {
      toast.error(
        'There was an error submitting your request. Please try again.'
      )
    }
  }

  onChange = e => {
    e.persist()
    const {value, name} = e.target
    this.setState({[name]: value})
  }

  render() {
    const {details, subject, phone, address} = this.state
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
                  <label htmlFor="subj">Subject:</label>
                  <input
                    type="text"
                    id="subj"
                    name="subject"
                    value={subject}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="extra-detail">Notes:</label>
                  <textarea
                    name="details"
                    type="text"
                    className="form-control"
                    id="extra-detail"
                    placeholder="Type and amount of food for donation, location of field, etc."
                    value={details}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  id="submit-btn"
                  type="button"
                  className="form-control btn btn-primary btn-block btn-lg"
                  onClick={this.submitForm}
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
