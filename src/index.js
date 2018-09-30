import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import history from './navigation/history'
import router from './navigation/router'
import routes from './navigation/routes'

const container = document.getElementById('root')

const renderComponent = component => {
  if (component) {
    ReactDOM.render(component, container)
  }
}

const render = location => {
  router
    .resolve(routes, location)
    .then(renderComponent)
    .catch(error => router.resolve(routes, {...location, error}))
    .then(renderComponent)
}

render(history.location) // render the current URL
history.listen(render)

registerServiceWorker()
