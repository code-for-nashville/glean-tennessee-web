// @flow

import React from 'react'
import {shallow} from 'enzyme'
import RadioGroup from './'

const DefaultProps = {
  onChange: jest.fn(),
  options: [
    {value: true, label: 'Organic'},
    {value: false, label: 'Inorganic'}
  ],
  name: 'organic',
  label: 'Is this an organic farm?'
}

describe('radio', () => {
  it('renders correctly', () => {
    const mockOnChange = jest.fn()
    const wrapper = shallow(
      <RadioGroup {...DefaultProps} onChange={mockOnChange} />
    )
    const radioInput = wrapper
      .shallow()
      .find('Radio')
      .first()
    radioInput.simulate('change', {
      persist: jest.fn()
    })
    expect(mockOnChange).toBeCalled()
  })
})
