import React from 'react';
import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { myFS } from '../firebase';
import LogoPrincipal from '../components/LogoPrincipal.js';
import styles from '../styles/LoginScreenStyles'; // Importa os estilos

const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Informe seu email"),
  password: yup.string().required("Informe sua senha").min(6, "A senha deve ter pelo menos 6 dígitos"),
});

export default function LoginScreen({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (data) => {
    try {
      if (!data.email || !data.password) {
        throw new Error('Email e senha são obrigatórios.');
      }

      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      const userDocRef = doc(myFS, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      if (userData && userData.role) {
        if (userData.role === 'Aluno') {
          navigation.navigate('Home');
        } else if (userData.role === 'Lojista') {
          navigation.navigate('MinhasLojas');
        } else {
          console.error('Papel não reconhecido:', userData.role);
        }
      } else {
        console.error('Usuário sem papel definido');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <LogoPrincipal />
        </View>

        <View style={styles.mainBottom}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            {errors.email?.message && <Text style={styles.labelError}>{errors.email?.message}</Text>}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Ex: Lucas.gomes@gmail.com"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={[styles.input, {
                    borderWidth: errors.email && 1,
                    borderColor: errors.email && '#ff375b'
                  }]}
                />
              )}
            />

            <Text style={styles.label}>Senha</Text>
            {errors.password?.message && <Text style={styles.labelError}>{errors.password?.message}</Text>}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="*********"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={true}
                  style={[styles.input, {
                    borderWidth: errors.password && 1,
                    borderColor: errors.password && '#ff375b'
                  }]}
                />
              )}
            />

            <TouchableOpacity onPress={() => { navigation.navigate('EsqueciaSenha') }}>
              <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSubmit(handleLogin)} style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Criar Conta')} style={styles.buttonOutline}>
            <View style={styles.rect1}></View>
            <Text style={styles.buttonOutlineText}>
              Não tem uma conta? Cadastre-se
            </Text>
            <View style={styles.rect2}></View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
