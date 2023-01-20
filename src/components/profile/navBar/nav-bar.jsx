import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import { Feather } from "@expo/vector-icons"
import styles from "./styles"

export function ProfileNavBar({ user }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Feather name="search" size={20} />
      </TouchableOpacity>
      <Text style={styles.text}>{user.displayName}</Text>
      <TouchableOpacity>
        <Feather name="menu" size={24} />
      </TouchableOpacity>
    </View>
  )
}
