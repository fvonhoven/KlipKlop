import { StyleSheet } from "react-native"

// Overlay styles
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  displayName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginTop: 4,
    color: "#fff",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
})

export default styles
