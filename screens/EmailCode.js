import React, { useState, useRef } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { API_URL } from "@env";
import axios from "axios";
const validationSchema = Yup.object().shape({
  code: Yup.string()
    .length(5, "O código deve ter exatamente 5 dígitos")
    .required("O código é obrigatório"),
});

export default function EmailCode({ userEmail }) {
  const navigation = useNavigation();

  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [code, setCode] = useState(["", "", "", "", ""]); // Estado para os 5 dígitos
  const inputRefs = useRef([]); // Referências para os inputs

  const handleDigitChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    setValidationError(""); // Limpa a mensagem de erro ao digitar

    if (text && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !code[index]) {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleVerifyCode = async () => {
    try {
      const enteredCode = code.join("");
      await validationSchema.validate({ code: enteredCode }); // Validação agora aceita string
      let validatedCode = await validateCode(userEmail, enteredCode);

      if (validatedCode.error) {
        setValidationError("Código inválido.");
        return;
      }

      setTimeout(() => {
        navigation.navigate(
          "ResetPassword",
            { userEmail,code:enteredCode },
        );
      }, 300);
    } catch (error) {
      console.log(error);

      setValidationError(error.message);
    }
  };
  const validateCode = async (userEmail, code) => {
    const email = userEmail;

    const url = `${API_URL}/reset_password?email=${email}&code=${code}`;

    return axios
      .get(url)
      .then((data) => data.data)
      .catch((e) => e.response.data);
  };
  return (
    <View>
      <Text style={styles.title}>Digite o código enviado</Text>
      <Text style={styles.texto}>
        Digite o código de verificação que enviamos para{" "}
        <Text style={styles.email}>{userEmail}</Text>.
      </Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            value={digit}
            onChangeText={(text) => handleDigitChange(text, index)}
            maxLength={1}
            keyboardType="numeric"
            style={styles.digitInput}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>
      {validationError ? (
        <Text style={{ color: "red", marginTop: 3, fontSize: 12, fontWeight: "700" }}>
          {validationError}
        </Text>
      ) : null}

      <TouchableOpacity onPress={handleVerifyCode} style={styles.button}>
        <Text style={styles.buttonText}>Verificar Código</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#161616",
  },
  title: {
    color: "whitesmoke",
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 7,
  },
  texto: {
    color: "whitesmoke",
    fontSize: 16,
    marginBottom: 50,
    marginTop: 10,
  },
  email: {
    color: "#756675",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 3,
    letterSpacing: 0.9,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  digitInput: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#434343",
    padding: 15,
    borderRadius: 9,
    marginTop: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
