import React from "react";
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView } from "react-native";
import CupertinoFooter2 from "../../components/CupertinoFooter2";

export default function PerfildaLoja({ navigation }) {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.minhaLoja}>Minha Loja</Text>
      <View style={styles.caixaBranca}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/icon.png')}
            style={styles.profileIcon}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.titleLoja}>Nome da Loja:</Text>
          <TextInput style={styles.input} placeholder="-" editable={false} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.titleLoja}>Id da Loja:</Text>
          <TextInput style={styles.input} placeholder="-" editable={false} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.titleLoja}>Praça de alimentação - Localização</Text>
          <TextInput style={styles.input} placeholder="P1" editable={false} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.titleLoja}>Descrição</Text>
          <TextInput style={styles.input} placeholder="comidas em geral" editable={false} />
        </View>
        
        {/* Footer for Navigation */}
        <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 320, }}>
          <CupertinoFooter2
            
            onPress={(route) => navigation.navigate(route)}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#211D1D",
    paddingTop: 1,
    alignItems: 'center',
  },
  minhaLoja: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffff",
    marginBottom: 60,
  },
  caixaBranca: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 20,
    width: '89%',
    height: "80%", // Adjusted height to make room for the footer
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
    paddingTop: 50, // Adjust this value if the image needs more/less overlap
  },
  profileContainer: {
    position: 'absolute',
    top: -40, // Adjusts overlap amount
    zIndex: 1,
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#fff",
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%',
    borderRadius: 60,
  },
  titleLoja: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    color: "#000",
  },
  cupertinoFooter1: {
    // Removed marginTop to make the footer visible
  },
});