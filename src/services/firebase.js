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
          currentUser = user
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
          currentUser = profile.uid
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

  const addProfile = (user) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${FARMER_URL}/${user.uid}.json`,
        type: "PUT",
        data: JSON.stringify(farmerObj),
        dataType: 'json'
      }).done((data) => {
        resolve(data)
      }).fail((error) => {
        console.log("Error", error)
        reject(error)
      })
    })
  }

  const getFarmerProfile = (uid) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${FARMER_URL}/${uid}.json`,
        type: "GET"
      }).done((data) => {
        resolve(data)
      }).fail((error) => {
        console.log("Error", error)
        reject(error)
      })
    })
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