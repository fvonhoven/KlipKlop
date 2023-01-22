import React from "react"
import { View } from "react-native"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { CameraScreen, ProfileScreen, ChatListScreen } from "../screens"
import { Feather } from "@expo/vector-icons"
import { SearchScreen } from "../screens/search/search-screen"
import { FeedNavigator } from "./feed-navigator"
import { useChats } from "../hooks/useChats"

const Tab = createMaterialBottomTabNavigator()

const EmptyScreen = () => {
  return <View />
}

export default function HomeNavigator() {
  useChats()
  return (
    <Tab.Navigator barStyle={{ backgroundColor: "black" }} initialRouteName="Add">
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color }) => <Feather name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => <Feather name="search" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Add"
        component={CameraScreen}
        options={{
          tabBarIcon: ({ color }) => <Feather name="plus-square" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={ChatListScreen}
        options={{
          tabBarIcon: ({ color }) => <Feather name="message-square" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Me"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <Feather name="user" color={color} size={26} />,
        }}
      />
    </Tab.Navigator>
  )
}
