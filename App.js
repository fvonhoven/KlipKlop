import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./src/redux/reducers"
import MainNavigator from "./src/navigation/main-navigator"
import { NavigationContainer } from "@react-navigation/native"
import firebase from "firebase"
import { firebaseConfig } from "./src/firebase/firestore"

const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  )
}
