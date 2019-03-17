// @flow

import React from 'react'
import {shallow} from 'enzyme'
import {Input} from '../../../src/components'

const DefaultInputs = {
  id: 'input',
  label: 'Input',
  placeholder: '37277',
  onChange: jest.fn(),
  error: null,
  type: 'text',
  required: false
}

describe('input', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Input {...DefaultInputs} />)
    expect(wrapper).toHaveLength(1) // Exists
  })
  it('renders accessory', () => {
    const mockOnChange = jest.fn()
    const wrapper = shallow(
      <Input {...DefaultInputs} onChange={mockOnChange} />
    )
    const input = wrapper
      .shallow()
      .find('input')
      .first()
    input.simulate('change', {
      persist: jest.fn()
    })
    expect(mockOnChange).toBeCalled()
  })
})
