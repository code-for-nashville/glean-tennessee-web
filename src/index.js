import ReactDOM from 'react-dom'
import React from 'react'
import firebase from 'firebase'
import api, {toast} from './helpers'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import history from './navigation/history'
import resolve from './navigation/router'
import routes from './navigation/routes'
import UserContext from './context'
const container = document.getElementById('root')

const renderComponent = component => component

class Root extends React.Component {
  constructor(props) {
    super(props)
    const updateContext = newContext => {
      this.setState(prevState => ({
        context: {...prevState.context, ...newContext}
      }))
    }
    this.state = {
      route: null,
      context: {
        user: null,
        userProfile: null,
        updateContext
      }
    }
  }

  componentDidMount() {
    history.listen(this.setRoute)
    firebase.auth().onAuthStateChanged(user => {
      this.setState(prevState => ({
        context: {...prevState.context, user}
      }))
      if (user) {
        this.updateUserProfile()
      }
      this.setRoute(history.location)
    })
  }

  updateUserProfile = async () => {
    const {user} = this.state.context
    if (user) {
      const [response, error] = await api.userProfile(user.uid)
      if (response) {
        this.setState(prevState => ({
          context: {...prevState.context, userProfile: response.val()}
        }))
      }
      if (error) {
        toast.error('Error fetching user profile')
      }
    }
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
