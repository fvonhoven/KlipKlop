import { StyleSheet } from "react-native"

// NAV BAR
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: "lightgrey",
    alignItems: "center",
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
})

export default styles
