import firebase from "firebase"
import { saveMediaToStorage, uploadToS3 } from "../redux/actions"

export const saveUserProfileImage = image =>
  new Promise((resolve, reject) => {
    uploadToS3(image, `profileImage/${firebase.auth().currentUser.uid}`)
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

export const getIsFollowing = (userId, otherUserId) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("following")
      .doc(otherUserId)
      .get()
      .then(doc => {
        resolve(doc.exists)
      })
      .catch(() => reject())
  })

export const changeFollowState = ({ otherUserId, isFollowing }) =>
  new Promise((resolve, reject) => {
    if (isFollowing) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("following")
        .doc(otherUserId)
        .delete()
        .then(doc => resolve())
        .catch(() => reject())
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("following")
        .doc(otherUserId)
        .set({})
        .then(doc => resolve())
        .catch(() => reject())
    }
  })
