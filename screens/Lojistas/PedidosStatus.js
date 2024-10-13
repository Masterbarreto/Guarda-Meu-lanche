import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button } from 'react-native';
import CupertinoFooter2 from "../../components/CupertinoFooter2";

export default function OrderDetailsScreen({ navigation }) {
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
        <CupertinoFooter2 style={styles.footer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211D1D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: '#FFF',
    marginTop: -240,
    padding: 20,
    borderRadius: 10,
    width: 390,
    height: 492,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderIdHighlight: {
    color: '#FFA500',
  },
  orderTime: {
    fontSize: 16,
  },
  customerName: {
    fontSize: 16,
    marginBottom: 20,
  },
  orderDetails: {
    marginBottom: 20,
  },
  item: {
    fontSize: 19,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBar: {
    height: 1,
    backgroundColor: 'black',
    marginTop: 10,
  },
  status: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'column', // Alinhamento em coluna (um em cima do outro)
    justifyContent: 'space-between',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#FFA500',
    width: 198, // Define a largura do botão em pixels
    height: 50, // Define a altura do botão em pixels
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center', // Centraliza o texto verticalmente
    marginBottom: 20,
    marginHorizontal: 80,
  },
  confirmButton: {
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 30, // Aumenta o padding para dar mais espaço
    borderRadius: 10,
    alignItems: 'center',
    width: '80%', // Ajusta a largura do modal
  },
  modalTitle: {
    fontSize: 20, // Aumenta o tamanho da fonte
    fontWeight: 'bold',
    marginBottom: 20, // Espaço extra abaixo do título
    textAlign: 'center', // Centraliza o texto
  },
  modalButtonOption: {
    backgroundColor: '#9C9990',
    paddingVertical: 15, // Aumenta a altura dos botões
    paddingHorizontal: 40, // Aumenta a largura dos botões
    borderRadius: 10,
    marginBottom: 15, // Espaço entre os botões
    alignItems: 'center',
    width: '100%', // Faz com que os botões ocupem a largura do modal
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  footer:{
    marginTop: 230, 
    alignItems: 'center',
  }
});
