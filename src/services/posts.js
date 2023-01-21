import firebase from "firebase"

let commentListenerInstance = null

export const getFeed = () =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("posts")
      .get()
      .then(res => {
        const posts = res.docs.map(value => {
          const id = value.id
          const data = value.data()
          return { id, ...data }
        })
        resolve(posts)
      })
      .catch(() => reject())
  })

export const getPostsByUserId = (uid = firebase.auth().currentUser.uid) =>
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
        // console.log("POSTS", posts)
        resolve(posts)
      })
  }).catch(error => {
    console.log(error)
  })

export const getLikeById = (postId, uid) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("likes")
      .doc(uid)
      .get()
      .then(res => resolve(res.exists))
      .catch(() => reject())
  })

export const updateLike = (postId, uid, currentLikeState) =>
  new Promise((resolve, reject) => {
    if (currentLikeState) {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .collection("likes")
        .doc(uid)
        .delete()
        .catch(() => reject())
    } else {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .collection("likes")
        .doc(uid)
        .set({})
        .catch(() => reject())
    }
  })

export const addComment = (postId, creator, comment) => {
  console.log("ADD COMMENT", postId, creator, comment)
  firebase.firestore().collection("posts").doc(postId).collection("comments").add({
    creator,
    comment,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
}

export const commentListener = (postId, setCommentList) => {
  commentListenerInstance = firebase
    .firestore()
    .collection("posts")
    .doc(postId)
    .collection("comments")
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
      if (snapshot.docChanges().length === 0) return
      let comments = snapshot.docs.map(doc => {
        const data = doc.data()
        const id = doc.id
        return { id, ...data }
      })
      setCommentList(comments)
    })
}

export const clearCommentListener = () => {
  console.log("CLEAR COMMENT LISTENER")
  if (commentListenerInstance != null) {
    commentListenerInstance()
    commentListenerInstance = null
  }
}
