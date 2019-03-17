// @flow

import React from 'react'
import {shallow} from 'enzyme'
import {Textarea} from '../../../src/components'

const DefaultProps = {
  name: 'textarea',
  id: 'textarea',
  placeholder: 'Textarea placeholder',
  value: '',
  onChange: jest.fn(),
  required: true,
  error: null
}

describe('input', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Textarea {...DefaultProps} />)
    expect(wrapper).toHaveLength(1) // Exists
  })
  it('renders accessory', () => {
    const mockOnChange = jest.fn()
    const wrapper = shallow(
      <Textarea {...DefaultProps} onChange={mockOnChange} />
    )
    const input = wrapper
      .shallow()
      .find('textarea')
      .first()
    input.simulate('change', {
      persist: jest.fn()
    })
    expect(mockOnChange).toBeCalled()
  })
})
