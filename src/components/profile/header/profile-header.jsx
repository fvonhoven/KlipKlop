import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Avatar } from "react-native-paper"
import styles from "./styles"

export function ProfileHeader({ user, navigation }) {
  return (
    <View style={styles.container}>
      <Avatar.Icon size={60} icon="account" />
      <Text style={styles.emailText}>{user.email}</Text>
      <View style={styles.counterContainer}>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Followers</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Followers</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Likes</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.grayOutlinedButton}
        onPress={() => navigation.navigate("editProfile")}
      >
        <Text style={styles.grayOutlinedButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  )
}
