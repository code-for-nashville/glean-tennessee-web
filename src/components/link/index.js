import React from 'react'
import history from '../../navigation/history'
import {classnames} from '../../helpers'

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
    const {children, className} = this.props
    const active = this.props.href === window.location.pathname ? 'active' : ''
    return (
      <a
        onClick={this.transition}
        {...this.props}
        className={classnames(className, active)}
      >
        {children}
      </a>
    )
  }
}

export default Link
