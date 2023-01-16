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
import { auth } from "../../firebase/firestore"

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
    const user = auth.currentUser.uid
    setRequestRunning(true)

    const storage = getStorage()

    const videoResponse = await fetch(
      props.route.params.source.replace("file://", "")
    )
    const videoBlob = await videoResponse.blob()
    const videoFilename = props.route.params.source.substring(
      props.route.params.source.lastIndexOf("/") + 1
    )
    const thumbnailResponse = await fetch(
      props.route.params.sourceThumb.replace("file://", "")
    )

    const thumbnailBlob = await thumbnailResponse.blob()

    const thumbnailFilename = props.route.params.sourceThumb.substring(
      props.route.params.source.lastIndexOf("/") + 1
    )
    const videoMetadata = { contentType: "video/mov" }
    const thumbnailMetadata = { contentType: "image/jpg" }

    const videoStorageRef = ref(
      storage,
      `posts/${user}/video/${videoFilename}`,
      videoMetadata
    )
    const thumbnailStorageRef = ref(
      storage,
      `posts/${user}/thumbnail/${thumbnailFilename}`,
      thumbnailMetadata
    )

    try {
      const uploadVideoTask = await uploadBytes(
        videoStorageRef,
        videoBlob,
        videoMetadata
      )
      const uploadThumbnailTask = await uploadBytes(
        thumbnailStorageRef,
        thumbnailBlob,
        videoMetadata
      )
      console.log("Uploaded video!", uploadVideoTask)
      console.log("Uploaded thumbnail!", uploadThumbnailTask)
    } catch (err) {
      console.log("ERROR", err)
    }
    setRequestRunning(false)
    const downloadVideoUrl = await getDownloadURL(videoStorageRef)
    const downloadThumbnailUrl = await getDownloadURL(thumbnailStorageRef)
    dispatch(
      createPost(postDescription, downloadVideoUrl, downloadThumbnailUrl)
    )
    navigation.dispatch(StackActions.popToTop())
    console.log("Video available at: ", downloadVideoUrl)
    console.log("Thumbnail available at: ", downloadThumbnailUrl)
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
            autoFocus
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
