import React, {Component} from 'react'

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <div class="row">
          <div class="col-md">
            <div class="well">
              <h2>Submit a Request for Gleaners</h2>
              <h5>
                The Society of St. Andrew will contact you to set up gleaning!
                Please provide any details you would like us to know before we
                contact you.
              </h5>
              <form
                method="POST"
                action="https://formspree.io/sosagleantn@gmail.com"
              >
                <div class="form-group">
                  <label for="extra-detail">Notes:</label>
                  <textarea
                    name="details"
                    type="text"
                    class="form-control"
                    id="extra-detail"
                    placeholder="Type and amount of food for donation, location of field, etc."
                  />
                </div>
                <input
                  type="hidden"
                  id="hidden-subj"
                  name="_subject"
                  value="New request for gleaners!"
                />
                <input type="hidden" id="hidden-name" name="name" value="" />
                <input type="hidden" id="hidden-email" name="email" value="" />
                <input
                  type="hidden"
                  id="hidden-phone"
                  name="phone_number"
                  value=""
                />
                <input
                  type="hidden"
                  id="hidden-address"
                  name="address"
                  value=""
                />
                <button
                  id="submit-btn"
                  type="submit"
                  class="form-control btn btn-primary btn-block btn-lg"
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