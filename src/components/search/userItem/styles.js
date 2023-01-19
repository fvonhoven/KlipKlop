import { StyleSheet } from "react-native"

// Search User Item styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignItems: "center",
  },
  text: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 10,
  },
  image: {
    backgroundColor: "grey",
    height: 50,
    width: 50,
    borderRadius: 25,
  },
})

export default styles
