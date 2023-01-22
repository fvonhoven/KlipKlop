import firebase from "firebase"
import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Avatar } from "react-native-paper"
import styles from "./styles"
import { Feather } from "@expo/vector-icons"
import { useFollowingMutation } from "../../../hooks/useFollowingMutation"
import { useFollowing } from "../../../hooks/useFollowing"

export function ProfileHeader({ user, navigation }) {
  const isFollowing = useFollowing(firebase.auth().currentUser.uid, user.uid).data
  const isFollowingMutation = useFollowingMutation()

  const renderFollowButton = () => {
    if (isFollowing) {
      return (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.grayOutlinedButton}
            onPress={() => navigation.navigate("singleChat", { contactId: user.uid })}
          >
            <Text style={styles.grayOutlinedButtonText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.grayOutlinedIconButton}
            onPress={() => isFollowingMutation.mutate({ otherUserId: user.uid, isFollowing })}
          >
            <Feather name="user-check" size={20} />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <TouchableOpacity
          style={styles.filledButton}
          onPress={() => isFollowingMutation.mutate({ otherUserId: user.uid, isFollowing })}
        >
          <Text style={styles.filledButtonText}>Follow</Text>
        </TouchableOpacity>
      )
    }
  }

  return (
    <View style={styles.container}>
      <Avatar.Icon size={60} icon="account" />
      <Text style={styles.emailText}>{user.email}</Text>
      <View style={styles.counterContainer}>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Followers</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Followers</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Likes</Text>
        </View>
      </View>
      {firebase.auth().currentUser.uid === user.uid ? (
        <TouchableOpacity style={styles.grayOutlinedButton} onPress={() => navigation.navigate("editProfile")}>
          <Text style={styles.grayOutlinedButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      ) : (
        renderFollowButton()
      )}
    </View>
  )
}
