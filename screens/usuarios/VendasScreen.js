// screens/usuarios/VendasScreen.js
import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CupertinoFooter1 from "../../components/CupertinoFooter1";
import Lanches from "../../components/Lanches";
import styles from "../../styles/usuarios/VendasScreenStyles";

export default function VendasScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/image.png")} style={styles.featuredImage} />
      <View style={styles.whiteContainer}>
        <Text style={styles.title}>Nome da loja</Text>
        <View style={styles.statusBar} />
        <View style={styles.categories}>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>lanche</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Salgados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Bebidas</Text>
          </TouchableOpacity>
        </View>
        <Lanches onPress={(route) => navigation.navigate(route)} />
      </View>
      <CupertinoFooter1 style={styles.cupertinoFooter1} onPress={(route) => navigation.navigate(route)} />
    </View>
  );
}
