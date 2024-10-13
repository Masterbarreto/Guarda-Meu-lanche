// OrderDetailsStyles.js
import { StyleSheet } from 'react-native';

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
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#FFA500',
    width: 198,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonOption: {
    backgroundColor: '#9C9990',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    width: '100%',
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
  footer: {
    marginTop: 230,
    alignItems: 'center',
  },
});

export default styles;
