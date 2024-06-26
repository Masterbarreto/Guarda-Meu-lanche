import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import EsqueciaSenha from './screens/EsqueciaSenha';
import Home from './screens/Home';
import RegisterScreen from './screens/RegisterScreen';
import Verificacao from './screens/verificação';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EsqueciaSenha" component={EsqueciaSenha} options={{ headerShown: false }} />
        <Stack.Screen name="Criar Conta" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Verificacao" component={Verificacao} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}