import React from 'react'
import ReactDOM from 'react-dom'
import Navigation from './'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Navigation />, div)
})
