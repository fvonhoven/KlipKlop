import firebase from "firebase"
import React from "react"
import { View, Text, Image } from "react-native"
import styles from "./styles"
import { useUser } from "../../../../hooks/useUser"

export function SingleChatItem({ item }) {
  const { data: userData, isLoading } = useUser(item.creator)
  if (isLoading) return null

  const isCurrentUser = item.creator === firebase.auth().currentUser.uid
  return (
    <View style={isCurrentUser ? styles.containerCurrent : styles.containerOther}>
      <Image source={{ uri: userData.photoURL }} style={styles.avatar} />
      <View style={isCurrentUser ? styles.containerTextCurrent : styles.containerTextOther}>
        <Text style={styles.chatText}>{item.message}</Text>
      </View>
    </View>
  )
}
