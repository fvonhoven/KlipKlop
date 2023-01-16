import React, { useEffect, useState } from "react"
import { View, Image, TouchableOpacity, Text } from "react-native"
import { Camera } from "expo-camera"
import { Audio } from "expo-av"
import * as ImagePicker from "expo-image-picker"
import * as MediaLibrary from "expo-media-library"
import * as VideoThumbnails from "expo-video-thumbnails"
import { useIsFocused } from "@react-navigation/core"
import { Feather } from "@expo/vector-icons"
import styles from "./styles"

export function CameraScreen({ navigation }) {
  const [hasCameraPermissions, setHasCameraPermissions] = useState(false)
  const [hasAudioPermissions, setHasAudioPermissions] = useState(false)
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false)
  const [galleryItems, setGalleryItems] = useState(false)
  const [isCameraReady, setIsCameraReady] = useState(false)

  const [cameraRef, setCameraRef] = useState(null)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.off)

  const isFocused = useIsFocused()

  useEffect(() => {
    ;(async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync()
      setHasCameraPermissions(cameraStatus.status === "granted")

      const audioStatus = await Audio.requestPermissionsAsync()
      setHasAudioPermissions(audioStatus.status === "granted")

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasGalleryPermissions(galleryStatus.status === "granted")

      if (galleryStatus.status === "granted") {
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({
          sortBy: ["creationTime"],
          mediaType: ["video"],
        })
        setGalleryItems(userGalleryMedia.assets)
      }
    })()
  }, [])

  const recordVideo = async () => {
    if (cameraRef) {
      try {
        const options = {
          maxDuration: 60,
          quality: Camera.Constants.VideoQuality["1080p"],
        }
        const videoRecordPromise = cameraRef.recordAsync(options)
        if (videoRecordPromise) {
          const data = await videoRecordPromise
          const source = data.uri
          let sourceThumb = await generateThumbnail(source)
          navigation.navigate("savePost", { source, sourceThumb })
        }
      } catch (error) {
        console.warn("Error recording video", error)
      }
    }
  }
  const stopVideo = async () => {
    if (cameraRef) {
      cameraRef.stopRecording()
    }
  }

  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    })
    if (!result.canceled) {
      let sourceThumb = await generateThumbnail(result.assets[0].uri)
      navigation.navigate("savePost", {
        source: result.assets[0].uri,
        sourceThumb,
      })
    }
  }

  const generateThumbnail = async (videoUri) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
        time: 1000,
      })
      return uri
    } catch (e) {
      console.warn(e)
    }
  }

  if (!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions) {
    return <View />
  }

  return (
    <View style={styles.container}>
      {isFocused ? (
        <Camera
          ref={(ref) => setCameraRef(ref)}
          ratio={"16:9"}
          style={styles.camera}
          type={cameraType}
          flashMode={cameraFlash}
          onCameraReady={() => {
            console.log("Camera is ready")
            setIsCameraReady(true)
          }}
        />
      ) : null}

      <View style={styles.sideBarContainer}>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            setCameraType(
              cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            )
          }
        >
          <Feather name="refresh-ccw" size={24} color="white" />
          <Text style={styles.iconText}>Flip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            setCameraFlash(
              cameraFlash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            )
          }
        >
          <Feather name="zap" size={24} color="white" />
          <Text style={styles.iconText}>Flash</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBarContainer}>
        <View style={{ flex: 1 }}></View>
        <View style={styles.recordButtonContainer}>
          <TouchableOpacity
            style={styles.recordButton}
            disabled={!isCameraReady}
            onPress={() => console.log("pressed")}
            onLongPress={() => {
              console.log("long pressed")
              recordVideo()
            }}
            onPressOut={() => stopVideo()}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={pickFromGallery}
            style={styles.galleryButton}
          >
            {galleryItems[0] === undefined ? null : (
              <Image
                source={{ uri: galleryItems[0].uri }}
                style={styles.galleryButtonImage}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
