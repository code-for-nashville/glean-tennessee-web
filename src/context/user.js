import React, {Component} from 'react'

const UserContext = React.createContext({
  user: null,
  userProfile: null,
  updateContext: () => {}
})

export function withUserContextConsumer(WrappedComponent) {
  return class WithUserContextConsumer extends Component {
    render() {
      return (
        <UserContext.Consumer>
          {context => <WrappedComponent {...this.props} {...context} />}
        </UserContext.Consumer>
      )
    }
  }
}

export default UserContext
