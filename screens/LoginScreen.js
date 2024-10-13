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
  logoContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  inputContainer: {
    marginTop: 0,
  },
  input: {
    width: 342,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  buttonContainer: {
    marginTop: -30,
  },
  button: {
    backgroundColor: "#434343",
    padding: 15,
    borderRadius: 9,
    marginTop: 70,
    alignItems: "center",
    width: 340,
  },
  buttonText: {
    color: "whitesmoke",
    fontWeight: "600",
    fontSize: 18,
    letterSpacing: 1,
  },
  buttonOutline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 0.7,
  },
  buttonOutlineText: {
    color: "#434343",
    fontWeight: "800",
    fontSize: 11,
    marginHorizontal: 10,
  },
  forgotPasswordText: {
    color: "#ec3c22",
    marginTop: 12,
    fontSize: 14,
    textAlign: "right",
    marginRight: 2,
    fontWeight: "600",
  },
  label: {
    color: "#444444",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 3,
  },
  labelError: {
    color: "#ff375b",
    marginBottom: 8,
    marginLeft: 10,
  },
  mainBottom: {
    marginBottom: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    width: "100%",
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  rect1: {
    width: 80,
    height: 1,
    backgroundColor: "#E6E6E6",
  },
  rect2: {
    width: 80,
    height: 1,
    backgroundColor: "#E6E6E6",
  },
  welcomeText: {
    color: "#434343",
    fontSize: 19,
    fontWeight: "800",
    marginTop: 10,
    marginLeft: 0,
    alignSelf: "flex-start",
    marginLeft: 25,
    paddingTop: 20,
  },
  h2: {
    color: "#434343",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 0,
    alignSelf: "flex-start",
    marginLeft: 25,
    paddingBottom: 20,
    margin: 0,
  },
});
