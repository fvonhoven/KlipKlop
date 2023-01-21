import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { FeedScreen, ProfileScreen } from "../screens"
import { NavigationContextProvider } from "./context/provider"

const Tab = createMaterialTopTabNavigator()

export function FeedNavigator() {
  return (
    <NavigationContextProvider>
      <Tab.Navigator initialRouteName="feedList" tabBar={() => <></>}>
        <Tab.Screen name="feedList" component={FeedScreen} />
        <Tab.Screen name="feedProfile" component={ProfileScreen} />
        <Tab.Screen name="userPost" component={FeedScreen} options={{ gesturesEnabled: true }} />
      </Tab.Navigator>
    </NavigationContextProvider>
  )
}
