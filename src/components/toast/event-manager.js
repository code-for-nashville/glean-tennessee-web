const eventManager = {
  events: new Map(),

  register(event, callback) {
    this.events.set(event, callback)
    return this
  },

  clear(event) {
    this.events.delete(event)
    return this
  },

  emit(event, ...args) {
    this.events.get(event).call(null, ...args)
    return this
  }
}

export default eventManager
