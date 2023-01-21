import { Image, TouchableOpacity, Text } from "react-native"
import React from "react"
// import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import styles from "./styles"

export function SearchUserItem({ item }) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("profileOther", { initialUserId: item.uid })}
    >
      <Text style={styles.text}>{item.displayName}</Text>
      <Text style={styles.text}>{item.email}</Text>
      <Image source={{ uri: item.photoURL }} style={styles.image} />
    </TouchableOpacity>
  )
}
