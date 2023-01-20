import firebase from "firebase"
import { saveMediaToStorage } from "../redux/actions"

export const saveUserProfileImage = image =>
  new Promise((resolve, reject) => {
    saveMediaToStorage(image, `profileImage/${firebase.auth().currentUser.uid}`)
      .then(downloadUrl => {
        console.log("downloadUrl", downloadUrl)
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).update({
          photoURL: downloadUrl,
        })
      })
      .then(() => resolve())
      .catch(() => reject())
  })

export const saveUserField = obj =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update(obj)
      .then(() => resolve())
      .catch(() => reject())
  })

export const queryUsersByEmail = email =>
  new Promise((resolve, reject) => {
    if (email === "") {
      resolve([])
    }

    firebase
      .firestore()
      .collection("users")
      .where("email", ">=", email)
      .where("email", "<=", email + "\uf8ff")
      .get()
      .then(snapshot => {
        let users = snapshot.docs.map(doc => {
          const id = doc.id
          const data = doc.data()
          return { id, ...data }
        })
        resolve(users)
      })
      .catch(() => reject())
  })

export const getUserById = id =>
  new Promise((resolve, reject) => {
    console.log("GET USER BY ID", id)
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .get()
      .then(snapshot => {
        resolve(snapshot.exists ? snapshot.data() : null)
      })
      .catch(() => reject())
  })
