import React, { useEffect } from "react"
import { View, SafeAreaView } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AuthScreen, SavePostScreen } from "../screens"
import HomeNavigator from "./home-navigator"
import { useSelector, useDispatch } from "react-redux"
import { userAuthStateListener } from "../redux/actions"

const Stack = createNativeStackNavigator()

export default function MainNavigator() {
  const currentUserObject = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  currentUserObject.currentUser &&
    console.log("User is logged in: ", currentUserObject.currentUser.email)
  useEffect(() => {
    dispatch(userAuthStateListener())
  }, [])

  if (!currentUserObject.loaded) {
    return <View />
  }

  return (
    <Stack.Navigator>
      {currentUserObject?.currentUser ? (
        <>
          <Stack.Screen
            name="HomeNavigator"
            component={HomeNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="savePost"
            component={SavePostScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen
          name="AuthNavigator"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  )
}
