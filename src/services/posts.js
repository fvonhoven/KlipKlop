import firebase from "firebase"
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
