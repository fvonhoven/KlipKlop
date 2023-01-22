import firebase from "firebase"

export const chatsListener = listener => {
  firebase
    .firestore()
    .collection("chats")
    .where("members", "array-contains", firebase.auth().currentUser.uid)
    .orderBy("lastUpdate", "desc")
    .onSnapshot(listener)
}
