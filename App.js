import firebase from "firebase"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./src/redux/reducers"
import MainNavigator from "./src/navigation/main-navigator"
import { NavigationContainer } from "@react-navigation/native"
import { firebaseConfig } from "./src/firebase/firestore"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { Modal } from "./src/components/general/modal"
import { LogBox } from "react-native"
const store = createStore(rootReducer, applyMiddleware(thunk))
import awsconfig from "./src/aws-exports"
import { Amplify } from "aws-amplify"

Amplify.configure(awsconfig)

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
])
function App() {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
  }

  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchInterval: false, staleTime: Infinity } },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer>
          <MainNavigator />
          <Modal />
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
