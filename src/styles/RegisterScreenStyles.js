import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Ajuste para começar do topo
    backgroundColor: '#211D1D',
  },
  contentContainer: {
    marginTop: 50, // Ajuste para acomodar o GoBack
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  stepText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 24,
  },
  progressBar: {
    height: 4,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 24,
  },
  progress: {
    height: 4,
    borderRadius: 4,
    backgroundColor: '#0782F9',
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    width: '100%', // Alterado para 100% para ocupar todo o espaço disponível
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1, // Adicionando borda para visualização
    borderColor: '#ccc', // Borda padrão
  },
  error: {
    fontSize: 14,
    color: '#ff375b',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2C5697',
    padding: 15,
    borderRadius: 180,
    alignItems: 'center',
    width: '100%', // Ajuste para 100% para ocupar todo o espaço disponível
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 17,
    marginVertical: 30,
  },
  containerGoBack: {
    position: 'absolute',
    top: 10, // Posiciona o GoBack em uma posição fixa no topo
    left: 1, // Ajuste conforme necessário
  },
});

export default styles;
