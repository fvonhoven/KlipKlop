import { StackActions, useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import {
  View,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native"
import { Feather } from "@expo/vector-icons"
import styles from "./styles"
import { ActivityIndicator } from "react-native-paper"
import { useDispatch } from "react-redux"
import { uploadBytes, getStorage, ref, getDownloadURL } from "firebase/storage"
import { createPost } from "../../redux/actions"

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

export function SavePostScreen(props) {
  const navigation = useNavigation()
  const [postDescription, setPostDescription] = useState("")
  const [requestRunning, setRequestRunning] = useState(false)
  const dispatch = useDispatch()

  const saveVideoToFirebase = async () => {
    setRequestRunning(true)
    const response = await fetch(
      props.route.params.source.replace("file://", "")
    )

    const blob = await response.blob()
    const storage = getStorage()
    const filename = props.route.params.source.substring(
      props.route.params.source.lastIndexOf("/") + 1
    )
    const storageRef = ref(storage, `posts/${filename}`)

    try {
      const snapshot = await uploadBytes(storageRef, blob)
      console.log("Uploaded a blob or file!", snapshot)
    } catch (err) {
      console.log("ERROR", err)
    }
    setRequestRunning(false)
    const downloadUrl = await getDownloadURL(storageRef)
    dispatch(createPost(postDescription, downloadUrl))
    navigation.dispatch(StackActions.popToTop())
    console.log("Video available at: ", downloadUrl)
  }

  if (requestRunning) {
    return (
      <View style={styles.uploadingContainer}>
        <ActivityIndicator color="red" size="large" />
      </View>
    )
  }

  return (
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputText}
            maxLength={150}
            multiline
            placeholder="Describe your post"
            onChangeText={setPostDescription}
            value={postDescription}
          />
          <Image
            style={styles.mediaPreview}
            source={{ uri: props?.route?.params?.source || TEST_SOURCE }}
          />
        </View>
        <View style={{ flex: 1 }} />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
          >
            <Feather name="x" size={32} color="#000" />
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={saveVideoToFirebase}
            style={styles.postButton}
          >
            <Feather name="corner-left-up" size={32} color="#fff" />
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </HideKeyboard>
  )
}
