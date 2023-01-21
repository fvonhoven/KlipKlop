import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./src/redux/reducers"
import MainNavigator from "./src/navigation/main-navigator"
import { NavigationContainer } from "@react-navigation/native"
import firebase from "firebase"
import { firebaseConfig } from "./src/firebase/firestore"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { Modal } from "./src/components/general/modal"

const store = createStore(rootReducer, applyMiddleware(thunk))

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
