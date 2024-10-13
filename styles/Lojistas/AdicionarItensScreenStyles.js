// styles/upload/AdicionarItensStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#211D1D', // Cor de fundo cinza claro semelhante ao da imagem
  },
  caixaBranca: {
    backgroundColor: "#fff",
    borderRadius: 30,
    marginTop: 32,
    padding: 50,
    height: 656,
    width: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  icon: {
    width: 274,
    height: 204,
    marginBottom: 60,
  },
  message: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFC107', // Cor amarela
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  cupertinoFooter1: {
    marginTop: 60,
    alignItems: 'center',
  },
});

export default styles;
