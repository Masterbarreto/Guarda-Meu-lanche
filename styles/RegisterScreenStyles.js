import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#161616",
  },
  contentContainer: {
    marginTop: 20,
    padding: 0,
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    color: "whitesmoke",
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 7,
  },
  stepText: {
    color: "whitesmoke",
    fontSize: 15,
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    color: "whitesmoke",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 3,
  },
  error: {
    color: "red",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 3,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 5,
    fontWeight: "600",
    fontSize: 15,
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 5,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#434343",
    padding: 15,
    borderRadius: 9,
    alignItems: "center",
    width: "45%",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  progressBar: {
    height: 3,
    width: "100%",
    backgroundColor: "#434343",
    borderRadius: 5,
    marginBottom: 20,
  },
  progress: {
    height: 3,
    backgroundColor: "#00ff00",
    borderRadius: 5,
  },
});
export default styles 
