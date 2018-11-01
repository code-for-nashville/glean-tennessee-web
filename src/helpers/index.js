import FirebaseService from '../services/firebase'

const makeApiCall = async (api, ...args) => {
  let response
  let error
  try {
    response = await api(...args)
  } catch (e) {
    error = e
  }
  return [response, error]
}

export const login = async (email, password) => {
  const [response, error] = await makeApiCall(FirebaseService.login, {
    email,
    password
  })
  return [response, error]
}

export const signup = async data => {
  // Create User
  const [signupResponse, error] = await makeApiCall(FirebaseService.signup, {
    email: data.email,
    password: data.password
  })
  if (error) {
    return [signupResponse, error]
  }
  data.uid = signupResponse.user.uid
  // Update User Info
  const [addProfileResponse, addProfileError] = await makeApiCall(
    FirebaseService.addProfile,
    {data}
  )

  if (error) {
    return [addProfileResponse, addProfileError]
  }

  // Get User Info
  const [getUserResponse, getUserError] = await makeApiCall(
    FirebaseService.getUserProfile,
    data.uid
  )
  let response
  if (getUserResponse) {
    response = getUserResponse.val()
  }
  return [response, getUserError]
}

export const logout = async () => await makeApiCall(FirebaseService.logout)

const NavigationHelpers = {
  login,
  signup,
  logout,
}

export default NavigationHelpers
