// screens/upload/PerfildaLoja.js
import React from "react";
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView } from "react-native";
import CupertinoFooter2 from "../../components/CupertinoFooter2";
import styles from "../../styles/Lojistas/PerfilLojaScreenStyles"; 

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
        <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 320 }}>
          <CupertinoFooter2
            onPress={(route) => navigation.navigate(route)}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
