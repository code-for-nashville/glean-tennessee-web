import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyAd39Tc5YR1OJMeZbqG8PjzD2DE6sYY0N8',
  authDomain: 'gleantn-1794b.firebaseapp.com',
  databaseURL: 'https://gleantn-1794b.firebaseio.com',
  projectId: 'gleantn-1794b',
  storageBucket: 'gleantn-1794b.appspot.com',
  messagingSenderId: '431241114929'
}

firebase.initializeApp(config)

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
          reject(err)
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
  const addProfile = ({data}) =>
    new Promise((resolve, reject) => {
      firebase
        .database()
        .ref('farmers/' + data.uid)
        .update(data, error => {
          if (error) {
            reject(error)
          } else {
            resolve(true)
          }
        })
    })

  const getUserProfile = () =>
    firebase
      .database()
      .ref('/farmers/' + firebase.auth().currentUser.uid)
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
