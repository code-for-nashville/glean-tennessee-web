// @flow

import React from 'react'
import {shallow} from 'enzyme'
import CheckboxGroup from './'

const DefaultProps = {
  onChange: jest.fn(),
  options: [
    {value: 'Monday', label: 'Monday'},
    {value: 'Tuesday', label: 'Tuesday'},
    {value: 'Wednesday', label: 'Wednesday'},
    {value: 'Thursday', label: 'Thursday'},
    {value: 'Friday', label: 'Friday'},
    {value: 'Saturday', label: 'Saturday'},
    {value: 'Sunday', label: 'Sunday'}
  ],
  name: 'weekday',
  label: 'What days of the week are best for pickup?',
  error: null,
  vertical: true,
  required: true
}

describe('radio', () => {
  it('renders correctly', () => {
    const mockOnChange = jest.fn()
    const wrapper = shallow(
      <CheckboxGroup {...DefaultProps} onChange={mockOnChange} />
    )
    const firstCheckbox = wrapper
      .shallow()
      .shallow()
      .find('Checkbox')
      .first()
    firstCheckbox.simulate('change', {
      persist: jest.fn()
    })
    expect(mockOnChange).toBeCalled()
  })
  it('renders with error correctly', () => {
    const wrapper = shallow(
      <CheckboxGroup {...DefaultProps} error={'The is not correct.'} />
    )
    const error = wrapper.shallow().find('.invalid-feedback')
    expect(error).toHaveLength(1)
  })
})
