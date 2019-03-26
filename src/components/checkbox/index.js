import * as React from 'react'
import {classnames} from '../../helpers'
import './styles.css'
const Checkbox = ({
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
      type="checkbox"
      id={`${name}-${value}`}
      name={name}
      value={value}
      onChange={onChange}
      checked={checked}
    />
    <label className="form-check-label" htmlFor={`${name}-${value}`}>
      {label}
    </label>
  </div>
)

class CheckboxGroup extends React.Component {
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
    if (Array.isArray(value)) {
      return value.indexOf(option) >= 0
    }
    return false
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
          <Checkbox
            {...option}
            onChange={onChange}
            required={required}
            name={name}
            layoutClass={layoutClass}
            inputClass={inputClass}
            key={`${name}-${idx}`}
            checked={this.isChecked(option.value, value)}
          />
        ))}
        {this.renderError()}
      </div>
    )
  }
}

export default CheckboxGroup
