import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#161616",
  },
    scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    marginTop: 10,
    padding: 0,
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    color: "whitesmoke",
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 7,
    fontFamily:"Circular"
  },
  texto: {
    color: "whitesmoke",
    fontSize: 16,
    marginBottom: 50,
    marginTop: 10,
    fontFamily:"Circular",
  },
  email: {
    color: "whitesmoke",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 3,
    fontFamily:"Circular",

  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 5,
    fontWeight: "600",
    fontSize: 15,
    fontFamily:"Circular",
    padding: 15,
  },
  button: {
    backgroundColor: "#434343",
    padding: 15,
    borderRadius: 9,
    marginTop: 15,
    alignItems: "center",
    width: "auto",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    fontFamily:"Circular",

  },
});

export default styles;
