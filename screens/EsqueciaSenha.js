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
import styles from "../styles/EsqueciaSenhaStyles"; // Importa os estilos

export default function EsqueciaSenha() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const handlePasswordReset = async () => {
    if (email !== "") {
      try {
        await sendPasswordResetEmail(auth, email);
        Alert.alert(`Foi enviado um email para: ${email}.`);
        navigation.navigate("Login");
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
      <GoBack></GoBack>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Esqueceu a senha?</Text>
        <Text style={styles.texto}>
          Digite seu e-mail para o processo de verificação,dentro de alguns minutos
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
      </View>
    </KeyboardAvoidingView>
  );
}
