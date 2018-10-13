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

const resolve = async (routes, context) => {
  for (const route of routes) {
    const uri = context.error ? '/error' : context.pathname
    const search = context.search
    const params = matchURI(route.path, uri, search)
    if (!params) continue // Null was returned so no route was found, keep looking
    const result = await route.action({params})
    const AppComponent = <App>{result}</App>
    if (result) return AppComponent
  }
  const error = new Error('Not found')
  error.status = 404
  throw error
}

export default {resolve}
