import { initializeApp } from "firebase/app"
// authentication
import { initializeAuth } from "firebase/auth"
import { getReactNativePersistence } from "firebase/auth/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
// firestore
import { getFirestore } from "firebase/firestore"
// cloud storage
import { getStorage } from "firebase/storage"

// import { firebaseKey } from "../config"

const firebaseConfig = {
  apiKey: "AIzaSyAevJc6_gsDGTVRHivpED0pAdWfYg6jf0A",
  authDomain: "klipklap-f9361.firebaseapp.com",
  databaseURL: "https://klipklap-f9361-default-rtdb.firebaseio.com",
  projectId: "klipklap-f9361",
  storageBucket: "klipklap-f9361.appspot.com",
  messagingSenderId: "953149725694",
  appId: "1:953149725694:web:e7182e606dedfa20c07eaf",
  measurementId: "G-615EFPWDVZ",
}

const app = initializeApp(firebaseConfig)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})
const firestore = getFirestore()
const db = getFirestore(app)
const storage = getStorage()

export { auth, firestore, db, storage }
