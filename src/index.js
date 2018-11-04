import ReactDOM from 'react-dom'
import React from 'react'
import firebase from 'firebase'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import history from './navigation/history'
import resolve from './navigation/router'
import routes from './navigation/routes'
import UserContext from './context'
const container = document.getElementById('root')

const renderComponent = component => component

class Root extends React.Component {
  state = {
    route: null,
    context: {
      user: null
    }
  }

  componentDidMount() {
    history.listen(this.setRoute)
    firebase.auth().onAuthStateChanged(user => {
      this.setState(prevState => ({
        context: {...prevState.context, user}
      }))
      this.setRoute(history.location)
    })
  }

  isAuthed = () => !!this.state.context.user

  setRoute = async location => {
    const authed = this.isAuthed()
    const route = await resolve(routes, location, authed)
      .then(renderComponent)
      .catch(renderComponent)
    this.setState({route})
  }
  render(location) {
    return (
      <UserContext.Provider value={this.state.context}>
        {this.state.route}
      </UserContext.Provider>
    )
  }
}

ReactDOM.render(<Root />, container)
registerServiceWorker()
