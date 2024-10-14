import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Função para criar conta
import { auth } from "../firebase"; // Firebase auth import
import GoBack from "../components/Back";
import styles from '../styles/RegisterScreenStyles';
import * as Yup from 'yup';

// Definindo o schema de validação
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Por favor, preencha seu nome.'),
  email: Yup.string().email('Email inválido').required('Por favor, preencha seu email.'),
  password: Yup.string().required('Por favor, preencha sua senha.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas não coincidem')
    .required('Confirme sua senha.'),
  birthDate: Yup.string().required('Por favor, preencha sua data de nascimento.'),
  role: Yup.string().required('Por favor, selecione Aluno ou Funcionário.'),
});

const formatDate = (value) => {
  let cleanValue = value.replace(/\D/g, '');
  if (cleanValue.length >= 8) {
    const day = cleanValue.slice(0, 2);
    const month = cleanValue.slice(2, 4);
    const year = cleanValue.slice(4, 8);
    return `${day}/${month}/${year}`;
  }
  return value;
};

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const totalSteps = 3;

  const handleNextStep = async () => {
    let hasError = false;
    let newErrors = {};

    if (step === 1) {
      if (!name) {
        hasError = true;
        newErrors.name = "Por favor, preencha seu nome.";
      }
      if (!email) {
        hasError = true;
        newErrors.email = "Por favor, preencha seu email.";
      }
    } else if (step === 2) {
      if (!password) {
        hasError = true;
        newErrors.password = "Por favor, preencha sua senha.";
      }
      if (password !== confirmPassword) {
        hasError = true;
        newErrors.confirmPassword = "As senhas não coincidem.";
      }
      if (!birthDate) {
        hasError = true;
        newErrors.birthDate = "Por favor, preencha sua data de nascimento.";
      }
    } else if (step === 3) {
      if (!role) {
        hasError = true;
        newErrors.role = "Por favor, selecione Aluno ou Funcionário.";
      }
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleRegister();
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Conta criada com sucesso!", `Bem-vindo(a), ${name}!`);
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro ao criar a conta", "Verifique os dados e tente novamente.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.containerGoBack}>
        <GoBack style={styles.GoBack}></GoBack>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Cadastro</Text>
        <Text style={styles.stepText}>Passo {step} de 3</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${(step / totalSteps) * 100}%` }]} />
        </View>

        {/* Step 1: Nome e Email */}
        {step === 1 && (
          <>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              placeholder="Digite seu nome"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Ex: seu.email@example.com"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          </>
        )}

        {/* Step 2: Senha e Data de Nascimento */}
        {step === 2 && (
          <>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              placeholder="Digite sua senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              style={styles.input}
            />
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}
            <Text style={styles.label}>Confirmar Senha</Text>
            <TextInput
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
              style={styles.input}
            />
            {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
            <Text style={styles.label}>Data de Nascimento</Text>
            <TextInput
              placeholder="DD/MM/YYYY"
              value={formatDate(birthDate)} // Usando a função de formatação
              onChangeText={(text) => setBirthDate(formatDate(text))} // Atualizando a data formatada
              style={styles.input}
            />
            {errors.birthDate && <Text style={styles.error}>{errors.birthDate}</Text>}
          </>
        )}

        {/* Step 3: Função */}
        {step === 3 && (
         <>
            <Text style={styles.label}>Você é:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={role}
                onValueChange={(itemValue) => setRole(itemValue)}
              >
                <Picker.Item label="Aluno" value="Aluno" />
                <Picker.Item label="Funcionário" value="Funcionário" />
              </Picker>
            </View>
            {errors.role && <Text style={styles.error}>{errors.role}</Text>}
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={handleNextStep}>
          <Text style={styles.buttonText}>{step < totalSteps ? "Próximo" : "Cadastrar"}</Text>
        </TouchableOpacity>

        {step > 1 && (
          <TouchableOpacity style={styles.button} onPress={handlePreviousStep}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
