//importaçoes do firebase 

import React, { useState } from 'react';
//import { createUserWithEmailAndPassword } from 'firebase/auth';
import {  signInWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase.js';

//______________//____________________________//

import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { AppRegistry } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Informe seu email"),
  password: yup.string().required("Informe sua senha").min(6, "A senha deve ter pelo menos 6 dígitos"),
});

export default function LoginScreen({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  //one code bit
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLoging = ( ) =>{
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
            console.log(user);
              setUser(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message; 

  console.log(errorMessage);
  });
    }

    const handleLogin = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          const user = userCredential.user;
          console.log(`Login successful! `);
          navigation.navigate('Home'); // Navigate to Home screen
        })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(`Login failed: ${errorMessage}`);
          alert(' Usuário ou senha estão errados');// Show alert
        });
    }
    

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <Image
          source={require("../assets/icon.png")}
          style={styles.containerLogo}
        />
      </View>
      <View style={styles.inputContainer}>

        <Text style={styles.label}>Email</Text>
        {errors.email?.message && <Text style={styles.labelError}>{errors.email?.message}</Text>}
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Ex: Lucas.gomes@gmail.com"
              value={email}
              onChangeText={(val) => {
                setEmail(val);
              }}
              onBlur={onBlur} //chamado quando o texttinput e tocado 
              style={[styles.input,{
                borderWidth:errors.email && 1,
                borderColor: errors.email && '#ff375b'
              }]}
            />
          )}
        />

        <Text style={styles.label}>Senha</Text>
        {errors.password?.message && <Text style={styles.labelError}>{errors.password?.message}</Text>}
        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="*********"
              value={password}
              onChangeText={(val) => {
                setPassword(val);
              }}
              secureTextEntry={true}
              style={[
                styles.input, {
                  borderWidth: errors.password && 1,
                  borderColor: errors.password && '#ff375b'
                }
              ]}
            />
          )}
        />

        <TouchableOpacity onPress={() => { navigation.navigate('EsqueciaSenha') }}>
          <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Criar Conta')} style={styles.buttonOutline}>
          <Text style={styles.buttonOutlineText} numberOfLines={2}>Não tem uma conta? Cadastre-se</Text>
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
    padding: 1,
    },
    containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    borderRadius: 300,
    marginTop: 10,
    top: -40,
    },
    inputContainer: {
    width: '90%',
    marginTop: 2,
    top: 40,
    },
    input: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 10,
    height: 50,
    top: -4,
    },
    buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    top: 70,
    },
    button: {
    backgroundColor: '#0782F9',
    width: '150%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
    top: 10,
    },
    buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    
    },
    buttonOutline: {
    backgroundColor: 'transparent',
    color: '#000',
    padding: '0px',
    textAlign: 'center',
    marginTop: 40,
    flexWrap: 'wrap',
    left: -30,
    top: 10,
    },
    buttonOutlineText: {
      color: '#0782F9', // Cor do texto do botão de cadastro
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
      paddingHorizontal: 0, // Remova o preenchimento horizontal
    
    },
    forgotPasswordText: {
    color: '#0782F9',
    marginTop: 15,
      alignSelf: 'flex-end', // Alinha o texto à direita
    top: -10,
    },
    label: {
      color: '#fff', // Cor branca
    fontSize: 16,
    fontWeight: 'bold',
      marginBottom: 0, // Reduzir a margem inferior para aproximar do TextInput
    top:0,
    },
    labelError:{
      alignSelf: 'flex-start',
      color: "#ff375b",
      marginBottom: 8,
    }
});