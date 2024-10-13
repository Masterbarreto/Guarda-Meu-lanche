// styles/upload/UploadScreen2Styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211D1D',
    justifyContent: 'space-between',
  },
  contentContainer: {
    width: '90%',
    padding: 20,
    marginTop: 22,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 5 },
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    padding: 9,
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 1,
  },
  labelError: {
    color: '#ff375b',
    marginBottom: 8,
  },
  selectBox: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',  // Fundo cinza claro
    borderRadius: 20,
    width: 276,
    height: 40,
    paddingHorizontal: 15,
    marginVertical: 10,
    alignSelf: 'center', // Centraliza o componente horizontalmente na tela    
  },
  quantityButton: {
    fontSize: 24,
    width: 30,             // Define a largura exata dos botões
    height: 30,            // Define a altura exata dos botões
    borderRadius: 15,      // Define o botão como um círculo
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    color: '#333333',       // Cor do texto
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  quantityValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  finalButton: {
    width: 160,
    height: 36,
    backgroundColor: '#FFC107',
    borderRadius: 15,
    padding: -10,
    alignItems: 'center',
    marginTop: 40,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',  // Corrigido para 'bold' em vez de '#0000'
    fontSize: 16,
  },
  stageContainer: {
    marginTop: 40,
  },
  stageTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 140,
    marginBottom: 5,
  },
  stageBarsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 140,
  },
  activeStage: {
    height: 16,
    width: 60,
    borderRadius: 10,
    backgroundColor: "#4F9C1F",
  },
  inactiveStage: {
    height: 16,
    width: 60,
    borderRadius: 10,
    backgroundColor: "#4F9C1F",
  },
  stageText: {
    color: '#333',
    fontWeight: 'bold',
  },
  footer: {
    marginBottom: -0,
    alignItems: 'center',
  },
});

export default styles;
