import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import CupertinoFooter2 from "../../components/CupertinoFooter2";

export default function AdicionarItens({ navigation }) {
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.caixaBranca}>
                <Image 
                    source={require('../../assets/imagem_2024-10-10_093912229-removebg-preview.png')}
                    style={styles.icon}
                    resizeMode="contain" // Ajuste para evitar cortes na imagem
                />
                <Text style={styles.message}>Nenhum produto registrado</Text>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('UploadImage')} // Substitua 'AddItemScreen' pelo nome correto da tela de destino
                >
                    <Text style={styles.buttonText}>ADICIONAR ITEM</Text>
                </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#211D1D', // Cor de fundo cinza claro semelhante ao da imagem
  },
  caixaBranca: {
    backgroundColor: "#fff",
    borderRadius: 30,
    marginTop: 32,
    padding: 50,
    height: 656,
    width: '90%',
    justifyContent: 'flex-start', 
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  icon: {
    width: 274,
    height: 204,
    marginBottom: 60,
  },
  message: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFC107', // Cor amarela
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  cupertinoFooter1: {
    marginTop: 60,
    alignItems: 'center',
  },
});
