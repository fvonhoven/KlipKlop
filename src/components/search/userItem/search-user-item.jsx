import { Image, TouchableOpacity, Text } from "react-native"
import React from "react"
import { Feather } from "@expo/vector-icons"
import styles from "./styles"

export function SearchUserItem({ item }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>{item.displayName}</Text>
      <Text style={styles.text}>{item.email}</Text>
      <Image source={{ uri: item.photoURL }} style={styles.image} />
    </TouchableOpacity>
  )
}
