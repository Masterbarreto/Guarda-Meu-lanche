import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GoBack from "../components/Back";
import styles from "../styles/ResetPasswordStyles"; // Importa os estilos

import * as Yup from "yup";
import { API_URL } from "@env";
import axios from "axios";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("A senha é obrigatória.")
    .min(6, "A senha deve ter no mínimo 6 caracteres."),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas devem ser iguais.")
    .required("A confirmação da senha é obrigatória."),
});

export default function ResetPassword({ route }) {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showResetMessage, setShowResetMessage] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handlePasswordReset = async () => {
    try {
      const { code, userEmail } = route.params;

      const url = `${API_URL}/reset_password`;
      const data = {
        email: userEmail,
        new_password: password,
        confirm_password: confirmPassword,
        code: Number(code),
      };

      const response = await axios.post(url, data);

      if (response.data.status == 200) {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const validateField = async (field, data) => {
    try {
      setValidationError("");
      await validationSchema.validateAt(field, data);
    } catch (error) {
      setValidationError(error.message);
    }
  };
  const resetPassword = async (password) => {};
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <GoBack />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Crie uma nova senha</Text>
        <Text style={styles.text}>
          Ela deve conter no mínimo 6 caracteres.
          {"\n"}
          <Text style={styles.redText}>Recomendamos usar números e caracteres.</Text>
        </Text>
        <Text style={styles.email}>Crie uma senha</Text>
        <TextInput
          placeholder="Sua senha super segura."
          value={password}
          onChangeText={setPassword}
          onBlur={() => validateField("password", { password })}
          style={styles.input}
        />
        <Text style={styles.email}>Confirme sua nova senha</Text>
        <TextInput
          placeholder="* * * * * *"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          onBlur={() =>
            validateField("confirm_password", {
              confirm_password: confirmPassword,
              password,
            })
          }
          style={styles.input}
        />
        {validationError ? (
          <Text style={{ color: "red", marginTop: 3, fontSize: 12, fontWeight: "700" }}>
            {validationError}
          </Text>
        ) : null}

        <TouchableOpacity onPress={handlePasswordReset} style={styles.button}>
          <Text style={styles.buttonText}>Criar nova senha.</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}