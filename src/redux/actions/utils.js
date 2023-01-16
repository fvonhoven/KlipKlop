import { storage, storageRef } from "../../firebase/firestore"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"

export const saveMediaToStorage = async (media, file) => {
  try {
    const filename = media.substring(media.lastIndexOf("/") + 1)
    const task = storage()
      .ref(`tacos/${filename}`)
      .putFile(media.replace("file://", ""))
    task.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        console.log("PROGRESS: ", progress)
      },
      (error) => {
        alert(error)
      },
      () => {
        getDownloadURL(task.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL)
        })
      }
    )
  } catch (error) {
    console.log("ERROR", error)
  }
}
