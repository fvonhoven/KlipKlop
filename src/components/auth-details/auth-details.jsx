import React from "react"
import { View, Text, TouchableOpacity, TextInput } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { useDispatch } from "react-redux"
import { login, register } from "../../redux/actions"
import styles from "./styles"

export function AuthDetails({ authPage, setDetailsPage }) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const dispatch = useDispatch()
  const handleLogin = () => {
    dispatch(login(email, password))
      .then(() => {
        console.log("Login Successful")
      })
      .catch(() => {
        console.log("Login Failed")
      })
  }

  const handleRegister = () => {
    dispatch(register(email, password))
      .then(() => {
        console.log("Register Successful")
      })
      .catch(() => {
        console.log("Register Failed")
      })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setDetailsPage(false)}>
        <Icon name="arrow-left" size={20} color="black" />
      </TouchableOpacity>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        autoCapitalize="none"
        secureTextEntry
        style={styles.textInput}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          {
            authPage ? handleLogin() : handleRegister()
          }
          setDetailsPage(false)
        }}
      >
        <Text style={styles.buttonText}>
          {authPage ? "Sign In" : "Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
