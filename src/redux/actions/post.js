import firebase from "firebase"
require("firebase/firebase-auth")
require("firebase/firestore")
import { saveMediaToStorage, uploadToS3 } from "./utils"
import { CURRENT_USER_POSTS_UPDATE } from "../constants"
import uuid from "uuid-random"

export const createPost = (description, video, thumbnail, progressCallback) => () =>
  new Promise((resolve, reject) => {
    let storagePostId = uuid()

    const videoFilename = video.substring(video.lastIndexOf("/") + 1)
    const thumbnailFilename = thumbnail.substring(thumbnail.lastIndexOf("/") + 1)
    let allSavePromises = Promise.all([
      uploadToS3(
        video,
        `posts/${firebase.auth().currentUser.uid}/${storagePostId}/video/${videoFilename}`,
        progressCallback,
      ),
      uploadToS3(
        thumbnail,
        `posts/${firebase.auth().currentUser.uid}/${storagePostId}/thumbnail/${thumbnailFilename}`,
        progressCallback,
      ),
    ])
    console.log("ALL SAVE", allSavePromises)

    allSavePromises
      .then(media => {
        console.log("MEDIA", media)
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
  dispatch =>
    new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("posts")
        .where("creator", "==", uid)
        .orderBy("createdAt", "desc")
        .onSnapshot(snapshot => {
          let posts = snapshot.docs.map(doc => {
            const data = doc.data()
            const id = doc.id
            return { id, ...data }
          })
          dispatch({
            type: CURRENT_USER_POSTS_UPDATE,
            currentUserPosts: posts,
          })
        })
    }).catch(error => {
      console.log(error)
    })
