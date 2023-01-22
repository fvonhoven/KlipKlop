import { View, TouchableOpacity, Text } from "react-native"
import React from "react"
import { Feather } from "@expo/vector-icons"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"

export function NavBar({ title = "NavBar", leftButton = { display: true }, rightButton = { display: false } }) {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => (leftButton.display ? navigation.goBack() : null)}>
        {leftButton.display && <Feather name="arrow-left" size={26} color="black" />}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.button} onPress={() => (rightButton.display ? rightButton.action() : null)}>
        {rightButton.display && <Feather name={rightButton.name} size={26} color={"pink"} />}
      </TouchableOpacity>
    </View>
  )
}
