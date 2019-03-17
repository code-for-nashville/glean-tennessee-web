const Strings = {
  firebaseErrorMessage: error => {
    let code = null
    switch (error.code) {
      case 'auth/user-not-found':
        code = 'Incorrect email or password.'
        break
      case 'auth/invalid-email':
        code = 'Invalid email format'
        break
      case 'auth/email-already-in-use':
        code = error.message
        break
      default:
        // don't set an error if not called with a proper error object
        if (error) {
          code = 'Server error.'
        }
        break
    }
    return code
  }
}

export const Regex = {
  email: /^([a-zA-Z0-9])(([a-zA-Z0-9])*([._+-])*([a-zA-Z0-9]))*@(([a-zA-Z0-9-])+(\.))+([a-zA-Z]{2,4})+$/,
  phone: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
  zip: /^(\d{5})$/,
  password: /^([A-Za-z\d]{8,})$/,
  notBlank: /^(.{1,})$/
}

export default Strings
