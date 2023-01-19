import React from "react"
import { SafeAreaView, Text, TextInput, View } from "react-native"
import { Divider } from "react-native-paper"
import { useSelector } from "react-redux"
import { saveUserField } from "../../../../services/user"
import { NavBar } from "../../../general/navbar/navbar"
import styles from "./styles"

export function EditProfileFieldScreen({ route, navigation }) {
  const { title } = route.params
  const currentUser = useSelector((state) => state.auth.currentUser)
  const [inputs, setInputs] = React.useState({ ...currentUser })
  const onSave = async () => {
    saveUserField(inputs).then(() => {
      navigation.goBack()
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <NavBar
        title={title}
        leftButton={{ display: true, name: "save", action: onSave }}
      />
      <Divider />
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          style={styles.textInput}
          value={inputs.displayName}
          onChangeText={(text) => setInputs({ ...inputs, displayName: text })}
        />
        <Text style={styles.title}>{title}</Text>
        <TextInput
          style={styles.textInput}
          value={inputs.phoneNumber}
          onChangeText={(text) => setInputs({ ...inputs, phoneNumber: text })}
        />
      </View>
    </SafeAreaView>
  )
}
