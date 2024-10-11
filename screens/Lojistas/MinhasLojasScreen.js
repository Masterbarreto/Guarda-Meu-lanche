import React from "react";
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from "react-native";
import LojaItem from "../../components/LojaItem"; // Importe o componente LojaItem
import CupertinoFooter2 from "../../components/CupertinoFooter2";

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
            {/* Loja B */}
            <LojaItem
              label="LOJA B - P2"
              onPress={() => navigation.navigate('homeLoja')}
              navigation={navigation}
            />
            {/* Loja C */}
            <LojaItem
              label="LOJA C - P3"
              onPress={() => navigation.navigate('homeLoja')}
              navigation={navigation}
            />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#211D1D",
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
  },
  minhaLoja: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffff",
  },
  caixaBranca: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    width: '90%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  statusBar: {
    height: 1,
    backgroundColor: "black",
    marginTop: 10,
  },
  titleLoja:{
    color: "#000",
    fontSize: 19,
    fontWeight: "400",
  },
  LojaItem:{
    marginTop: 30,
  },
  cupertinoFooter1: {
    marginTop: 300,
    alignItems: 'center',
  },
});
