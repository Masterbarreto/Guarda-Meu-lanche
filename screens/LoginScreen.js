import React, { useState, useEffect } from "react";
import {
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
import styles from "../styles/LoginScreenStyles";
import LogoPrincipal from "../components/LogoPrincipal"; // Ajuste o caminho conforme necessário
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Schema de validação para o formulário
const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Informe seu email"),
  password: yup
    .string()
    .required("Informe sua senha")
    .min(6, "A senha deve ter pelo menos 6 dígitos"),
});

export default function LoginScreen({ navigation }) {
  const [validationError, setValidationError] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [keyboardActive, setKeyboardActive] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data) => {
    try {
      if (!data.email || !data.password) {
        throw new Error("Email e senha são obrigatórios.");
      }

      const url = `${API_URL}/users/login/`;

      let response = await axios
        .post(url, {
          email: data.email,
          password: data.password,
        })
        .then((data) => {
          return data.data;
        })
        .catch((e) => {
          return e.response.data;
        });

      if (response.error?.message == "usuario não encontrado.") {
        setValidationError("Usuário não encontrado.");
      }
      if (response.error?.message == "senha incorreta.") {
        setPasswordValidation("Senha incorreta.");
      }

      const roles = {
        user: "Home",
        employer: "MinhasLojas",
      };

      AsyncStorage.setItem("credentials", JSON.stringify(response));

      navigation.navigate(roles[response.type]);

      // if (!response.ok) {
      //   // Lidando com erros de resposta da API de forma mais informativa
      //   if (response.status === 401) {
      //     // Credenciais inválidas
      //     Alert.alert("Erro", "Email ou senha incorretos.");
      //   } else {
      //     // Outros erros de API
      //     Alert.alert(
      //       "Erro",
      //       "Ocorreu um erro ao fazer login. Tente novamente mais tarde."
      //     );
      //   }
      //   throw new Error("Erro ao fazer login");
      // }

      // const userData = await response.json();
      // console.log(userData);

      // Agora você tem userData.type após o login
      // if (userData && userData.type) {
      //   if (userData.type === "user") {
      //     navigation.navigate("Home");
      //   } else if (userData.type === "Lojista") {
      //     navigation.navigate("MinhasLojas");
      //   } else {
      //     console.error("Papel não reconhecido:", userData.type);
      //   }
      // } else {
      //   console.error("Usuário sem papel definido");
      // }

      reset(); // Limpar os campos após o login (opcional)
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      reset(); // Limpar os campos em caso de erro (opcional)
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      // Lógica para quando o teclado é exibido (opcional)
      setPasswordValidation("");
      setValidationError("");
      setKeyboardActive(true);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setPasswordValidation("");
      setValidationError("");
      setKeyboardActive(false);

      // Lógica para quando o teclado é ocultado (opcional)
    });

    // Limpar listeners ao desmontar o componente
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          {!keyboardActive ? <LogoPrincipal /> : null}
        </View>

        <View style={styles.mainBottom}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Ex: seu.email@example.com"
                  value={value}
                  onChangeText={onChange}
                  onBlur={(onBlur) => {
                    setValidationError("");
                  }}
                  onKeyPress={() => setValidationError("")}
                  style={[
                    styles.input,
                    {
                      borderWidth: errors.email ? 1 : 0,
                      borderColor: errors.email ? "red" : "#434343",
                      fontWeight: "800",
                    },
                  ]}
                />
              )}
            />
            {validationError ? (
              <Text
                style={{
                  color: "red",
                  marginBottom: 8,
                  marginTop: 8,
                  fontSize: 12,
                  fontWeight: "700",
                }}
              >
                {validationError}
              </Text>
            ) : null}
            {errors.email?.message && (
              <Text
                style={{
                  color: "red",
                  marginTop: 2,
                  marginBottom: 10,
                  fontSize: 12,
                  fontWeight: "700",
                }}
              >
                {errors.email?.message}
              </Text>
            )}
            <Text style={styles.label}>Senha</Text>

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="*********"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={true}
                  style={[
                    styles.input,
                    {
                      borderWidth: errors.password ? 1 : 0,
                      borderColor: errors.password ? "red" : "#434343",
                      fontWeight: "800",
                      letterSpacing: 10,
                    },
                  ]}
                />
              )}
            />
            {passwordValidation ? (
              <Text
                style={{
                  color: "red",
                  marginBottom: 8,
                  marginTop: 8,
                  fontSize: 12,
                  fontWeight: "700",
                }}
              >
                {passwordValidation}
              </Text>
            ) : null}
            {errors.password?.message && (
              <Text
                style={{ color: "red", marginTop: 3, fontSize: 12, fontWeight: "700" }}
              >
                {errors.password?.message}
              </Text>
            )}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EsqueciaSenha");
              }}
            >
              <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
            </TouchableOpacity>
          </View>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
