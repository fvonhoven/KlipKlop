import { CURRENT_USER_POSTS_UPDATE } from "../constants"
import { db, auth } from "../../firebase/firestore"
import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  where,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore"

export const createPost =
  (description, downloadVideoUrl, downloadThumbnailUrl) => async (dispatch) => {
    const user = auth.currentUser.uid
    try {
      const storageRef = doc(db, "posts", user)
      setDoc(storageRef, {
        creator: user,
        media: [downloadVideoUrl, downloadThumbnailUrl],
        description,
        likesCount: 0,
        commentsCount: 0,
        createdAt: serverTimestamp(),
      })
    } catch (error) {
      console.log(error)
    }
  }

export const getPostsByUser =
  (uid = auth.currentUser.uid) =>
  async (dispatch) => {
    let posts = []
    try {
      const q = query(
        collection(db, "posts"),
        where("creator", "==", uid),
        orderBy("createdAt", "desc")
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => posts.push({ id: doc.id, ...doc.data() }))
      console.log("posts", posts)
      dispatch({
        type: CURRENT_USER_POSTS_UPDATE,
        currentUserPosts: posts,
      })
    } catch (error) {
      console.log(error)
    }
  }
