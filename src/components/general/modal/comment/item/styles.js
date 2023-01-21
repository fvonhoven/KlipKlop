import { StyleSheet } from "react-native"

// Comment item styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
  },
  containerText: {
    marginHorizontal: 14,
  },
  displayName: {
    color: "grey",
    fontSize: 13,
    fontWeight: "bold",
  },
  avatar: {
    height: 32,
    width: 32,
    borderRadius: 16,
    alignSelf: "center",
  },
})

export default styles
