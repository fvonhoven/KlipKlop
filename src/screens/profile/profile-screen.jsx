import React, { useEffect, useContext, useState } from "react"
import { SafeAreaView, Text, TouchableOpacity } from "react-native"
import { appLogout } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { ProfileNavBar } from "../../components/profile/navBar/nav-bar"
import { ProfileHeader } from "../../components/profile/header/profile-header"
import { ProfilePostsList } from "../../components/profile/postsList/posts-list"
import { getPostsByUser } from "../../redux/actions"
import { getPostsByUserId } from "../../services/posts"
import { NavigationContext } from "../../navigation/context/provider"
import { useUser } from "../../hooks/useUser"
import styles from "./styles"

export function ProfileScreen({ navigation, route }) {
  // TODO: handle multiple user idsm'

  const currentUserPosts = useSelector(state => state.posts.currentUserPosts)
  const [userPosts, setUserPosts] = useState(currentUserPosts)
  const [refreshing, setRefreshing] = React.useState(false)
  const currentUser = useSelector(state => state.auth.currentUser)
  let providerUserId = route?.params?.initialUserId || currentUser.uid
  if (NavigationContext != null && !route?.params?.initialUserId) {
    providerUserId = useContext(NavigationContext)?.currentVideoUserId
  }
  route?.params?.initialUserId && console.log("ROUTE????", route?.params?.initialUserId)
  providerUserId && console.log("PROVIDER ID", providerUserId)
  const user = useUser(route?.params?.initialUserId || providerUserId).data || currentUser
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

  useEffect(() => {
    if (user?.uid) {
      getPostsByUserId(user.uid).then(setUserPosts)
    }
  }, [user])

  return (
    <SafeAreaView style={styles.container}>
      <ProfileNavBar user={user} />
      <ProfilePostsList posts={userPosts} onRefresh={fetchPosts} refreshing={refreshing}>
        <ProfileHeader user={user} navigation={navigation} />
      </ProfilePostsList>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
