import React, { useEffect, useState } from "react"
import { View, Image, TextInput, TouchableOpacity, FlatList, Text } from "react-native"
import { useSelector } from "react-redux"
import styles from "./styles"
import { Ionicons } from "@expo/vector-icons"
import { addComment, clearCommentListener, commentListener } from "../../../../services/posts"
import { CommentItem } from "./item"

export function CommentModal({ post }) {
  const currentUser = useSelector(state => state.auth.currentUser)
  const [comment, setComment] = useState("")
  const [commentList, setCommentList] = useState("")

  useEffect(() => {
    commentListener(post.id, setCommentList)
    return () => clearCommentListener()
  }, [])

  const handleCommentSend = () => {
    if (comment.length === 0) {
      return
    }
    console.log(comment)
    addComment(post.id, currentUser.uid, comment)
    setComment("")
  }

  const renderItem = ({ item }) => <CommentItem item={item} />

  // TODO: add timestamp to comment and display it in local time
  // TODO: update comment & likes count via listener? or via redux
  return (
    <View style={styles.container}>
      <FlatList
        data={commentList}
        renderItem={renderItem}
        ListEmptyComponent={() => <Text style={{ padding: 10, color: "lightgrey" }}>Be the first to comment...</Text>}
        keyExtractor={item => item.id}
      />
      <View style={styles.containerInput}>
        <Image source={{ uri: currentUser.photoURL }} style={styles.avatar} />
        <TextInput style={styles.input} placeholder="Add a comment..." value={comment} onChangeText={setComment} />
        <TouchableOpacity style={styles.button} onPress={handleCommentSend} disabled={comment.length === 0}>
          <Ionicons color={comment.length === 0 ? "lightgrey" : "crimson"} size={34} name="arrow-up-circle" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
