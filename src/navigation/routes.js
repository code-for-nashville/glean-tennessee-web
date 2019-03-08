import React from 'react'
import Home from '../screens/home'
import Login from '../screens/login'
import SignUp from '../screens/signup'
import Dashboard from '../screens/dashboard'
import FourOhFour from '../screens/four-oh-four'

const routes = {
  success: [
    {
      path: '/',
      action: ({params}) => <Dashboard params={params} />,
      protected: true
    },
    {
      path: '/signup',
      action: ({params}) => <SignUp params={params} />,
      protected: false
    },
    {
      path: '/login',
      action: ({params}) => <Login params={params} />,
      protected: false
    },
    {
      path: '/dashboard',
      action: ({params}) => <Dashboard params={params} />,
      protected: true
    }
  ],
  error: {
    '404': {
      path: '/error',
      action: ({params}) => <FourOhFour params={params} />
    },
    '401': {
      path: '/login',
      action: ({params}) => <Login params={params} />,
      protected: false
    }
  }
}

export default routes
