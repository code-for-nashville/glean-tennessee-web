import React from 'react'
import { pathToRegexp } from 'path-to-regexp'
import App from '../App'

// https://medium.freecodecamp.org/you-might-not-need-react-router-38673620f3d

function matchURI(path, uri) {
  const keys = []
  const pattern = pathToRegexp(path, keys)
  return pattern.exec(uri)
}

// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
function extractQueryParams(search) {
  const urlSearchParams = new URLSearchParams(search)
  const params = {}

  for (const keyValue of urlSearchParams.entries()) {
    params[keyValue[0]] = keyValue[1]
  }

  return params
}

const resolve = async (routesObj, context, authed) => {
  const {success: routes, error: errorRoutes} = routesObj
  const uri = context.error ? errorRoutes['404'].path : context.pathname
  const search = context.search
  let result
  for (const route of routes) {
    if (!matchURI(route.path, uri)) {
      continue
    }

    const params = extractQueryParams(search)

    if (route.protected && !authed) {
      result = errorRoutes['401'].action({params})
    } else {
      result = await route.action({params})
    }
  }

  if (!result) {
    const params = matchURI(uri, uri, search)
    result = errorRoutes['404'].action({params})
  }
  return <App>{result}</App>
}

export default resolve
