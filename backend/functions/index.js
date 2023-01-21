const functions = require("firebase-functions")

const admin = require("firebase-admin")
admin.initializeApp()

const db = admin.firestore()

exports.newUser = functions.auth.user().onCreate(user => {
  return db
    .collection("users")
    .doc(user.uid)
    .create(JSON.parse(JSON.stringify(user)))
})

exports.likeCreate = functions.firestore.document("posts/{id}/{type}/{uid}").onCreate((_, context) => {
  let updateObject = {}
  if (context.params.type === "comments") {
    updateObject = {
      commentsCount: admin.firestore.FieldValue.increment(1),
    }
  }
  if (context.params.type === "likes") {
    updateObject = {
      likesCount: admin.firestore.FieldValue.increment(1),
    }
  }
  return db.collection("posts").doc(context.params.id).update(updateObject)
})

exports.likeDelete = functions.firestore.document("posts/{id}/{type}/{uid}").onDelete((_, context) => {
  let updateObject = {}
  if (context.params.type === "comments") {
    updateObject = {
      commentsCount: admin.firestore.FieldValue.increment(-1),
    }
  }
  if (context.params.type === "likes") {
    updateObject = {
      likesCount: admin.firestore.FieldValue.increment(-1),
    }
  }
  return db.collection("posts").doc(context.params.id).update(updateObject)
})
