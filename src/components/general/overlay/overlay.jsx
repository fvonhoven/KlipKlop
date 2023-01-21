import React, { useEffect, useState, useMemo } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import styles from "./styles"
import { Ionicons } from "@expo/vector-icons"
import { getLikeById, updateLike } from "../../../services/posts"
import { useSelector } from "react-redux"
import { throttle } from "throttle-debounce"
import { useDispatch } from "react-redux"
import { openModal } from "../../../redux/actions"

export function PostSingleOverlay({ user, post }) {
  const navigation = useNavigation()
  const currentUser = useSelector(state => state.auth.currentUser)
  const [currentLikeState, setCurrentLikeState] = useState({ state: false, counter: post.likesCount })

  const dispatch = useDispatch()
  useEffect(() => {
    getLikeById(post.id, currentUser.uid).then(res => {
      setCurrentLikeState({
        ...currentLikeState,
        state: res,
      })
    })
  }, [])

  const handleUpdateLike = useMemo(
    () =>
      throttle(
        1500,
        currentLikeStateInst => {
          setCurrentLikeState({
            state: !currentLikeStateInst.state,
            counter: currentLikeStateInst.counter + (currentLikeStateInst.state ? -1 : 1),
          })
          updateLike(post.id, currentUser.uid, currentLikeStateInst.state)
        },
        { noLeading: false },
      ),
    [],
  )

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.displayName}>{user?.displayName}</Text>
        <Text style={styles.description}>{post?.description}</Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("profileOther", { initialUserId: user?.uid })}>
          <Image source={{ uri: user?.photoURL }} style={styles.avatar} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleUpdateLike(currentLikeState)}>
          <Ionicons color="white" size={40} name={currentLikeState.state ? "heart" : "heart-outline"} />
          <Text style={styles.actionButtonText}>{post.likesCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => dispatch(openModal(true, post))}>
          <Ionicons color="white" size={36} name={"chatbubble"} />
          <Text style={styles.actionButtonText}>{post.commentsCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
