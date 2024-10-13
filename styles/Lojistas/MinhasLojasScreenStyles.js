
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#211D1D",
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
  },
  minhaLoja: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffff",
  },
  caixaBranca: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    width: '90%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  statusBar: {
    height: 1,
    backgroundColor: "black",
    marginTop: 10,
  },
  titleLoja: {
    color: "#000",
    fontSize: 19,
    fontWeight: "400",
  },
  LojaItem: {
    marginTop: 30,
  },
  cupertinoFooter1: {
    marginTop: 300,
    alignItems: 'center',
  },
});

export default styles;
