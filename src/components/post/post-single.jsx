import React, { forwardRef, useEffect, useImperativeHandle } from "react"
import { View } from "react-native"
import { Video } from "expo-av"
import styles from "./styles"

export const PostSingle = forwardRef(({ item }, parentRef) => {
  const { id: postId, media } = item
  console.log("ITEEMMMM", item.media[1])
  const videoRef = React.useRef(null)
  useImperativeHandle(parentRef, () => ({
    play,
    stop,
    unload,
  }))

  useEffect(() => {
    return () => unload()
  }, [])

  const play = async () => {
    if (!videoRef.current) {
      return
    }
    const status = await videoRef.current.getStatusAsync()
    if (status?.isPlaying) {
      return
    }
    try {
      await videoRef.current.playAsync()
    } catch (error) {
      console.log(error)
    }
  }

  const stop = async () => {
    if (!videoRef.current) {
      return
    }
    const status = await videoRef.current.getStatusAsync()
    if (!status?.isPlaying) {
      return
    }
    try {
      await videoRef.current.stopAsync()
    } catch (error) {
      console.log(error)
    }
  }

  const unload = async () => {
    if (!videoRef.current) {
      return
    }
    try {
      await videoRef.current.unloadAsync()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Video
      style={styles.container}
      resizeMode="cover"
      shouldPlay
      isLooping
      usePoster
      key={postId}
      posterSource={{ uri: media[1] }}
      posterStyle={{ resizeMode: "cover", height: "100%" }}
      source={{ uri: media[0] }}
      // uri: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4",
      // }}
    />
  )
})
