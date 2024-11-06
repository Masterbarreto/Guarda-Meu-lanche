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
import styles from "../styles/EsqueciaSenhaStyles"; // Importa os estilos
import EmailCode from "./EmailCode";

export default function EsqueciaSenha() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [showResetMessage, setShowResetMessage] = useState(false);

  const handlePasswordReset = async () => {
    if (email !== "") {
      try {
        setShowResetMessage(true); 
        Alert.alert("E-mail de redefinição de senha enviado com sucesso");
      } catch (error) {
        console.error(error);
        Alert.alert("Erro ao enviar e-mail de redefinição de senha");
      }
    } else {
      Alert.alert("Por favor, informe um e-mail válido.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <GoBack />
      <View style={styles.contentContainer}>
        {showResetMessage ? (
          // Exibe a mensagem de confirmação após o reset de senha
          <EmailCode userEmail={email} />
        ) : (
          // Formulário padrão de redefinição de senha
          <>
            <Text style={styles.title}>Esqueceu a senha?</Text>
            <Text style={styles.texto}>
              Digite seu e-mail para o processo de verificação. Dentro de alguns minutos,
              enviaremos o código para o seu e-mail.
            </Text>
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
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
