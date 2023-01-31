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
import { createPost } from "../../redux/actions"

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
)

export function SavePostScreen(props) {
  const navigation = useNavigation()
  const [postDescription, setPostDescription] = useState("")
  const [progressText, setProgressText] = useState("")
  const [requestRunning, setRequestRunning] = useState(false)
  const dispatch = useDispatch()

  const uploadResource = async imageUri => {
    const response = await fetch(imageUri)
    const blob = await response.blob()

    try {
      return await Storage.put("testBucket/TACOS1", blob, {
        level: "public",
        contentType: blob.type,
        progressCallback(uploadProgress) {
          setProgressText(`Progress: ${Math.round((uploadProgress.loaded / uploadProgress.total) * 100)} %`)
          console.log(`Progress: ${Math.round((uploadProgress.loaded / uploadProgress.total) * 100)} %`)
        },
      })
        .then(res => {
          Storage.get(res.key)
            .then(downloadUrl => console.log("DOWNLOAD URL", downloadUrl))
            .catch(err => {
              setProgressText("Upload Error")
              console.log(err)
            })
        })
        .catch(err => {
          setProgressText("Upload Error")
          console.log(err)
        })
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleSavePost = () => {
    setRequestRunning(true)
    dispatch(
      createPost(postDescription, props?.route?.params?.source, props?.route?.params?.sourceThumb, prog =>
        setProgressText(prog),
      ),
    )
      .then(() => navigation.dispatch(StackActions.popToTop()))
      .catch(() => setRequestRunning(false))
  }

  if (requestRunning) {
    return (
      <View style={styles.uploadingContainer}>
        <ActivityIndicator color="red" size="large" />
        <Text>Progress: {(parseInt(progressText, 10) / 2).toString()}</Text>
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
            autoFocus
            placeholder="Describe your post"
            onChangeText={setPostDescription}
            value={postDescription}
          />
          <Image style={styles.mediaPreview} source={{ uri: props?.route?.params?.source || TEST_SOURCE }} />
        </View>
        <View style={{ flex: 1 }} />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
            <Feather name="x" size={32} color="#000" />
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSavePost()} style={styles.postButton}>
            <Feather name="corner-left-up" size={32} color="#fff" />
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </HideKeyboard>
  )
}
