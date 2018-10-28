import React, {Component} from 'react'

const UserContext = React.createContext({
  user: {},
  setUser: () => {}
})

export function withUserContextConsumer(WrappedComponent) {
  return class WithUserContextConsumer extends Component {
    render() {
      return (
        <UserContext.Consumer>
          {({setUser, user}) => (
            <WrappedComponent
              {...this.props}
              user={this.props.user}
              onClick={this.props.onClick.bind(this, setUser)}
            />
          )}
        </UserContext.Consumer>
      )
    }
  }
}

export default UserContext