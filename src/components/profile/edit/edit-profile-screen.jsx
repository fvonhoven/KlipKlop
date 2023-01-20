import React from "react"
import { SafeAreaView, TouchableOpacity, View, Image, Text } from "react-native"
import { NavBar } from "../../general/navbar/navbar"
import { Feather } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { saveUserProfileImage } from "../../../services/user"
import { useSelector } from "react-redux"
import styles from "./styles"

export function EditProfileScreen({ navigation }) {
  const auth = useSelector(state => state.auth)
  const chooseImage = async () => {
    console.log("Choose Image")
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    if (!result.canceled) {
      saveUserProfileImage(result.assets[0].uri)
    }
  }
  // console.log("EDIT PROFILE CURRENT USER", auth.currentUser)
  // TODO: just use currentUser from firebase?
  return (
    <SafeAreaView style={styles.container}>
      <NavBar />
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.imageViewContainer} onPress={chooseImage}>
          <Image style={styles.image} source={{ uri: auth.currentUser.photoURL }} />
          <View style={styles.imageOverlay} />
          <Feather name="camera" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.fieldsContainer}>
        <TouchableOpacity
          style={styles.fieldsItemsContainer}
          onPress={() =>
            navigation.navigate("editProfileField", {
              title: "Display Name",
            })
          }
        >
          <Text style={styles.editProfileText}>{auth.currentUser.displayName}</Text>
          <View style={styles.fieldValueContainer}>
            <Text style={styles.editProfileText}>{auth.currentUser.displayName}</Text>
            <Feather name="chevron-right" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
