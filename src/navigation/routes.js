import React from 'react'
import Home from '../screens/home'
import Login from '../screens/login'
import SignUp from '../screens/signup'
import Dashboard from '../screens/dashboard'
import FourOhFour from '../screens/four-oh-four'

const routes = [
  {path: '/', action: ({params}) => <Home params={params} />},
  {path: '/signup', action: ({params}) => <SignUp params={params} />},
  {path: '/login', action: ({params}) => <Login params={params} />},
  {path: '/dashboard', action: ({params}) => <Dashboard params={params} />},
  {path: '/error', action: ({params}) => <FourOhFour params={params} />}
]

export default routes
