import React from 'react'
import Login from '../screens/login'
import SignUp from '../screens/signup'
import Dashboard from '../screens/dashboard'
import Profile from '../screens/profile'
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
    },
    {
      path: '/profile',
      action: ({params}) => <Profile params={params} />,
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
