import { StyleSheet } from "react-native"

// Chat list styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 60,
    aspectRatio: 1,
    borderRadius: 30,
    marginRight: 16,
    backgroundColor: "grey",
  },
  userDisplayName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 14,
    color: "grey",
  },
  date: {},
})

export default styles
