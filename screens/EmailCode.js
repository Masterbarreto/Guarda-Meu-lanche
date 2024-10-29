import React, { useState, useRef } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GoBack from "../components/Back";

export default function EmailCode({ userEmail }) {
  const navigation = useNavigation();
  const [code, setCode] = useState(["", "", "", "", ""]); // Estado para os 5 dígitos
  const inputRefs = useRef([]); // Referências para os inputs

  const handleDigitChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 4) {
      // Move o foco para o próximo campo se houver entrada
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !code[index]) {
      // Limpa o campo e move o foco para o campo anterior se estiver vazio
      if (index > 0) {
        inputRefs.current[index - 1].focus();
        const newCode = [...code];
        newCode[index - 1] = ""; // Limpa o campo anterior
        setCode(newCode);
      }
    }
  };

  const handleVerifyCode = () => {
    const enteredCode = code.join("");
    if (enteredCode.length === 5) {
      Alert.alert("Código verificado com sucesso!");
      navigation.navigate("ResetPassword");
    } else {
      Alert.alert("Por favor, insira o código completo.");
    }
  };

  return (
    <View>
      <Text style={styles.title}>Digite o código enviado</Text>
      <Text style={styles.texto}>
        Digite o código de verificação que enviamos para <Text style={styles.email}>{userEmail}</Text>.
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
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
    width: "auto",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
