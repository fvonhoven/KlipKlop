import React from "react"
import { FlatList } from "react-native"
import { ProfilePostsListItem } from "./item"

export function ProfilePostsList({ posts, children, onRefresh, refreshing }) {
  return (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      numColumns={3}
      removeClippedSubviews
      data={posts}
      ListHeaderComponent={children}
      renderItem={({ item }) => <ProfilePostsListItem item={item} />}
      keyExtractor={item => item.id}
    />
  )
}
