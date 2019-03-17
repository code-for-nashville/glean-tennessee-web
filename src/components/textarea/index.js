import * as React from 'react'

class TextArea extends React.Component {
  static defaultProps = {
    required: false,
    placeholder: ''
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
    const {
      id,
      label,
      placeholder,
      onChange,
      error,
      required,
      value
    } = this.props
    const className = error ? 'form-control is-invalid' : 'form-control'
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <textarea
          onChange={onChange}
          className={className}
          id={id}
          placeholder={placeholder}
          name={id}
          required={required}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          value={value}
        />
        {this.renderError()}
      </div>
    )
  }
}

export default TextArea
