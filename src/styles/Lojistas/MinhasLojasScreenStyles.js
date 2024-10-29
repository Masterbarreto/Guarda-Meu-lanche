
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
    marginTop: '-1%',
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
    marginBottom: -19,
  },
  statusBar1: {
    height: 1,
    backgroundColor: "black",
    marginTop: '-20%',
  },
  titleLoja: {
    color: "#000",
    fontSize: 19,
    fontWeight: "400",
  },
  LojaItem: {
    marginTop: '5%',
  },
  cupertinoFooter1: {
    marginTop: '95%',
    alignItems: 'center',
  },
});

export default styles;
