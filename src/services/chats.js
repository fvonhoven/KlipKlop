import firebase from "firebase"

export const chatsListener = listener => {
  firebase
    .firestore()
    .collection("chats")
    .where("members", "array-contains", firebase.auth().currentUser.uid)
    .orderBy("lastUpdate", "desc")
    .onSnapshot(listener)
}

export const messagesListener = (listener, chatId) => {
  firebase
    .firestore()
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .orderBy("createdAt", "desc")
    .onSnapshot(listener)
}

export const sendMessage = (chatId, message) => {
  firebase.firestore().collection("chats").doc(chatId).collection("messages").add({
    creator: firebase.auth().currentUser.uid,
    message,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })

  firebase.firestore().collection("chats").doc(chatId).update({
    lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
    lastMessage: message,
  })
}

export const createChat = contactId =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("chats")
      .add({
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        lastMessage: "Send first message",
        members: [contactId, firebase.auth().currentUser.uid],
      })
      .then(resolve)
      .catch(reject)
  })
