import React from "react"
import { View, Image } from "react-native"
import styles from "./styles"

export function ProfilePostsListItem({ item }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item?.media[1] }} />
    </View>
  )
}
