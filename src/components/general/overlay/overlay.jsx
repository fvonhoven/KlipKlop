import React from "react"
import { View, Text, Image } from "react-native"
import styles from "./styles"

export function PostSingleOverlay({ user, post }) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.displayName}>{user?.displayName}</Text>
        <Text style={styles.description}>{post?.description}</Text>
      </View>
      <Image source={{ uri: user?.photoURL }} style={styles.avatar} />
    </View>
  )
}
