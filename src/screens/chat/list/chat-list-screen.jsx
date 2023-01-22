import React from "react"
import { View, Text, FlatList, SafeAreaView } from "react-native"
import { useSelector } from "react-redux"
import { ChatListItem } from "../../../components/chat/list/item"
import { NavBar } from "../../../components/general/navbar/navbar"
import styles from "./styles"

export function ChatListScreen() {
  const chats = useSelector(state => state.chats.list)
  const renderItem = ({ item }) => {
    return <ChatListItem chat={item} />
  }
  return (
    <SafeAreaView style={styles.container}>
      <NavBar leftButton={{ display: false }} />
      <FlatList data={chats} removeClippedSubviews renderItem={renderItem} keyExtractor={(item, index) => index} />
    </SafeAreaView>
  )
}
