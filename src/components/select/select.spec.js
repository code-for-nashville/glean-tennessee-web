// @flow

import React from 'react'
import {shallow} from 'enzyme'
import {Select} from '../../../src/components'

const DefaultProps = {
  id: 'select',
  label: 'Select',
  onChange: jest.fn(),
  value: '',
  options: [
    {value: 1, label: 'one'},
    {value: 2, label: 'two'},
    {value: 3, label: 'three'},
    {value: 4, label: 'four'}
  ],
  error: null
}

describe('input', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Select {...DefaultProps} />)
    expect(wrapper).toHaveLength(1) // Exists
  })
  it('renders accessory', () => {
    const mockOnChange = jest.fn()
    const wrapper = shallow(
      <Select {...DefaultProps} onChange={mockOnChange} />
    )
    const input = wrapper
      .shallow()
      .find('select')
      .first()
    input.simulate('change', {
      persist: jest.fn()
    })
    expect(mockOnChange).toBeCalled()
  })
})
