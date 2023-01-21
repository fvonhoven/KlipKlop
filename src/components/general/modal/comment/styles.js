import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 30,
  },
  containerInput: {
    padding: 10,
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
