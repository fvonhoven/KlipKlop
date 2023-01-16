import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "white",
  },
  inputText: {
    flex: 1,
    paddingVertical: 20,
    marginRight: 20,
  },
  mediaPreview: {
    aspectRatio: 9 / 16,
    backgroundColor: "black",
    width: 60,
  },
  formContainer: {
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    margin: 20,
  },
  cancelButton: {
    alignItems: "center",
    flex: 1,
    borderColor: "lightgrey",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginRight: 10,
  },
  postButton: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ff4040",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginRight: 10,
  },
  cancelButtonText: {
    marginLeft: 5,
    fontWeight: "bold",
    color: "black",
    fontSize: 16,
  },
  postButtonText: {
    marginLeft: 5,
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  uploadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default styles
