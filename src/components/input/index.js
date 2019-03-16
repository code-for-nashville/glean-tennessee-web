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
