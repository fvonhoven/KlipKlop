import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage"
import { collection, where, query, orderBy, getDocs } from "firebase/firestore"
import { db, auth } from "../firebase/firestore"
import { updateProfile } from "firebase/auth"

export const saveUserProfileImage = async (image) => {
  let imageStorageRef, blob
  const user = auth.currentUser.uid
  try {
    const storage = getStorage()
    blob = await fetch(image).then((res) => res.blob())
    const filename = image.substring(image.lastIndexOf("/") + 1)
    imageStorageRef = ref(storage, `profileImage/${user}/${filename}`)
    console.log("TRYING TO UPLOAD")
    const uploadTask = uploadBytesResumable(imageStorageRef, blob, {
      contentType: "image/jpg",
    })
    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Upload is " + progress + "% done")
      },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          console.log("File available at", downloadUrl)
          updateProfile(auth.currentUser, {
            photoURL: downloadUrl,
            phoneNumber: 1234567890,
          })
            .then(() => {
              console.log("USER PROFILE UPDATED")
            })
            .catch((error) => {
              console.log(error)
            })
        })
      }
    )
  } catch (error) {
    console.log(error)
  }
}
export const saveVideoToFirebase = async (image) => {
  let imageStorageRef, blob
  const user = auth.currentUser.uid
  try {
    const storage = getStorage()
    blob = await fetch(image).then((res) => res.blob())
    const filename = image.substring(image.lastIndexOf("/") + 1)
    imageStorageRef = ref(storage, `profileImage/${user}/${filename}`)
    console.log("TRYING TO UPLOAD")
    const uploadTask = uploadBytesResumable(imageStorageRef, blob, {
      contentType: "image/jpg",
    })
    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Upload is " + progress + "% done")
      },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          console.log("File available at", downloadUrl)
          updateProfile(auth.currentUser, {
            photoURL: downloadUrl,
            phoneNumber: 1234567890,
          })
            .then(() => {
              console.log("USER PROFILE UPDATED")
            })
            .catch((error) => {
              console.log(error)
            })
        })
      }
    )
  } catch (error) {
    console.log(error)
  }
}

export const saveUserField = async (obj) => {
  try {
    await updateProfile(auth.currentUser, obj)
  } catch (error) {
    console.log(error)
  }
}

export const queryUsersByEmail = async (email) => {
  let users = []
  if (email === "") return users
  try {
    const q = query(
      collection(db, "users"),
      where("email", ">=", email),
      where("email", "<=", email + "\uf8ff"),
      orderBy("email", "desc")
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => users.push({ id: doc.id, ...doc.data() }))
    return users
  } catch (error) {
    console.log(error)
  }
}