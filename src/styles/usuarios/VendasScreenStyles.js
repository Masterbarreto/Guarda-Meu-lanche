
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#211D1D", // Cor de fundo da tela
  },
  featuredImage: {
    width: "102%",
    height: 190, // Ajuste a altura conforme necessário
    marginTop: 0,
    bottom: 0,
    maxHeight: "25%",
  },
  whiteContainer: {
    backgroundColor: "#FFFFFF", // Cor de fundo branca
    padding: 0, // Adiciona padding para os elementos dentro do container
    borderRadius: 0, // Adiciona borda arredondada ao container
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    marginBottom: 10,
    width: 402,
    height: 519,
    maxHeight: "80%",
    flexShrink: 0,
    flex: 1
  },
  cupertinoFooter1: {
    marginTop: 1,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 30, // Aumenta a margem acima das categorias
    marginRight: '5%',
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#000000",
    borderRadius: 10,
    marginHorizontal: 8,
  },
  categoryText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "700"
  },
  statusBar: {
    height: 1, // Ajuste a altura conforme necessário
    backgroundColor: "black",
    marginTop: 10,
  },
  title: {
    fontSize: 19,
    color: "#000", // Altera a cor do texto para preto
    textAlign: "center",
    marginVertical: 9,
    marginRight: "10%",
    fontWeight: '800',
    letterSpacing: 2,
  }
});

export default styles;
