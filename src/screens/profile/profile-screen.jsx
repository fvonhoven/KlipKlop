import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { appLogout } from "../../redux/actions"
import { useDispatch } from "react-redux"
import styles from "./styles"

export function ProfileScreen() {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(appLogout())
  }

  return (
    <View style={styles.container}>
      <Text>profile-screen</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}
