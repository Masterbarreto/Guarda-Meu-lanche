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
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Função para criar conta
import { auth } from "../firebase"; // Firebase auth import
import GoBack from "../components/Back";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [role, setRole] = useState(""); // Aluno ou Funcionário
  const [errors, setErrors] = useState({}); // Para armazenar erros
  const totalSteps = 3;

  const handleNextStep = () => {
    let hasError = false;
    let newErrors = {};

    // Validação simples sem Yup
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
      return; // Não avança se houver erros
    }

    // Se não houver erros, avance para a próxima etapa ou registre
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
      <GoBack></GoBack>
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
              secureTextEntry
              style={styles.input}
            />
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}
            <Text style={styles.label}>Repita Sua Senha</Text>
            <TextInput
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={styles.input}
            />
            {errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}
            <Text style={styles.label}>Data de Nascimento</Text>
            <TextInput
              placeholder="DD/MM/AAAA"
              value={birthDate}
              onChangeText={setBirthDate}
              style={styles.input}
            />
            {errors.birthDate && <Text style={styles.error}>{errors.birthDate}</Text>}
          </>
        )}

        {/* Step 3: Aluno ou Funcionário */}
        {step === 3 && (
          <>
            <Text style={styles.label}>Você é:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={setRole}
                onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
              >
                <Picker.Item label="Aluno" value="user" />
                <Picker.Item label="Funcionario" value="employee" />
              </Picker>
            </View>
            {errors.role && <Text style={styles.error}>{errors.role}</Text>}
          </>
        )}

        {/* Botões de Navegação */}
        <View style={styles.buttonContainer}>
          {step > 1 && (
            <TouchableOpacity onPress={handlePreviousStep} style={styles.button}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleNextStep} style={styles.button}>
            <Text style={styles.buttonText}>
              {step < totalSteps ? "Próximo" : "Cadastrar"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#161616",
  },
  contentContainer: {
    marginTop: 20,
    padding: 0,
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    color: "whitesmoke",
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 7,
  },
  stepText: {
    color: "whitesmoke",
    fontSize: 15,
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    color: "whitesmoke",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 3,
  },
  error: {
    color: "red",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 3,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 5,
    fontWeight: "600",
    fontSize: 15,
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 5,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#434343",
    padding: 15,
    borderRadius: 9,
    alignItems: "center",
    width: "45%",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  progressBar: {
    height: 3,
    width: "100%",
    backgroundColor: "#434343",
    borderRadius: 5,
    marginBottom: 20,
  },
  progress: {
    height: 3,
    backgroundColor: "#00ff00",
    borderRadius: 5,
  },
});
