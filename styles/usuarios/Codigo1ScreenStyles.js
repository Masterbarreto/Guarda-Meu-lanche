
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#211D1D',
  },
  cards: {
    marginTop: 10,
  },
  cupertinoFooter1: {
    marginTop: 350,
    alignItems: 'center',
  },
  limparText: {
    backgroundColor: '#FFB603',
    marginTop: -320, // Ajusta a margem para posicionar o botão abaixo do componente
    paddingVertical: 8, // Reduz a altura do botão
    paddingHorizontal: 20, // Define o tamanho da largura do botão
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  limparTextContent: {
    color: '#FFFFFF', // Cor do texto do botão
    fontSize: 16, // Tamanho da fonte do texto do botão
  },
});

export default styles;
