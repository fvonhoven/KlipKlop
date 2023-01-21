import React from "react"
import { View, Text, Image } from "react-native"
import styles from "./styles"
import { useUser } from "../../../../../hooks/useUser"

export function CommentItem({ item }) {
  const user = useUser(item.creator).data
  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.photoURL }} style={styles.avatar} />
      <View style={styles.containerText}>
        <Text style={styles.displayName}>{user?.displayName || "Display Name"}</Text>
        <Text>{item.comment}</Text>
      </View>
    </View>
  )
}
