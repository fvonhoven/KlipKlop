import React from "react"
import { View, Text, FlatList, SafeAreaView } from "react-native"
import { useSelector } from "react-redux"
import { ChatListItem } from "../../../components/chat/item/list"
import { NavBar } from "../../../components/general/navbar/navbar"

export function ChatListScreen() {
  const chats = useSelector(state => state.chats.list)
  console.log("CHATS", chats)
  const renderItem = ({ item }) => {
    return <ChatListItem chat={item} />
  }
  return (
    <SafeAreaView>
      <NavBar leftButton={{ display: false }} />
      <FlatList data={chats} removeClippedSubviews renderItem={renderItem} keyExtractor={(item, index) => index} />
    </SafeAreaView>
  )
}
