import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "darkblue",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    backgroundColor: "#996699",
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
  },
})

export default styles
