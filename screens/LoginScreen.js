import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Importe sua instância do Firebase
import { getDoc, doc } from "firebase/firestore";
import { myFS } from "../firebase";
import LogoPrincipal from "../components/LogoPrincipal.js";
import styles from '../styles/LoginScreenStyles'; // Importa os estilos

const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Informe seu email"),
  password: yup
    .string()
    .required("Informe sua senha")
    .min(6, "A senha deve ter pelo menos 6 dígitos"),
});

export default function LoginScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    // Listener para detectar quando o teclado é ativado
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true); // Ativa o estado do teclado
    });

    // Listener para detectar quando o teclado é desativado
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false); // Desativa o estado do teclado
    });

    // Limpar listeners ao desmontar o componente
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleLogin = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      const userDocRef = doc(myFS, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      if (userData && userData.role) {
        if (userData.role === "Aluno") {
          navigation.navigate("Home");
        } else if (userData.role === "Lojista") {
          navigation.navigate("MinhasLojas");
        } else {
          console.error("Papel não reconhecido:", userData.role);
        }
      } else {
        console.error("Usuário sem papel definido");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* O estilo da logo é ajustado com base no estado do teclado */}
        {!isKeyboardVisible && (
          <View style={styles.logoContainer}>
            <LogoPrincipal />
          </View>
        )}

        <View style={styles.mainBottom}>
          <Text style={styles.welcomeText}>Seja bem vindo de volta!</Text>
          <Text style={styles.h2}>Um app pra estudantes, feito por estudantes.</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            {errors.email?.message && (
              <Text style={styles.labelError}>{errors.email?.message}</Text>
            )}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Ex: Lucas.gomes@gmail.com"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={[
                    styles.input,
                    {
                      borderWidth: errors.email && 1,
                      borderColor: errors.email && "#ff375b",
                      fontWeight: "600",
                      letterSpacing: 0.3,
                      fontSize: 15,
                    },
                  ]}
                />
              )}
            />

            <Text style={styles.label}>Senha</Text>
            {errors.password?.message && (
              <Text style={styles.labelError}>{errors.password?.message}</Text>
            )}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="* * * * * * * * *"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={true}
                  style={[
                    styles.input,
                    {
                      borderWidth: errors.password && 1,
                      borderColor: errors.password && "#ff375b",
                      fontWeight: "900",
                      letterSpacing: 3,
                      fontSize: 18,
                    },
                  ]}
                />
              )}
            />

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EsqueciaSenha");
              }}
            >
              <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSubmit(handleLogin)} style={styles.button}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Criar Conta")}
              style={styles.buttonOutline}
            >
              <View style={styles.rect1}></View>
              <Text style={styles.buttonOutlineText}>Não tem uma conta? Cadastre-se</Text>
              <View style={styles.rect2}></View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
