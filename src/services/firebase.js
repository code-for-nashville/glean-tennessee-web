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
  const addProfile = ({userId, data}) =>
    firebase
      .database()
      .ref('users/' + userId)
      .update(data)

  const getUserProfile = userId =>
    firebase
      .database()
      .ref('/users/' + userId)
      .once('value')

  return {
    signup,
    login,
    logout,
    addProfile,
    getUserProfile
  }
}

export default FirebaseService()
