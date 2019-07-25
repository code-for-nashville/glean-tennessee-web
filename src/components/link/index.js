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
    const {children, className, ...rest} = this.props
    const active = this.props.href === window.location.pathname ? 'active' : ''
    delete rest.callBack // Don't pass internal props to the DOM
    return (
      <a
        onClick={this.transition}
        {...rest}
        className={classnames(className, active)}
      >
        {children}
      </a>
    )
  }
}

export default Link
