import { StyleSheet } from "react-native"

// Comment item styles
const styles = StyleSheet.create({
  containerCurrent: {
    flex: 1,
    flexDirection: "row-reverse",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  containerOther: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  containerTextCurrent: {
    marginHorizontal: 10,
    backgroundColor: "skyblue",
    borderRadius: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgrey",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  containerTextOther: {
    marginHorizontal: 10,
    backgroundColor: "plum",
    borderRadius: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgrey",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  chatText: {
    fontSize: 16,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignSelf: "center",
  },
})

export default styles
