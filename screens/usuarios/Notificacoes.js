// screens/usuarios/NotificationScreen.js
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CupertinoFooter1 from "../../components/CupertinoFooter1";
import styles from "../../styles/usuarios/NotificacoesStyles";

const NOTIFICATIONS = [
  { id: '1', type: 'Cadastro realizado', message: 'Seu cadastro foi concluído com sucesso!' },
  { id: '2', type: 'Pedido reservado', message: 'Seu pedido foi reservado. Retire em breve!' },
  { id: '3', type: 'Pedido retirado', message: 'Você retirou seu pedido. Bom apetite!' },
  { id: '4', type: 'Pedido reservado', message: 'Seu pedido foi reservado. Retire em breve!' },
  { id: '5', type: 'Pedido retirado', message: 'Você retirou seu pedido. Bom apetite!' },
];

export default function NotificationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons 
          name="arrow-back" 
          size={24} 
          color="white" 
          onPress={() => navigation.goBack()} 
          style={styles.back} 
        />
        <Text style={styles.title}>Notificações</Text>
      </View>
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Icon name="notifications" size={24} color="white" style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.notificationType}>{item.type}</Text>
            </View>
          </View>
        )}
      />
      <CupertinoFooter1 style={styles.cupertinoFooter1} onPress={(route) => navigation.navigate(route)} />
    </View>
  );
}
