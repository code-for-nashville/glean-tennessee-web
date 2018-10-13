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
    const {href, title} = this.props
    return (
      <a href={href} onClick={this.transition}>
        {title}
      </a>
    )
  }
}
<<<<<<< HEAD
=======

export default Link
>>>>>>> 6f3bf145a409de4e39b09f94a0fbdf36d18fc0b8
