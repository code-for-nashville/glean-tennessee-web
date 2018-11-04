import React, {Component} from 'react'

const UserContext = React.createContext({
  user: {}
})

export function withUserContextConsumer(WrappedComponent) {
  return class WithUserContextConsumer extends Component {
    render() {
      return (
        <UserContext.Consumer>
          {({user}) => <WrappedComponent {...this.props} user={user} />}
        </UserContext.Consumer>
      )
    }
  }
}

export default UserContext
