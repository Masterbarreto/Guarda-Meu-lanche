import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GoBack from "../components/Back";
import styles from "../styles/ResetPasswordStyles"; // Importa os estilos
import EmailCode from "./EmailCode";

export default function ResetPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showResetMessage, setShowResetMessage] = useState(false); // Estado para controlar o componente exibido

  const handlePasswordReset = async () => {
    if (email !== "" && password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        try {
          // Aqui você pode adicionar uma chamada à sua API personalizada para redefinir a senha
          // Exemplo: await api.resetPassword(email, password);
          setShowResetMessage(true); // Alterna para a mensagem de confirmação
          Alert.alert("Senha redefinida com sucesso");
        } catch (error) {
          console.error(error);
          Alert.alert("Erro ao redefinir senha");
        }
      } else {
        Alert.alert("As senhas não correspondem. Por favor, tente novamente.");
      }
    } else {
      Alert.alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <GoBack />
      <View style={styles.contentContainer}>
        {showResetMessage ? (
          // Exibe a mensagem de confirmação após a redefinição de senha
          <EmailCode userEmail={email} />
        ) : (
          // Formulário de redefinição de senha
          <>
            <Text style={styles.title}>Crie uma nova senha</Text>
            <Text style={styles.text}>
              Ela deve conter no mínimo 6 caracteres.
              {"\n"}
              <Text style={styles.redText}>Recomendamos usar números e caracteres.</Text>
            </Text>
            <Text style={styles.email}>Email</Text>
            <TextInput
              placeholder="Ex: seu.email@example.com"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <Text style={styles.email}>Crie uma senha</Text>
            <TextInput
              placeholder="Sua senha super segura."
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />
            <Text style={styles.email}>Confirme sua nova senha</Text>
            <TextInput
              placeholder="* * * * * *"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              secureTextEntry
            />
            <TouchableOpacity onPress={handlePasswordReset} style={styles.button}>
              <Text style={styles.buttonText}>Criar nova senha</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
