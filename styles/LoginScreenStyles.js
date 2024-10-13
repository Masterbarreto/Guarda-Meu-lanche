// LoginScreenStyles.js
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
  logoContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  inputContainer: {
    marginTop: 0,
  },
  input: {
    width: 342,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  buttonContainer: {
    marginTop: -30,
  },
  button: {
    backgroundColor: "#434343",
    padding: 15,
    borderRadius: 9,
    marginTop: 70,
    alignItems: "center",
    width: 340,
  },
  buttonText: {
    color: "whitesmoke",
    fontWeight: "600",
    fontSize: 18,
    letterSpacing: 1,
  },
  buttonOutline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 0.7,
  },
  buttonOutlineText: {
    color: "#434343",
    fontWeight: "800",
    fontSize: 11,
    marginHorizontal: 10,
  },
  forgotPasswordText: {
    color: "#ec3c22",
    marginTop: 12,
    fontSize: 14,
    textAlign: "right",
    marginRight: 2,
    fontWeight: "600",
  },
  label: {
    color: "#444444",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 3,
  },
  labelError: {
    color: "#ff375b",
    marginBottom: 8,
    marginLeft: 10,
  },
  mainBottom: {
    marginBottom: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    width: "100%",
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  rect1: {
    width: 80,
    height: 1,
    backgroundColor: "#E6E6E6",
  },
  rect2: {
    width: 80,
    height: 1,
    backgroundColor: "#E6E6E6",
  },
  welcomeText: {
    color: "#434343",
    fontSize: 19,
    fontWeight: "800",
    marginTop: 10,
    marginLeft: 0,
    alignSelf: "flex-start",
    marginLeft: 25,
    paddingTop: 20,
  },
  h2: {
    color: "#434343",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 0,
    alignSelf: "flex-start",
    marginLeft: 25,
    paddingBottom: 20,
    margin: 0,
  },
});

export default styles;
