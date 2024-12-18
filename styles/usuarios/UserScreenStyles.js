// styles/usuarios/UserScreemStyles.js
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
    alignItems: "center",
    justifyContent: "center",
  },
  cupertinoFooter1: {
    height: 61,
    marginTop: "auto",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 10,
  },
  profileContainer: {
    justifyContent: "flex-start",
    alignItems: 'center',
    marginTop: 0,
    // backgroundColor:"black",
    marginTop: 5,
    width: "100%",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    top: 5,
    marginRight:10
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: "Circular",
    marginTop:5
  },
  profileInfo: {
    fontSize: 14,
    color: "#CCCCCC",
    fontFamily: "Circular",
  },
  profileRole: {
    fontSize: 14,
    color: "#CCCCCC",
    marginBottom: 10,
    fontFamily: "Circular",
  },
  settingsContainer: {
    width: "100%",
    padding: 30,
  },
  buttonStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 21,
  },
  settingText: {
    color: "#2E2E2E",
    fontWeight: "700",
    fontSize: 16,
  },
  iconStyle: {
    marginLeft: 10,
  },
  logoutButton: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 100,
    backgroundColor: "#FF4D4D",
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default styles;
