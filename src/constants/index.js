const Strings = {
  firebaseErrorMessage: error => {
    let code = null
    switch (error.code) {
      case 'auth/user-not-found':
        code = 'Incorrect email or password.'
        break
      case 'auth/invalid-email':
        code = 'Invalid email format'
      default:
        // don't set an error if not called with a proper error object
        if (error && error.code) {
          code = 'Server error.'
        }
        break
    }
    return code
  }
}

export const Regex = {
  testEmail: email =>
    /^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/.test(
      email
    )
}

export default Strings
