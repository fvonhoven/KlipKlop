import firebase from "firebase"
require("firebase/firebase-auth")
require("firebase/firestore")

export const saveMediaToStorage = (media, path) =>
  new Promise((resolve, reject) => {
    const fileRes = firebase.storage().ref().child(path)
    return fetch(media)
      .then(response => response.blob())
      .then(blob => fileRes.put(blob))
      .then(task => task.ref.getDownloadURL())
      .then(downloadUrl => resolve(downloadUrl))
      .catch(() => reject())
  })
