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
import EmailCode from "./EmailCode";
import * as Yup from "yup";
import axios from "axios";
import { API_URL } from "@env";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("O email é obrigatório"),
});

export default function EsqueciaSenha() {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState("");

  const navigation = useNavigation();
  const [showResetMessage, setShowResetMessage] = useState(false);

  const handlePasswordReset = async () => {
    try {
      await validationSchema.validate({ email });

      const userData = await sendMail(email);
      console.log(userData);
      
      if (userData.error?.status) {
        if (userData.error.status == 404) {
          setValidationError("Email não encontrado.");
          return
        }
        
      }

      setShowResetMessage(true);
    } catch (error) {
      console.log(error);
      
      if (error.name === "ValidationError") {
        setValidationError(error.message);
      } else {
        console.error("Erro inesperado:", error);
        setValidationError("Ocorreu um erro inesperado. Tente novamente.");
      }
    }
  };

  const sendMail = async (email) => {
    const url = `${API_URL}/reset_password?email=${email}`;

    return axios
      .get(url)
      .then((data) => data.data)
      .catch((e) => e.response.data);
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <GoBack />
      <View style={styles.contentContainer}>
        {showResetMessage ? (
          <EmailCode userEmail={email} />
        ) : (
          <>
            <Text style={styles.title}>Esqueceu a senha?</Text>
            <Text style={styles.texto}>
              Digite seu e-mail para o processo de verificação, dentro de alguns minutos
              enviaremos o código para o seu e-mail.
            </Text>
            <Text style={styles.email}>Email</Text>
            <TextInput
              placeholder="Ex: seu.email@example.com"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            {validationError ? (
              <Text
                style={{ color: "red", marginTop: 3, fontSize: 12, fontWeight: "700" }}
              >
                {validationError}
              </Text>
            ) : null}
            <TouchableOpacity onPress={handlePasswordReset} style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
