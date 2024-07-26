import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ou outra biblioteca de ícones

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
        <Text style={styles.title}>Notificações</Text>
    </View>
    <FlatList
    data={NOTIFICATIONS}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
        <View style={styles.notificationItem}>
            <Text style={styles.notificationType}>{item.type}</Text>
            <Text style={styles.notificationMessage}>{item.message}</Text>
        </View>
        )}
    />
    <View style={styles.back}>
    <Ionicons name="arrow-back" size={24} color="white" onPress={() => navigation.navigate('Home')}/>
    </View>
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#211D1D', // Fundo escuro
    justifyContent: 'center',
},
header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 17,
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    left: 109,
    top: 20,
},
notificationItem: {
    padding: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
},
notificationType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
},
notificationMessage: {
    fontSize: 14,
    color: '#ccc',
},
back: { 
    position: 'absolute',
    top: 37,
    left: 15,
    backgroundColor: 'transparent',
},
noti : {
    top: 22,
    left: 3,
}

});