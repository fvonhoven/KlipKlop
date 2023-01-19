import firebase from "firebase"
require("firebase/firebase-auth")
import { USER_STATE_CHANGE } from "../constants"
import { getPostsByUser } from "./post"

export const userAuthStateListener = () => (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(getCurrentUserData(user.uid))
      dispatch(getPostsByUser(user.uid))
    } else {
      dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true })
    }
  })
}

export const getCurrentUserData = (userId) => (dispatch) => {
  console.log("GET CURRENT USER DATA", userId)
  firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .onSnapshot((snapshot) => {
      if (snapshot.exists) {
        dispatch({
          type: USER_STATE_CHANGE,
          currentUser: snapshot.data(),
          loaded: true,
        })
      } else {
        console.log("does not exist")
      }
    })
}

export const login = (email, password) => (dispatch) =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        resolve()
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })

export const register = (email, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        resolve()
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}

export const appLogout = () => (dispatch) =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        resolve()
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
