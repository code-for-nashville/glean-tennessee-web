import React, {Component} from 'react'
import api, {toast} from '../../helpers'
import {ProfileForm} from '../../components'
import {withUserContextConsumer} from '../../context/user'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      updateError: null
    }
  }

  submitForm = async data => {
    const {user, updateContext} = this.props
    const [, updateError] = await api.updateProfile({
      ...data,
      uid: user.uid
    })
    if (updateError) {
      this.setState({updateError})
    } else {
      toast.success('Your profile was updated successfully.')
      updateContext({userProfile: data})
    }
  }

  render() {
    const {updateError} = this.state
    const {userProfile} = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="col-md">
            <div className="well">
              <h2>Update Your Profile</h2>
              <ProfileForm
                submitText="Submit"
                onSubmit={this.submitForm}
                formError={updateError}
                defaultValues={userProfile}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default withUserContextConsumer(Profile)
