import { db } from "../firebase/firestore"
import { getDocs, collection } from "firebase/firestore"

export const getFeed = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"))
    const posts = []
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() })
    })
    console.log("posts", posts)
    return posts
  } catch (error) {
    console.log(error)
  }
}
