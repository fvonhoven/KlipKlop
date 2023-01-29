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

const fetchImageUri = async uri => {
  const response = await fetch(uri)
  const blob = await response.blob()
  return blob
}

export const uploadFile = async (filename, file) =>
  new Promise((resolve, reject) => {
    console.log("file: ", file)
    // resolve()
    // fetch(media)
    //   .then(response => response.blob())
    //   .then(blob => fileRes.put(blob))
    //   .then(task => console.log("task", task))

    // resolve()
    // const img = await fetchImageUri(file)
    return Storage.put(filename, img, {
      contentType: file.type,
      level: "public",
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`)
      },
    }).then(res => {
      console.log("res: ", res)
      Storage.length(res.key)
        .then(result => {
          console.log("result: ", result)
        })
        .catch(err => {
          console.log("err: ", err)
        })
      // return result
    })
  })
    .then(() => resolve())
    .catch(() => reject())
