import React from 'react'
import ReactDOM from 'react-dom'
import Link from './'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Link title={'Click'} />, div)
})
