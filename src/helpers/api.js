import FirebaseService from '../services/firebase'

const makeApiCall = async (api, ...args) => {
  let response = null
  let error = null
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

export const signup = async (data, password) => {
  // Create User
  const [signupResponse, error] = await makeApiCall(FirebaseService.signup, {
    email: data.email,
    password: password
  })

  if (error) {
    return [signupResponse, error]
  }
  data.uid = signupResponse.user.uid
  // Update User Info
  const [updateProfileResponse, updateProfileError] = await updateProfile(data)
  if (error) {
    return [updateProfileResponse, updateProfileError]
  }

  // Get User Info
  const [getUserResponse, getUserError] = await userProfile(data.uid)
  return [getUserResponse, getUserError]
}

export const updateProfile = async data => {
  const [getUserResponse, getUserError] = await makeApiCall(
    FirebaseService.updateProfile,
    data
  )
  let response
  if (getUserResponse) {
    response = getUserResponse.val()
  }
  return [response, getUserError]
}

export const userProfile = async uid =>
  await makeApiCall(FirebaseService.getUserProfile, uid)

export const logout = async () => await makeApiCall(FirebaseService.logout)

export const sendMessage = async message => {
  const [response, error] = await makeApiCall(
    FirebaseService.sendMessage,
    message
  )
  return [response, error]
}

const NavigationHelpers = {
  login,
  signup,
  logout
}

export default NavigationHelpers
