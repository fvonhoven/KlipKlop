import firebase from "firebase"
require("firebase/firebase-auth")
require("firebase/firestore")
import { Storage } from "aws-amplify"

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

export const uploadToS3 = async (media, path, progressCallback) => {
  return new Promise((resolve, reject) => {
    fetch(media)
      .then(response => response.blob())
      .then(blob => {
        return Storage.put(path, blob, {
          level: "public",
          contentType: blob.type,
          progressCallback(uploadProgress) {
            path.includes("video") && progressCallback(Math.round((uploadProgress.loaded / uploadProgress.total) * 100))
            // console.log(`Progress: ${Math.round((uploadProgress.loaded / uploadProgress.total) * 100)}`)
          },
        })
      })
      .then(res => {
        Storage.get(res.key)
          .then(downloadUrl => resolve(downloadUrl))
          .catch(err => {
            // progressCallback("Upload Error")
            console.log(err)
          })
      })
  }).catch(err => console.log(err))
}
