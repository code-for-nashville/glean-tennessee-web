import React from 'react'
import history from '../../navigation/history'

class Link extends React.Component {
  transition = event => {
    const {callBack} = this.props
    event.preventDefault()
    history.push({
      pathname: event.currentTarget.pathname,
      search: event.currentTarget.search
    })
    if (callBack) {
      callBack()
    }
  }

  render() {
    const {children} = this.props
    return (
      <a onClick={this.transition} {...this.props}>
        {children}
      </a>
    )
  }
}

export default Link
