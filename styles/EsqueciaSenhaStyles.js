// EsqueciaSenhaStyles.js
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
  texto: {
    color: "whitesmoke",
    fontSize: 16,
    marginBottom: 50,
    marginTop: 10,
  },
  email: {
    color: "whitesmoke",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 3,
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
  },
});

export default styles;
