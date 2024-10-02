import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import CupertinoFooter1 from "../components/CupertinoFooter1";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211D1D', // Fundo escuro
    justifyContent: 'center',
  },
  cupertinoFooter1: {
    height: 61,
    marginTop: '20',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 17,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    backgroundColor: '#333', // Fundo escuro do item
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  textContainer: {
    marginLeft: 10,
  },
  notificationType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', // Texto em branco
  },
  notificationMessage: {
    fontSize: 14,
    color: 'white', // Texto em branco
  },
  back: { 
    position: 'absolute',
    left: 15,
    top: 20,
    backgroundColor: 'transparent',
  },
  icon: {
    marginRight: 10,
    color: 'white', // Ícone em branco
  },
});
