import React from 'react'
import toRegex from 'path-to-regexp'
import queryString from 'query-string'
import App from '../App'
// https://medium.freecodecamp.org/you-might-not-need-react-router-38673620f3d

function matchURI(path, uri, search) {
  const keys = []
  const pattern = toRegex(path, keys)
  const match = pattern.exec(uri)
  if (!match) {
    return null
  }
  const params = queryString.parse(search)
  return params
}

const resolve = async (routesObj, context, authed) => {
  const {success: routes, error: errorRoutes} = routesObj
  const uri = context.error ? errorRoutes['404'].path : context.pathname
  const search = context.search
  let result
  for (const route of routes) {
    const params = matchURI(route.path, uri, search)
    if (!params) continue // Null was returned so no route was found, keep looking

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
