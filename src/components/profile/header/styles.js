import { StyleSheet } from "react-native"

// PROFILE HEADER
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
    paddingHorizontal: 60,
    borderBottomWidth: 1,
    borderColor: "lightgrey",
  },
  counterContainer: {
    flexDirection: "row",
    paddingBottom: 20,
  },
  counterItemContainer: {
    flex: 1,
    alignItems: "center",
  },
  emailText: {
    padding: 20,
  },
  counterNumberText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  counterLabelText: {
    fontSize: 12,
    color: "grey",
  },
  grayOutlinedButton: {
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  grayOutlinedIconButton: {
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  grayOutlinedButtonText: {
    color: "black",
    fontSize: 16,
  },
  filledButton: {
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: "#ff4040",
  },
  filledButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
})

export default styles
