// LoginScreenStyles.js
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#161616",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  inputContainer: {
    marginTop: 0,
  },
  input: {
    width: 350,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 5,
    fontWeight: "700",
    fontSize: 15,
  },

  buttonContainer: {
    marginTop: -30,
  },
  button: {
    backgroundColor: "#434343",
    padding: 15,
    alignItems: "center",
    width: 340,
    borderRadius: 8,
    marginBottom: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Circular",
  },
  buttonOutline: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 11,
    marginHorizontal: 10,
    fontFamily:"Circular",

  },
  forgotPasswordText: {
    color: "red",
    marginTop: 5,
    fontSize: 12,
    textAlign: "right",
    marginRight: 2,
    fontFamily:"Circular",

  },
  label: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 3,
    fontFamily:"Circular"

  },
  labelError: {
    color: "#ff375b",
    marginBottom: 8,
    marginLeft: 10,

  },
  mainBottom: {
    marginBottom: 50,
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
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
});

export default styles;