// EsqueciaSenhaStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#211D1D',
  },
  contentContainer: {
    width: '100%',
    marginTop: -120,
    padding: 20,
  },
  voltar: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 50,
  },
  titulo: {
    color: '#2C5697',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  texto: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 50,
  },
  email: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 250,
  },
  button: {
    backgroundColor: '#0782F9',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default styles;
