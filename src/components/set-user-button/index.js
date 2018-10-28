import React from 'react'
import {withUserContextConsumer} from '../../context/user'

/**
 * @param {string} props.onClick Receives a function to set the User in the UserContext
 */

class SetUserButton extends React.Component {
  onClick = e => {
    e.preventDefault()
    this.props.onClick(this.props.setUser)
  }

  render() {
    return (
      <button {...this.props} onClick={this.onClick}>
        {this.props.text}
      </button>
    )
  }
}

export default withUserContextConsumer(SetUserButton)
