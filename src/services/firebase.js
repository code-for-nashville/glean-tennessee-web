import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyC14hJ31aB7YF_0_yOZ_3KG1sPmKlEtLh0',
  authDomain: 'glean-tennessee.firebaseapp.com',
  databaseURL: 'https://glean-tennessee.firebaseio.com',
  projectId: 'glean-tennessee',
  storageBucket: 'glean-tennessee.appspot.com',
  messagingSenderId: '272130733451'
}

firebase.initializeApp(config)

const BASE_URL = config.databaseURL
const USER_URL = `${BASE_URL}/users`

const FirebaseService = () => {
  const signup = ({email, password}) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          const currentUser = user
          resolve(currentUser)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  const login = ({email, password}) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(profile => {
          const currentUser = profile.uid
          sessionStorage.setItem('user_id', currentUser)
          resolve(profile)
        })
        .catch(err => {
          console.log('error logging in:', err)
        })
    })
  }

  const logout = () => {
    return firebase
      .auth()
      .signOut()
      .catch(err => {
        console.log('error logging out', err.message)
      })
  }

  // data: { name: string, street: string, city: string, state: string, zip: string, phone: string, email: string, is_organic: boolean, uid: string, uid: string }
  const addProfile = ({user, data}) =>
    fetch(`${USER_URL}/${user.uid}.json`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .catch(error => error)

  const getUserProfile = uid =>
    fetch
      .then(`${USER_URL}/${uid}.json`)
      .then(response => response.json())
      .catch(error => error)

  return {
    signup,
    login,
    logout,
    addProfile,
    getUserProfile
  }
}

export default FirebaseService()
