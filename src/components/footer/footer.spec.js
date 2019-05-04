// @flow

import React from 'react'
import {shallow} from 'enzyme'
import Footer from './'

describe('radio', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Footer />)
    expect(wrapper).toHaveLength(1)
  })
})
