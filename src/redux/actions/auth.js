import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"

import { USER_STATE_CHANGE } from "../constants"
import { auth } from "../../firebase/firestore"

export const userAuthStateListener = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(getCurrentUserData(user.uid))
    } else {
      dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true })
    }
  })
}

export const getCurrentUserData = (userId) => (dispatch) => {
  const user = auth.currentUser
  if (user) {
    return dispatch({
      type: USER_STATE_CHANGE,
      currentUser: user,
      loaded: true,
    })
  } else {
    console.log("does not exist")
  }
}

export const login = (email, password) => (dispatch) =>
  new Promise((resolve, reject) => {
    console.log(email, password)
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        resolve()
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })

export const register = (email, password) => (dispatch) => {
  console.log({ email, password })
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
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
    signOut(auth)
      .then(() => {
        resolve()
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
