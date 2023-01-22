import React, { useState } from "react"
import { View, TextInput, TouchableOpacity, FlatList, Text, SafeAreaView, KeyboardAvoidingView } from "react-native"
import { useSelector } from "react-redux"
import styles from "./styles"
import { Ionicons } from "@expo/vector-icons"
import { sendMessage } from "../../../services/chats"
import { SingleChatItem } from "../../../components/chat/single/item/single-chat-item"
import { useMessages } from "../../../hooks/useMessages"
import { NavBar } from "../../../components/general/navbar/navbar"

export function SingleChatScreen({ route }) {
  const { chatId, contactId } = route.params
  const [message, setMessage] = useState("")
  const { messages, chatIdInstance } = useMessages(chatId, contactId)

  const handleMessageSend = () => {
    if (message.length === 0) {
      return
    }
    setMessage("")
    sendMessage(chatIdInstance, message)
  }
  // TODO: need to add keyboard avoiding view

  const renderItem = ({ item }) => <SingleChatItem item={item} />

  // TODO: add timestamp to comment and display it in local time
  // TODO: update comment & likes count via listener? or via redux

  return (
    <SafeAreaView style={styles.container}>
      <NavBar />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} keyboardVerticalOffset={16}>
        <FlatList
          data={messages}
          renderItem={renderItem}
          ListEmptyComponent={() => <Text style={{ padding: 10, color: "lightgrey" }}>Send a message...</Text>}
          keyExtractor={item => item.id}
        />
        <View style={styles.containerInput}>
          <TextInput style={styles.input} placeholder="Add a message..." value={message} onChangeText={setMessage} />
          <TouchableOpacity style={styles.button} onPress={handleMessageSend} disabled={message.length === 0}>
            <Ionicons color={message.length === 0 ? "lightgrey" : "crimson"} size={34} name="arrow-up-circle" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
