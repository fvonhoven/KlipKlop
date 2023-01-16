import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  containerMain: {
    flex: 1,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 25,
    color: "darkslategrey",
    textAlign: "center",
  },
  providerButton: {
    borderColor: "lightgrey",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  providerButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    paddingRight: 20,
  },
  containerBottomButton: {
    backgroundColor: "ghostwhite",
    padding: 20,
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  bottomButtonText: {
    fontWeight: "bold",
    color: "red",
  },
})

export default styles
