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
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import GoBack from "../components/Back";
import styles from "../styles/ResetPasswordStyles"; // Importa os estilos
import EmailCode from "./EmailCode";

export default function ResetPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [showResetMessage, setShowResetMessage] = useState(false); // Estado para controlar o componente exibido

  const handlePasswordReset = async () => {
    if (email !== "") {
      try {
        await sendPasswordResetEmail(auth, email);
        setShowResetMessage(true); // Alterna para a mensagem de confirmação
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
      <GoBack />
      <View style={styles.contentContainer}>
        {showResetMessage ? (
          // Exibe a mensagem de confirmação após o reset de senha
          <EmailCode userEmail={email}></EmailCode>
        ) : (
          // Formulário padrão de redefinição de senha
          <>
            <Text style={styles.title}>Crie uma nova senha</Text>
            <Text style={styles.text}>
              Ela deve conter no mínimo 6 caracteres.
              {"\n"}
              <Text style={styles.redText}>Recomendamos usar números e caracteres.</Text>
            </Text>
            <Text style={styles.email}>Crie uma senha</Text>
            <TextInput
              placeholder="Sua senha super segura."
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <Text style={styles.email}>Confirme sua nova senha</Text>
            <TextInput
              placeholder="* * * * * *"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TouchableOpacity onPress={handlePasswordReset} style={styles.button}>
              <Text style={styles.buttonText}>Criar nova senha.</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
