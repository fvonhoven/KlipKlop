import React, { useEffect } from "react"
import { FlatList, SafeAreaView, TextInput, Text } from "react-native"
import { SearchUserItem } from "../../components/search/userItem/search-user-item"
import { queryUsersByEmail } from "../../services/user"
import styles from "./styles"

export function SearchScreen() {
  const [textInput, setTextInput] = React.useState("")
  const [searchUsers, setSearchUsers] = React.useState([])
  useEffect(() => {
    ;(async () => {
      const users = await queryUsersByEmail(textInput)
      setSearchUsers(users)
    })()
  }, [textInput])

  const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        onChangeText={setTextInput}
        style={styles.textInput}
        placeholder="Search"
        autoCapitalize="none"
      />
      <FlatList
        data={searchUsers}
        renderItem={SearchUserItem}
        keyExtractor={(item) => item.email}
        // extraData={searchUsers.length()}
      />
    </SafeAreaView>
  )
}