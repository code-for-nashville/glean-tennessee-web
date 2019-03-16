import React from 'react'
import {classnames} from '../../helpers'
import eventManager from './event-manager'
import TYPES, {ACTIONS} from './constants'
import './styles.css'

const TypeStyles = {
  [TYPES.DEFAULT]: 'default',
  [TYPES.ERROR]: 'error',
  [TYPES.SUCCESS]: 'success'
}

class Toast extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: null,
      type: null
    }
  }
  componentDidMount() {
    eventManager
      .register(ACTIONS.TOAST, (text, type) => this.toast(text, type))
      .emit(ACTIONS.DID_MOUNT)
  }

  componentWillUnmount() {
    eventManager.clear(ACTIONS.TOAST).emit(ACTIONS.WILL_UNMOUNT)
  }

  clear = () => {
    this.setState({text: null, type: null})
  }

  toast = (text, type) => {
    this.setState(() => ({text, type}), () => setTimeout(this.clear, 5000))
  }

  renderToast = () => {
    const {text, type} = this.state
    const typeStyle = TypeStyles[type]
    return (
      <div
        className={classnames('toast', 'show', typeStyle)}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="mr-auto" />
          <button
            type="button"
            className="ml-2 mb-1 close"
            data-dismiss="toast"
            aria-label="Close"
            onClick={this.clear}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="toast-body">{text}</div>
      </div>
    )
  }

  render() {
    const {text, type} = this.state
    if (text !== null && type !== null) {
      return this.renderToast()
    }
    return null
  }
}

export default Toast
