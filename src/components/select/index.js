import * as React from 'react'

class Select extends React.Component {
  static defaultProps = {
    required: false
  }

  constructor(props) {
    super(props)
    this.state = {
      focus: false
    }
  }

  onBlur = e => {
    const {onBlur} = this.props
    if (onBlur) {
      e.persist()
      onBlur(e)
    }
    this.setState({focus: false})
  }

  onFocus = e => {
    const {onFocus} = this.props
    if (onFocus) {
      e.persist()
      onFocus(e)
    }
    this.setState({focus: true})
  }

  renderError() {
    const {error} = this.props
    if (error !== null) {
      return <div className="invalid-feedback">{error}</div>
    }

    return null
  }

  renderOptions = () => {
    const {options} = this.props
    return options.map(o => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))
  }

  render() {
    const {id, label, onChange, error, required, value} = this.props
    const className = error ? 'form-control is-invalid' : 'form-control'
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <select
          name={id}
          className={className}
          id={id}
          onChange={onChange}
          value={value}
          required={required}
        >
          {this.renderOptions()}
        </select>
        {this.renderError()}
      </div>
    )
  }
}

export default Select
