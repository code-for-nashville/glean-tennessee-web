import TYPES, {ACTIONS} from './constants'
import eventManager from './event-manager'

const emitEvent = (text, type) => {
  if (eventManager.mounted === true) {
    eventManager.emit(ACTIONS.TOAST, text, type)
  } else {
    console.warn(
      'Cannot call create toast before container mounts. Ensure that Toast container mounts before calling a toast.'
    )
  }
}

const toast = Object.assign(text => emitEvent(text, TYPES.DEFAULT), {
  success: text => emitEvent(text, TYPES.SUCCESS),
  error: text => emitEvent(text, TYPES.ERROR)
})

eventManager
  .register(ACTIONS.DID_MOUNT, () => {
    eventManager.mounted = true
  })
  .register(ACTIONS.WILL_UNMOUNT, () => {
    eventManager.mounted = false
  })

export default toast
