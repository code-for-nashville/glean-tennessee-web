import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyAd39Tc5YR1OJMeZbqG8PjzD2DE6sYY0N8",
  authDomain: "gleantn-1794b.firebaseapp.com",
  databaseURL: "https://gleantn-1794b.firebaseio.com",
  projectId: "gleantn-1794b",
  storageBucket: "gleantn-1794b.appspot.com",
  messagingSenderId: "431241114929"
}

firebase.initializeApp(config)

const BASE_URL = config.databaseURL
const FARMER_URL = `${BASE_URL}/farmers`


const FirebaseService = () => {

  const signup = ({ email, password }) => {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          const currentUser = user
          resolve(currentUser)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const login = ({ email, password }) => {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((profile) => {
          const currentUser = profile.uid
          sessionStorage.setItem("user_id", currentUser)
          resolve(profile)
        })
        .catch((err) => {
          console.log("error logging in:", err)
        })
    })
  }

  const logout = () => {
    return firebase.auth().signOut()
      .catch((err) => {
        console.log("error logging out", err.message)
      })
  }

  const addProfile = (user, data) => {
    return fetch(`${FARMER_URL}/${user.uid}.json`, {method: 'PUT', body: JSON.stringify(data)})
      .then(response => response.json()).catch(error => error)
  }

  const getFarmerProfile = (uid) => {
    return fetch.then(`${FARMER_URL}/${uid}.json`)
      .then(response => response.json()).catch(error => error)
  }

  return {
    signup,
    login,
    logout,
    addProfile,
    getFarmerProfile,

  }
}

export default FirebaseService()