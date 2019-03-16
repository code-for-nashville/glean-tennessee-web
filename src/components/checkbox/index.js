import * as React from 'react'
import {classnames} from '../../helpers'
import './styles.css'
const Checkbox = ({onChange, value, name, layoutClass, inputClass, label}) => (
  <div className={classnames('form-check', layoutClass)}>
    <input
      className={inputClass}
      type="checkbox"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
    />
    <label className="form-check-label" for={name}>
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

  render() {
    const {
      error,
      label,
      onChange,
      options,
      vertical,
      required,
      name
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
          />
        ))}
        {this.renderError()}
      </div>
    )
  }
}

export default CheckboxGroup
