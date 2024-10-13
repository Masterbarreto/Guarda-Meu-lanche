import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CupertinoFooter2(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.btnWrapper1} onPress={() => props.onPress('homeLoja')} >
          <MaterialCommunityIconsIcon
            name="home"
            style={[
              styles.icon,
              {
                color: props.active === 'home' ? "#FDC242" : "#FFFFFF",
              }
            ]}
          />
          <Text
            style={[
              styles.btn1Caption,
              {
                color: props.active === 'home' ? "#FDC242" : "#FFFFFF"
              }
            ]}
          ></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnWrapper2} onPress={() => props.onPress('adicionarItens')}>
          <MaterialCommunityIconsIcon
            name="basket"
            style={[
              styles.icon,
              {
                color: props.active === 'shopping' ? "#FDC242" : "#FFFFFF",
              }
            ]}
          />
          <Text
            style={[
              styles.btn2Caption,
              {
                color: props.active === 'shopping' ? "#FDC242" : "#FFFFFF"
              }
            ]}
          ></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnWrapper3} onPress={() => props.onPress('PerfildaLoja')}>
          <MaterialCommunityIconsIcon
            name="account"
            style={[
              styles.icon,
              {
                color: props.active === 'user' ? "#FDC242" : "#FFFFFF",
              }
            ]}
          />
          <Text
            style={[
              styles.btn3Caption,
              {
                color: props.active === 'user' ? "#FDC242" : "#FFFFFF"
              }
            ]}
          ></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#211D1D', // Black background to match the image
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60, // Adjusted height for spacing
    width: "100%",
    paddingHorizontal: 0,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 80, // ajuste a distância entre os ícones
  },
  btnWrapper1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    backgroundColor: "transparent",
    fontSize: 28, // Increased icon size to match the look
    opacity: 1,   // Full opacity for clarity
  },
  btn1Caption: {
    fontSize: 12,
    backgroundColor: "transparent",
    paddingTop: 4,
    marginHorizontal: 5,
  },
  btnWrapper2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  btn2Caption: {
    fontSize: 12,
    backgroundColor: "transparent",
    paddingTop: 4,
    marginHorizontal: 1,
  },
  btnWrapper3: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  btn3Caption: {
    fontSize: 12,
    backgroundColor: "transparent",
    paddingTop: 4,
    marginHorizontal: 5,
  },
});