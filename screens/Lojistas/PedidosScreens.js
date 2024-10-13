import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CupertinoFooter2 from "../../components/CupertinoFooter2";

export default function PedidosScreen({ navigation }) { 
  const pedidos = [
    { id: '#13', nome: 'Ismael Silva', status: 'PENDENTE', cor: '#FF3B30' },
    { id: '#14', nome: 'Ismael Silva', status: 'A CAMINHO', cor: '#007AFF' },
    { id: '#15', nome: 'Ismael Silva', status: 'PREPARANDO', cor: '#5856D6' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PEDIDOS</Text>
      <View style={styles.header}>
        <View style={styles.totalPedidos}>
          <Text style={styles.headerText}>TOTAL DE PEDIDOS</Text>
          <Text style={styles.count}>#16</Text>
        </View>
        <View style={styles.pedidosEntregues}>
          <Text style={styles.headerText}>PEDIDOS ENTREGUES</Text>
          <Text style={styles.count}>#20</Text>
        </View>
      </View>
      <ScrollView style={styles.pedidosContainer}>
        {pedidos.map((pedido) => (
          <View key={pedido.id} style={styles.pedido}>
            <Text style={styles.pedidoId}>{pedido.id}</Text>
            <Text style={styles.pedidoNome}>{pedido.nome}</Text>
            <TouchableOpacity style={styles.notfication}>
              <Ionicons 
                name="information-circle-outline" 
                size={24} 
                color="#8E8E93" 
                onPress={() => navigation.navigate('Pedido')} // Utilizar navigation para navegar
              />
            </TouchableOpacity>
            <View style={[styles.status, { backgroundColor: pedido.cor }]}>
              <Text style={styles.statusText}>{pedido.status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <CupertinoFooter2
        onPress={(route) => navigation.navigate(route)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#211D1D',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  totalPedidos: {
    flex: 1,
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  pedidosEntregues: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  headerText: {
    color: '#333',
    fontSize: 12,
    fontWeight: 'bold',
  },
  count: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
  },
  pedidosContainer: {
    flex: 1,
  },
  pedido: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  pedidoId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#333',
  },
  pedidoNome: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  notfication: {
    marginRight: 10,
  },
  status: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  statusText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
})
