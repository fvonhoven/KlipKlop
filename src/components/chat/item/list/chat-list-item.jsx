import firebase from "firebase"
import React from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
import { useUser } from "../../../../hooks/useUser"
import { format } from "date-fns"
import styles from "./styles"

export function ChatListItem({ chat }) {
  const { data: userData } = useUser(
    chat.members[0] === firebase.auth().currentUser.uid ? chat.members[1] : chat.members[0],
  )
  console.log(chat)

  if (!userData) return null

  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: userData.photoURL }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.userDisplayName}>{userData.displayName}</Text>
        <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
      </View>
      <Text style={styles.date}>{format(new Date(chat.lastUpdate), "M/d/yyyy h:mm a")}</Text>
    </TouchableOpacity>
  )
}
