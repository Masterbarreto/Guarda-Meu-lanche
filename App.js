import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
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
import ProductDetails from "./screens/usuarios/ProdutoScreen.js";
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
import Terms from "./screens/Terms.js";
import { ActivityIndicator } from "react-native";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";

import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";

import RestaurantsScreen from "./screens/usuarios/RestaurantScreen.js";
import RestaurantHomeScreen from "./screens/usuarios/RestaurantHomeScreen.js";
const Stack = createStackNavigator();

const scr_opts = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Transição lateral específica
};
export default function App() {
  // const [loaded, error] = useFonts({
  //   Roboto_400Regular,
  //   Roboto_700Bold,
  //   Inter_900Black,
  // });
  let [fontsLoaded] = useFonts({
    // Poppins_500Medium,
    // Poppins_600SemiBold,
    Circular: require("./assets/fonts/circular-std-medium-500.ttf"),
    GothamLight: require("./assets/fonts/GothamLight.ttf"),
    GothamMedium: require("./assets/fonts/GothamMedium.ttf"),
    GothamBold: require("./assets/fonts/GothamBold.ttf"),
    "Gilroy-Regular": require("./assets/fonts/Gilroy-Regular.ttf"),
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
    Montserrat_600SemiBold,
  });
  // useEffect(() => {
  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded, error]);

  // if (!loaded && !error) {
  //   return null;
  // }
  // Exibe um carregador enquanto as fontes estão sendo carregadas
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

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
              open: { animation: "timing", config: { duration: 100 } },
              close: { animation: "timing", config: { duration: 300 } },
            },
          }}
          initialRouteName="Login"
        >
          <Stack.Screen
            name="EsqueciaSenha"
            component={EsqueciaSenha}
            options={scr_opts}
          />
          <Stack.Screen
            name="Restaurants"
            component={RestaurantsScreen}
            options={scr_opts}
          />
          <Stack.Screen
            name="RestaurantHomeScreen"
            component={RestaurantHomeScreen}
            options={scr_opts}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Terms" component={Terms} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="Criar Conta" component={RegisterScreen} />
          <Stack.Screen name="Home" component={FoodPricingScreen} />
          <Stack.Screen name="Verificacao" component={Verificacao} />
          <Stack.Screen name="Vendas" component={VendasScreen} />
          <Stack.Screen name="Notificacoes" component={NotificationScreen} />
          <Stack.Screen name="UploadImage" component={UploadImageScreen} />
          <Stack.Screen name="Praças" component={PraçasScreen} />
          <Stack.Screen name="UserScreen" component={UserScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="Carrinho" component={CarrinhoScreen} />
          <Stack.Screen name="Code" component={codigoScreen} />
          <Stack.Screen name="Confirmaçao" component={ConfirmaçaoScreen} />
          <Stack.Screen name="MinhasLojas" component={MinhasLojas} />
          <Stack.Screen name="homeLoja" component={HomeLoja} />
          <Stack.Screen name="PerfildaLoja" component={PerfildaLoja} />
          <Stack.Screen name="adicionarItens" component={AdicionarItens} />
          <Stack.Screen name="UploadScreens2" component={UploadScreen2} />
          <Stack.Screen name="Pedidos" component={PedidosScreen} />
          <Stack.Screen name="PedidosStatus" component={PedidosStatus} />
          <Stack.Screen name="Status" component={StatusScress} />
          <Stack.Screen name="Pedido" component={PedidoScreen} />
          <Stack.Screen name="LojaItem" component={LojaItem} />
          <Stack.Screen name="CupertinoFooter2" component={CupertinoFooter2} />
          <Stack.Screen name="CupertinoFooter1" component={CupertinoFooter1} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
