import firebase from "firebase"
import React from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
import { useUser } from "../../../../hooks/useUser"
import moment from "moment-timezone"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"

export function ChatListItem({ chat }) {
  const navigation = useNavigation()
  const { data: userData } = useUser(
    chat.members[0] === firebase.auth().currentUser.uid ? chat.members[1] : chat.members[0],
  )
  if (!userData) return null

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("singleChat", { chatId: chat.id })}>
      <Image source={{ uri: userData?.photoURL }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.userDisplayName}>{userData.displayName}</Text>
        <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
      </View>
      <Text style={styles.date}>
        {chat.lastUpdate
          ? moment(new Date(chat.lastUpdate.seconds * 1000).toISOString())
              .tz("America/Chicago")
              .format("M/D/YY h:mm a")
          : "Now"}
      </Text>
    </TouchableOpacity>
  )
}
