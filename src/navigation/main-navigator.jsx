import React, { useEffect } from "react"
import { View } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AuthScreen, SavePostScreen } from "../screens"
import HomeNavigator from "./home-navigator"
import { useSelector, useDispatch } from "react-redux"
import { userAuthStateListener } from "../redux/actions"
import { EditProfileScreen } from "../components/profile/edit/edit-profile-screen"
import { EditProfileFieldScreen } from "../components/profile/edit/field/edit-field"

const Stack = createNativeStackNavigator()

export default function MainNavigator() {
  const currentUserObject = useSelector(state => state.auth)
  const dispatch = useDispatch()

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
          <Stack.Screen name="HomeNavigator" component={HomeNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="savePost" component={SavePostScreen} options={{ headerShown: false }} />
          <Stack.Screen name="editProfile" component={EditProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="editProfileField" component={EditProfileFieldScreen} options={{ headerShown: false }} />
        </>
      ) : (
        <Stack.Screen name="AuthNavigator" component={AuthScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  )
}
