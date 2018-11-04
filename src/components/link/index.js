import React from 'react'
import history from '../../navigation/history'

class Link extends React.Component {
  transition = event => {
    event.preventDefault()
    history.push({
      pathname: event.currentTarget.pathname,
      search: event.currentTarget.search
    })
  }

  render() {
    const {title} = this.props
    return (
      <a onClick={this.transition} {...this.props}>
        {title}
      </a>
    )
  }
}

export default Link
