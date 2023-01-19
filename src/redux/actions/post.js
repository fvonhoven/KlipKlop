import firebase from "firebase"
require("firebase/firebase-auth")
require("firebase/firestore")
import { saveMediaToStorage } from "./utils"
import { CURRENT_USER_POSTS_UPDATE } from "../constants"
import uuid from "uuid-random"

export const createPost = (description, video, thumbnail) => (dispatch) =>
  new Promise((resolve, reject) => {
    let storagePostId = uuid()

    const videoFilename = video.substring(video.lastIndexOf("/") + 1)
    const thumbnailFilename = thumbnail.substring(
      thumbnail.lastIndexOf("/") + 1
    )
    let allSavePromises = Promise.all([
      saveMediaToStorage(
        video,
        `posts/${
          firebase.auth().currentUser.uid
        }/${storagePostId}/video/${videoFilename}`
      ),
      saveMediaToStorage(
        thumbnail,
        `posts/${
          firebase.auth().currentUser.uid
        }/${storagePostId}/thumbnail/${thumbnailFilename}`
      ),
    ])

    allSavePromises
      .then((media) => {
        firebase
          .firestore()
          .collection("posts")
          .add({
            creator: firebase.auth().currentUser.uid,
            media,
            description,
            likesCount: 0,
            commentsCount: 0,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => resolve())
          .catch(() => reject())
      })
      .catch(() => reject())
  })

export const getPostsByUser =
  (uid = firebase.auth().currentUser.uid) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      console.log("GET POSTS")
      firebase
        .firestore()
        .collection("posts")
        .where("creator", "==", uid)
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data()
            const id = doc.id
            console.log("DOC", doc)
            return { id, ...data }
          })
          dispatch({
            type: CURRENT_USER_POSTS_UPDATE,
            currentUserPosts: posts,
          })
        })
    }).catch((error) => {
      console.log(error)
    })
