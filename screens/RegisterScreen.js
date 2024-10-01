import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../firebase.js';
import { addDoc, collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { myFS } from '../firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';

const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Informe seu email"),
  password: yup.string().required("Informe sua senha").min(6, "A senha deve ter pelo menos 6 dígitos"),
  name: yup.string().required("Informe seu nome"),
  birthDate: yup.string().required("Informe seu aniversário").test("data-valida","Data inválida. Utilize o formato DD/MM/AAAA",(value) => {const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([12][0-9]{3})$/;return regex.test(value);}),
  surname: yup.string().required("Informe seu sobrenome"),
  confirmPassword: yup.string()
    .required("Informe sua senha")
    .min(6, "A senha deve ter pelo menos 6 dígitos")
    .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
});

export default function RegisterScreen({ navigation }) {
  const [selected, setSelected] = React.useState("");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Store user data in Firestore
      await setDoc(doc(myFS, "users", user.uid), {
        email: data.email,
        name: data.name,
        birthDate: data.birthDate,
        surname: data.surname,
        role: selected,
      });

      console.log('Usuário criado com sucesso!');
      navigation.navigate('Home'); 
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.error('O endereço de e-mail já está em uso. Por favor, tente um endereço de e-mail diferente.');
      } else {
        console.error('Erro ao criar usuário:', error);
      }
    }
  };

  const select = [
    {key:'1', value:'Aluno'},
    {key:'2', value:'Funcionario'},
  ]

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Icon name="arrow-back" size={24} color="#FFF" style={styles.voltar} />
        </TouchableOpacity>

        <Text style={styles.label}>Aluno ou Funcionário</Text>
        <SelectList
          setSelected={(val) => setSelected(val)}
          data={select}
          save="value"
          boxStyles={styles.selectBox}
          dropdownStyles={styles.selectDropdown}
        />
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text style={styles.label}>Nome</Text>
              {errors.name?.message && <Text style={styles.labelError}>{errors.name?.message}</Text>}
              <TextInput
                placeholder=""
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={[styles.input, { borderColor: errors.name && '#ff375b' }]}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="surname"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text style={styles.label}>Sobrenome</Text>
              {errors.surname?.message && <Text style={styles.labelError}>{errors.surname?.message}</Text>}
              <TextInput
                placeholder=""
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={[styles.input, { borderColor: errors.surname && '#ff375b' }]}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="birthDate"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text style={styles.label}>Data de nacimento</Text>
              {errors.birthDate?.message && <Text style={styles.labelError}>{errors.birthDate?.message}</Text>}
              <TextInput
                placeholder=" Data de nacimento "
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={[styles.input, { borderColor: errors.birthDate && '#ff375b' }]}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text style={styles.label}>Email</Text>
              {errors.email?.message && <Text style={styles.labelError}>{errors.email?.message}</Text>}
              <TextInput
                placeholder=""
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={[styles.input, { borderColor: errors.email && '#ff375b' }]}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text style={styles.label}>Senha</Text>
              {errors.password?.message && <Text style={styles.labelError}>{errors.password?.message}</Text>}
              <TextInput
                placeholder=""
                value={value}
                onChangeText={onChange}
                secureTextEntry
                onBlur={onBlur}
                style={[styles.input, { borderColor: errors.password && '#ff375b' }]}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text style={styles.label}>Confirmar Senha</Text>
              {errors.confirmPassword?.message && <Text style={styles.labelError}>{errors.confirmPassword?.message}</Text>}
              <TextInput
                placeholder=" "
                value={value}
                onChangeText={onChange}
                secureTextEntry
                onBlur={onBlur}
                style={[styles.input, { borderColor: errors.confirmPassword && '#ff375b' }]}
              />
            </View>
          )}
        />
        <TouchableOpacity onPress={handleSubmit(handleRegister)} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}


///__________________________________________________________________________________________//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
  },
  contentContainer: {
    width: '90%', 
    padding: 11,
    marginTop: -50, 
  },
  voltar: {
    color: '#FFF',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    padding: 9,
    borderRadius: 20, // Rounded corners for inputs
    paddingHorizontal: 10,
    marginTop: 1,
    fontSize: 16,
  },
  label: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 11,
    marginLeft: 8,
  },
  labelError: {
    color: "#ff375b",
    marginBottom: 5,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#0782F9', // Blue button
    width: '100%',
    padding: 16,
    borderRadius: 30, // Make the button have more rounded corners
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  selectBox: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 20, // Rounded corners for the dropdown
    marginTop: 10,
  },
  selectDropdown: {
    borderRadius: 10,
    marginTop: 5,
  },
});
























































