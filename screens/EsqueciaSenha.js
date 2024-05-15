import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import LoginScreen from '../screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from 'react-router-native';

export default function EsqueciaSenha({ navigation }) {
  const [email, setEmail] = useState('');

  return (
    
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.voltar}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Esqueceu a senha?</Text>
        <Text style={styles.texto} numberOfLines={4}>
          Digite seu e-mail para o processo de verificação, enviaremos o código para o seu e-mail
        </Text>
        <Text style={styles.email}>Email</Text>
        <TextInput
          placeholder="Ex: Lucas.gomes@gmail.com"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Verificação')}>
          <Text style={styles.Bottom}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );

  
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#211D1D',
      padding: 0,
    },
    voltar: {
      color: '#FFF', // Texto branco
      fontSize: 16,
      position: 'absolute',
      top: -260,
      left: 7,
    },
    titulo: {
      color: '#2C5697', // Texto branco
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10,
      top: -230,
      left: 5,
      flexWrap: 'wrap',
    },

    texto: {
      color: '#FFF', // Texto branco
      fontSize: 16,
      marginBottom: 20,
      top: -220,
      left: 5,
      flexWrap: 'wrap',
    },

    input: {
      backgroundColor: 'white',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 20,
      marginTop: 10,
      height: 50,
      top: -140,
      left: 5,
    },

    label: {
      color: '#0000FF', // Cor branca
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 0, // Reduzir a margem inferior para aproximar do TextInput
      top: -150,
      left: 10,
    },
    
    Bottom: {
      backgroundColor: '#0000FF', // Fundo azul
      padding: 14,
      borderRadius: 20,
      color: '#FFF', // Texto branco
      fontSize: 16,
      textAlign: 'center',
      marginTop: 0,
      top: 250,
    },

    email: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 0,
      color: '#FFF',
      top: -150,
      left: 10,
    }
  });
