import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from './firebase.js';
import { SafeAreaView } from 'react-native-safe-area-context';

// telas gerais 
import LoginScreen from './screens/LoginScreen.js';
import EsqueciaSenha from './screens/EsqueciaSenha';
import RegisterScreen from './screens/RegisterScreen'; 

// telas para  usuarios 
import FoodPricingScreen from './screens/usuarios/Home.js';
import Verificacao from './screens/usuarios/verificação';
import VendasScreen from './screens/usuarios/VendasScreen.js';
import NotificationScreen from './screens/usuarios/Notificacoes';
import PraçasScreen from './screens/usuarios/PraçasScreen.js';
import UserScreem  from './screens/usuarios/UserScreem.js'
import ProdutoScreen from './screens/usuarios/ProdutoScreen.js';
import CarrinhoScreem from './screens/usuarios/CarrinhoScreem.js';
import codigoScreem from './screens/usuarios/codigoScreem.js';
import ConfirmaçaoScreem from './screens/usuarios/ConfirmaçaoScreem.js'

// telas para logistas
import UploadImageScreen from './screens/Lojistas/UploadScreen.js';
import MinhasLojas from './screens/Lojistas/MinhasLojasScreen.js';
import HomeLoja from './screens/Lojistas/homeLojaScreens.js'
import PerfildaLoja from './screens/Lojistas/PerfildaLojaScreens.js';
import AdicionarItens from './screens/Lojistas/adicionarItensScreens.js';


// componetes 
import CupertinoFooter1 from './components/CupertinoFooter1.js'
import CupertinoFooter2 from './components/CupertinoFooter2.js'
import LojaItem from './components/LojaItem.js';


const Stack = createStackNavigator();

export default function App() {
  return (
    
    <SafeAreaView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EsqueciaSenha" component={EsqueciaSenha} options={{ headerShown: false }} />
        <Stack.Screen name="Criar Conta" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={FoodPricingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Verificacao" component={Verificacao} options={{ headerShown: false }} />
        <Stack.Screen name="Vendas" component={VendasScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Notificacoes" component={NotificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UploadImage" component={UploadImageScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Praças" component={PraçasScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserScreem" component={UserScreem} options={{ headerShown: false }} />
        <Stack.Screen name="Produto" component={ProdutoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Carrinho" component={CarrinhoScreem} options={{ headerShown: false }} />
        <Stack.Screen name="codigo" component={codigoScreem} options={{ headerShown: false }} />
        <Stack.Screen name="Confirmaçao" component={ConfirmaçaoScreem} options={{ headerShown: false }} />
        <Stack.Screen name="MinhasLojas" component={MinhasLojas} options={{ headerShown: false }} />
        <Stack.Screen name="homeLoja" component={HomeLoja} options={{ headerShown: false }} />
        <Stack.Screen name="PerfildaLoja" component={PerfildaLoja} options={{ headerShown: false }} />
        <Stack.Screen name="adicionarItens" component={AdicionarItens} options={{ headerShown: false }} />

        <Stack.Screen name="CupertinoFooter2" component={CupertinoFooter2} options={{ headerShown: false}}></Stack.Screen>
        <Stack.Screen name="CupertinoFooter1" component={CupertinoFooter1} options={{ headerShown: false}}></Stack.Screen>
        <Stack.Screen name="LojaItem" component={LojaItem} options={{ headerShown: false}}></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
        </SafeAreaView>
  );
}