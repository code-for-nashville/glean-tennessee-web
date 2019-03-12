import * as React from 'react'

class Input extends React.Component {
  static defaultProps = {
    type: 'text',
    required: false
  }

  constructor(props) {
    super(props)
    this.state = {
      focus: false
    }
  }

  onBlur = () => {
    const {onBlur} = this.props
    if (onBlur) {
      onBlur()
    }
    this.setState({focus: false})
  }

  onFocus = () => {
    const {onFocus} = this.props
    if (onFocus) {
      onFocus()
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

  render() {
    const {id, label, placeholder, onChange, type, error, required} = this.props
    const className = error ? 'form-control is-invalid' : 'form-control'
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
          onChange={onChange}
          type={type}
          className={className}
          id={id}
          placeholder={placeholder}
          name={id}
          required={required}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        {this.renderError()}
      </div>
    )
  }
}

export default Input
