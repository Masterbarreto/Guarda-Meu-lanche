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
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import GoBack from "../components/Back";

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
    color: "whitesmoke",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 3,
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