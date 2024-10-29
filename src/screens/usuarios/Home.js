// screens/usuarios/FoodPricingScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import CupertinoFooter1 from "../../components/CupertinoFooter1";
import styles from '../../styles/usuarios/HomeStyles';

export default function FoodPricingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('UserScreen')}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.containerLogo}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Praças')}>
        <Icon name="restaurant-menu" size={24} color="#000000" />
        <Text style={styles.buttonText}>Preço de alimentação - P1</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UploadImage')}>
        <Icon name="fastfood" size={24} color="#000000" />
        <Text style={styles.buttonText}>Preço de alimentação - P2</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Vendas')}>
        <Icon name="local-dining" size={24} color="#000000" />
        <Text style={styles.buttonText}>Preço de alimentação - P3</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.notfication} onPress={() => navigation.navigate('Notificacoes')}>
        <Icon name="circle" size={50} color="#A4A9AE" />
      </TouchableOpacity>

      <View style={styles.notfications}>
        <Ionicons name="notifications-outline" size={24} color="white" onPress={() => navigation.navigate('Notificacoes')} />
      </View>
      <CupertinoFooter1 style={styles.cupertinoFooter1} onPress={(route) => navigation.navigate(route)} />
    </View>
  );
}
