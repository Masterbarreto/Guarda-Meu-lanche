import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function LojaItem({ label, onPress, navigation }) {
  return (

    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Image
        source={require('../assets/icon.png')}
        style={styles.icon}
      />
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('homeLoja')}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    paddingVertical: 50,
    marginTop: '-10%',
  },
  statusBar: {
    height: 1,
    backgroundColor: "black",
    marginTop: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 10,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#FFB800",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
