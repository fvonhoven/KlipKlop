import React, { useEffect } from "react"
import { SafeAreaView, Text, TouchableOpacity } from "react-native"
import { appLogout } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { ProfileNavBar } from "../../components/profile/navBar/nav-bar"
import { ProfileHeader } from "../../components/profile/header/profile-header"
import { ProfilePostsList } from "../../components/profile/postsList/posts-list"
import { getPostsByUser } from "../../redux/actions"
import styles from "./styles"

export function ProfileScreen({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false)
  const currentUser = useSelector(state => state.auth.currentUser)
  const currentUserPosts = useSelector(state => state.posts.currentUserPosts)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(appLogout())
  }

  const fetchPosts = () => {
    dispatch(getPostsByUser())
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ProfilePostsList posts={currentUserPosts} onRefresh={fetchPosts} refreshing={refreshing}>
        <>
          <ProfileNavBar user={currentUser} />
          <ProfileHeader user={currentUser} navigation={navigation} />
        </>
      </ProfilePostsList>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
