// screens/order/OrderDetailsScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import CupertinoFooter2 from "../../components/CupertinoFooter2";
import styles from "../../styles/Lojistas/PedidosScreenStyles"; // Importando o novo estilo

export default function PedidosScreen({ navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState('PENDENTE'); // Estado do status

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const confirmStatus = () => {
    setIsEditing(false);
    // Aqui você pode adicionar a lógica para salvar o novo status, se necessário
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderId}>Pedido: <Text style={styles.orderIdHighlight}>#13</Text></Text>
          <Text style={styles.orderTime}>18:30</Text>
        </View>
        <Text style={styles.customerName}>Nome: Ismael Silva</Text>
        <View style={styles.orderDetails}>
          <Text style={styles.item}>Hamburguer 2×</Text>
          <Text style={styles.item}>Coca Cola 2L 2×</Text>
        </View>
        <Text style={styles.description}>Descrição: Sem tomate e pepino</Text>
        <View style={styles.statusBar} />
        
        {/* Exibe o status atual */}
        <Text style={styles.status}>Status: {status}</Text>
        <Text style={styles.total}>TOTAL: R$ 29,90</Text>

        {/* Modal para editar status */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isEditing}
          onRequestClose={() => setIsEditing(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Centraliza o texto "Mudar Status" */}
              <Text style={styles.modalTitle}>Mudar Status</Text>

              {/* Botões de status modificados */}
              <TouchableOpacity style={styles.modalButtonOption} onPress={() => setStatus('PENDENTE')}>
                <Text style={styles.modalButtonText}>PENDENTE</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButtonOption} onPress={() => setStatus('A CAMINHO')}>
                <Text style={styles.modalButtonText}>A CAMINHO</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButtonOption} onPress={() => setStatus('PREPARANDO')}>
                <Text style={styles.modalButtonText}>PREPARANDO</Text>
              </TouchableOpacity>

              {/* Botão confirmar */}
              <TouchableOpacity style={styles.modalButton} onPress={confirmStatus}>
                <Text style={styles.buttonText}>CONFIRMAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Botões de editar e confirmar */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleEditing}>
            <Text style={styles.buttonText}>Editar status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={() => {
            confirmStatus();
            navigation.navigate('Pedidos'); // Confirma o status antes de navegar
          }}>
            <Text style={styles.buttonText}>CONFIRMAR</Text>
          </TouchableOpacity>
        </View>

        {/*Footer for Navigation */}
        <CupertinoFooter2
        style={styles.cupertinoFooter1}
        onPress={(route) => navigation.navigate(route)}
        />
      </View>
    </View>
  );
}
