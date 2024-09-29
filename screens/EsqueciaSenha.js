import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.voltar} >
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Esqueceu a senha?</Text>
        <Text style={styles.texto}>Digite seu e-mail para o processo de verificação,dentro de alguns minutos enviaremos o código para o seu e-mail.</Text>
        <Text style={styles.email}>Email</Text>
        <TextInput
          placeholder="Ex: seu.email@example.com"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TouchableOpacity onPress={handlePasswordReset} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
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
    marginTop: -120,
    padding: 20,
  },
  voltar: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 50,
  },
  titulo: {
    color: '#2C5697',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  texto: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 50,
  },
  email: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 250,
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