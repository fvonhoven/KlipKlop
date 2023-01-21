import { StyleSheet } from "react-native"

// Overlay styles
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
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
    marginBottom: 30,
  },
  rightContainer: {
    alignItems: "center",
  },
  actionButton: {
    paddingBottom: 16,
  },
  actionButtonText: {
    color: "white",
    textAlign: "center",
    marginTop: 4,
  },
})

export default styles
