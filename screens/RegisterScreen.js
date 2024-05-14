import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView , } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';



export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  return (
    
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.voltar}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.name}>Nome</Text>
        <TextInput
        placeholder=""
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Text style={styles.surname}>Sobrenome</Text>
        <TextInput
        placeholder=""
        value={surname}
        onChangeText={setSurname}
        style={styles.input}
      />
      <Text style={styles.birthDate}>Data de nacimento</Text>
      <TextInput
        placeholder="  "
        value={birthDate}
        onChangeText={setBirthDate}
        style={styles.input}
      />
      <Text style={styles.email}>Email</Text>
      <TextInput
        placeholder=""
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Text style={styles.password}>Senha</Text>
      <TextInput
        placeholder=""
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Text style={styles.confirmPassword}>Confirmar Senha</Text>
      <TextInput
        placeholder=" "
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
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
    voltar: {
      color: '#FFF',
      fontSize: 16,
      position: 'absolute',
      top: -70,
      left: -20,
    },
    input: {
      backgroundColor: 'white',
      width: 300,
      paddingVertical: 14,
      borderRadius: 21,
      marginTop: 40,
    },
    label: {
      color: '#FFF',
      fontSize: 16,
      alignSelf: 'flex-start',
      marginLeft: 70,
    },  

    name : {
      color: '#FFF', // Texto branco
      fontSize: 16,
      position: 'absolute',
      top: -1,
      alignItems: 'center',
      left: 5,
    },
    surname : {
      color: '#FFF', // Texto branco
      fontSize: 16,
      position: 'absolute', 
      top: 100,
      alignItems: 'center',
      left: 5,
    },
    birthDate: {
      color: '#FFF', // Texto branc
      fontSize: 16,
      position: 'absolute', 
      top: 200,
      alignItems: 'center',
      left: 5,
    },
    email : {
      color: '#FFF', // Texto branc
      fontSize: 16,
      position: 'absolute', 
      top: 298,
      alignItems: 'center',
      left: 5,
    },
    password : {
      color: '#FFF', // Texto branc
      fontSize: 16,
      position: 'absolute', 
      top: 393,
      left: 5,
    },
    confirmPassword : {
      color: '#FFF', // Texto branc
      fontSize: 16,
      position: 'absolute', 
      top: 490,
      left: 5,
    },
    button: {
      backgroundColor: '#0782F9',
      width: '150',
      padding: 15,
      borderRadius: 15,
      alignItems: 'center',
      marginTop: 2,
      top: 50,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
      textAlign: 'center',
      
    },
    }
);
