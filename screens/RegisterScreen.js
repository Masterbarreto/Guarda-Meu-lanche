import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView , } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const schema = yup.object().shape({
  email: yup.string().email("Email invalido").required("informe seu email"),
  password: yup.string().required("informe sua senha").min(6, "a senha deve ter pelo menos 6 digitos"),
  name: yup.string().required("informe seu nome"),
  birthDate: yup.string().required("informe seu aniversario"),
  surname: yup.string().required("informe seu Sobrenome"),
  confirmPassword: yup.string().required("informe sua senha").min(6, "a senha deve ter pelo menos 6 digitos"),
})

export default function RegisterScreen({ navigation }) {
  const [selected, setSelected] = React.useState("");

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSigin = (data) => {
    navigation.navigate('Home');
    console.log(data);
  }

  const onSubmit = (data) => {
    handleSigin(data);
  }

  const select = [
    {key:'1', value:'Aluno'},
    {key:'2', value:'Funcionario'},
  ]

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.voltar}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.surname}>Pai ou aluno</Text>
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
                placeholder="  "
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
        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
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
  contentContainer: {
    width: '100%',
    padding: 20,
  },
  voltar: {
    color: '#FFF',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 11,
    borderRadius: 21,
    marginTop: 0,
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 0,
  },
  labelError: {
    alignSelf: 'flex-start',
    color: "#ff375b",
    marginBottom: 8,
    marginLeft: 0,
  },
  name: {
    color: '#FFF', // Texto branco
    fontSize: 16,
    marginTop: 20,
  },
  surname: {
    color: '#FFF', // Texto branco
    fontSize: 16,
    marginTop: 20,
  },
  birthDate: {
    color: '#FFF', // Texto branco
    fontSize: 16,
    marginTop: 20,
  },
  email: {
    color: '#FFF', // Texto branco
    fontSize: 16,
    marginTop: 20,
  },
  password: {
    color: '#FFF', // Texto branco
    fontSize: 16,
    marginTop: 20,
  },
  confirmPassword: {
    color: '#FFF', // Texto branco
    fontSize: 16,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',

  },
  selectBox: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 21,
    marginTop: 20,
  },
  selectDropdown: {
    borderRadius: 21,
    marginTop: 5,
    color: '#FFFFFF',
  },
});










































































































