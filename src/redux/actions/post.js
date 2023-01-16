import { db, auth } from "../../firebase/firestore"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"

export const createPost = (description, downloadURL) => async (dispatch) => {
  const user = auth.currentUser.uid
  try {
    await setDoc(doc(db, "posts", user), {
      creator: user,
      downloadUrl: downloadURL,
      description,
      likesCount: 0,
      commentsCount: 0,
      createdAt: serverTimestamp(),
    })
  } catch (error) {
    console.log(error)
  }
}
