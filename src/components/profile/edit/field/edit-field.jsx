import React from "react"
import { SafeAreaView, Text, TextInput, View } from "react-native"
import { Divider } from "react-native-paper"
import { useSelector } from "react-redux"
import { saveUserField } from "../../../../services/user"
import { NavBar } from "../../../general/navbar/navbar"
import styles from "./styles"

export function EditProfileFieldScreen({ route, navigation }) {
  const { title } = route.params
  const currentUser = useSelector(state => state.auth.currentUser)
  const [displayName, setDisplayName] = React.useState(currentUser.displayName)
  const [phoneNumber, setPhoneNumber] = React.useState(currentUser.phoneNumber)
  const onSave = () => {
    saveUserField({ displayName, phoneNumber }).then(() => {
      navigation.goBack()
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <NavBar title={title} rightButton={{ display: true, name: "save", action: onSave }} />
      <Divider />
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{title}</Text>
        <TextInput style={styles.textInput} value={displayName} onChangeText={setDisplayName} />
        <Text style={styles.title}>Phone Number</Text>
        <TextInput style={styles.textInput} value={phoneNumber} onChangeText={setPhoneNumber} />
      </View>
    </SafeAreaView>
  )
}
