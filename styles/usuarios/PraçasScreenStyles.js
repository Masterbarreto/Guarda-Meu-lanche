// styles/usuarios/PraçasScreenStyles.js
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    // backgroundColor: "red",
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    marginRight: 20,
    paddingHorizontal: 5,
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    fontFamily: "Circular",
    marginTop: 20,
  },
  cupertinoFooter1: {
    height: 61,
    marginTop: "auto",
  },

  card: {
    width:"100%",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#1e1e1e",
    borderRadius: 5,
  },
  cardTitle: {
    fontFamily: "Circular",
    fontSize: 18,
    color: "#fff",
  },
  cardDescription:{
    fontFamily: "Circular",
    fontSize: 12,
    color: "whitesmoke",
  },
  text:{
    fontFamily: "Circular",
    color: "whitesmoke",
    textAlign:"left",
    marginLeft:3,
    justifyContent:"flex-start",
    alignItems:"flex-start"
    
  }
});

export default styles;
