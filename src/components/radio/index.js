import * as React from 'react'
import {classnames} from '../../helpers'

const Radio = ({
  onChange,
  value,
  name,
  layoutClass,
  inputClass,
  label,
  checked
}) => (
  <div className={classnames('form-check', layoutClass)}>
    <input
      className={inputClass}
      type="radio"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      checked={checked}
    />
    <label className="form-check-label" htmlFor={name}>
      {label}
    </label>
  </div>
)

class RadioGroup extends React.Component {
  static defaultProps = {
    required: false
  }

  renderError() {
    const {error} = this.props
    if (error !== null) {
      return <div className="invalid-feedback">{error}</div>
    }

    return null
  }

  isChecked(option, value) {
    return option === value
  }

  render() {
    const {
      error,
      label,
      onChange,
      options,
      vertical,
      required,
      name,
      value
    } = this.props
    const layoutClass = vertical ? 'form-check-inline' : ''
    const inputClass = error
      ? 'form-check-input is-invalid'
      : 'form-check-input'
    return (
      <div className="form-group">
        <p>{label}</p>
        {options.map((option, idx) => (
          <Radio
            {...option}
            onChange={onChange}
            required={required}
            name={name}
            layoutClass={layoutClass}
            inputClass={inputClass}
            key={`${name}-${idx}`}
            value={option.value}
            checked={this.isChecked(option.value, value)}
          />
        ))}
        {this.renderError()}
      </div>
    )
  }
}

export default RadioGroup
