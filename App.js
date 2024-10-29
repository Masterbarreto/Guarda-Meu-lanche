import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
// import firebase from "./firebase.js";
import { SafeAreaView } from "react-native-safe-area-context";

// telas gerais
import LoginScreen from "./screens/LoginScreen.js";
import EsqueciaSenha from "./screens/EsqueciaSenha";
import RegisterScreen from "./screens/RegisterScreen";
import Verificacao from "./screens/verificação";

// telas para  usuarios
import FoodPricingScreen from "./screens/usuarios/Home.js";
import VendasScreen from "./screens/usuarios/VendasScreen.js";
import NotificationScreen from "./screens/usuarios/Notificacoes";
import PraçasScreen from "./screens/usuarios/PraçasScreen.js";
import UserScreen from "./screens/usuarios/UserScreen.js";
import ProdutoScreen from "./screens/usuarios/ProdutoScreen.js";
import CarrinhoScreen from "./screens/usuarios/CarrinhoScreen.js";
import codigoScreen from "./screens/usuarios/codigoScreen.js";
import ConfirmaçaoScreen from "./screens/usuarios/ConfirmaçaoScreen.js";
import StatusScress from "./screens/usuarios/StatusScress.js";

// telas para logistas
import UploadImageScreen from "./screens/Lojistas/UploadScreen.js";
import MinhasLojas from "./screens/Lojistas/MinhasLojasScreen.js";
import HomeLoja from "./screens/Lojistas/homeLojaScreens.js";
import PerfildaLoja from "./screens/Lojistas/PerfildaLojaScreens.js";
import AdicionarItens from "./screens/Lojistas/adicionarItensScreens.js";
import UploadScreen2 from "./screens/Lojistas/UploadScreen-2.js";
import PedidoScreen from "./screens/Lojistas/PedidoScreens.js";
import PedidosStatus from "./screens/Lojistas/PedidosStatus.js";
import PedidosScreen from "./screens/Lojistas/PedidosScreens.js";

// componetes
import CupertinoFooter1 from "./components/CupertinoFooter1.js";
import CupertinoFooter2 from "./components/CupertinoFooter2.js";
import LojaItem from "./components/LojaItem.js";
import EmailCode from "./screens/EmailCode.js";
import ResetPassword from "./screens/ResetPassWord.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer
        theme={{
          colors: {
            background: "#161616", // Defina o fundo do tema
          },
        }}
      >
        <Stack.Navigator
          screenOptions={{
            cardStyle: {
              backgroundColor: "#161616",
            },
            animationEnabled: true,
            headerShown: false,
            transitionSpec: {
              open: { animation: "timing", config: { duration: 300 } },
              close: { animation: "timing", config: { duration: 300 } },
            },
          }}
          initialRouteName="Login"
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EsqueciaSenha"
            component={EsqueciaSenha}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Transição lateral específica
            }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Criar Conta"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={FoodPricingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Verificacao"
            component={Verificacao}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Vendas"
            component={VendasScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Notificacoes"
            component={NotificationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UploadImage"
            component={UploadImageScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Praças"
            component={PraçasScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserScreen"
            component={UserScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Produto"
            component={ProdutoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Carrinho"
            component={CarrinhoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="codigo"
            component={codigoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Confirmaçao"
            component={ConfirmaçaoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MinhasLojas"
            component={MinhasLojas}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="homeLoja"
            component={HomeLoja}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PerfildaLoja"
            component={PerfildaLoja}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="adicionarItens"
            component={AdicionarItens}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UploadScreens2"
            component={UploadScreen2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Pedidos"
            component={PedidosScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PedidosStatus"
            component={PedidosStatus}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Status"
            component={StatusScress}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Pedido"
            component={PedidoScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="CupertinoFooter2"
            component={CupertinoFooter2}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="CupertinoFooter1"
            component={CupertinoFooter1}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="LojaItem"
            component={LojaItem}
            options={{ headerShown: false }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
