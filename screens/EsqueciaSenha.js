import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

export default function EsqueciaSenha() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    if (email !== "") {
      try {
        await sendPasswordResetEmail(auth, email);
        Alert.alert(`Foi enviado um email para: ${email}.`);
        navigation.navigate('Login');
      } catch (error) {
        console.error(error);
        Alert.alert("Erro ao enviar email de redefinição de senha");
      }
    } else {
      Alert.alert("Por favor, informe um email válido.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.voltar}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Esqueceu a senha?</Text>
        <Text style={styles.texto}>Digite seu email para receber instruções de redefinição de senha.</Text>
        <Text style={styles.email}>Email</Text>
        <TextInput
          placeholder="Ex: seu.email@example.com"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TouchableOpacity onPress={handlePasswordReset} style={styles.button}>
          <Text style={styles.buttonText}>Enviar</Text>
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
  },
  contentContainer: {
    width: '100%',
    padding: 20,
  },
  voltar: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 20,
  },
  titulo: {
    color: '#2C5697',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  texto: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 20,
  },
  email: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0782F9',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});