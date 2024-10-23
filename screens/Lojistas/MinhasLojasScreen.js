// screens/upload/MinhasLojas.js
import React from "react";
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from "react-native";
import LojaItem from "../../components/LojaItem"; // Importe o componente LojaItem
import CupertinoFooter2 from "../../components/CupertinoFooter2";
import styles from "../../styles/Lojistas/MinhasLojasScreenStyles"; // Importando o novo estilo

export default function MinhasLojas({ navigation }) {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.title}>
        <Text style={styles.minhaLoja}>Minha loja</Text>
      </View>
      {/* Caixa branca com lista */}
      <View style={styles.caixaBranca}>
        <ScrollView>
          <Text style={styles.titleLoja}>loja</Text>
          <View style={styles.statusBar} />
          <View style={styles.LojaItem}>

            {/* Loja A */}
            <LojaItem
              label="LOJA A - P1"
              onPress={() => navigation.navigate('homeLoja')}
              navigation={navigation}
            />
            <View style={styles.statusBar1} />
            {/* Loja B */}
            <LojaItem
              label="LOJA B - P2"
              navigation={navigation}
            />
            <View style={styles.statusBar1} />
            {/* Loja C */}
            <LojaItem
              label="LOJA C - P3"
              onPress={() => navigation.navigate('homeLoja')}
              navigation={navigation}
            />
            <View style={styles.statusBar1} />
          </View>
        </ScrollView>
      </View>
      {/* Navegação do Footer */}
      <CupertinoFooter2
        style={styles.cupertinoFooter1}
        onPress={(route) => navigation.navigate(route)}
      />
    </KeyboardAvoidingView>
  );
}
