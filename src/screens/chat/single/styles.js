import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
  },
  containerInput: {
    paddingHorizontal: 8,
    flexDirection: "row",
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "lightgrey",
    borderRadius: 4,
    marginHorizontal: 10,
  },
  avatar: {
    height: 32,
    width: 32,
    borderRadius: 16,
    alignSelf: "center",
  },
})

export default styles
