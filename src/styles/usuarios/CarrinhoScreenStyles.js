// styles/carrinho/CarrinhoScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#211D1D',
    padding: 20,
  },
  lancheContainer: {
    width: 370,
    marginTop: -100,
    height: 675,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  voltar: {
    marginRight: 10,
  },
  carrinhoText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  limparText: {
    fontSize: 16,
    color: '#FF0000',
  },
  Retirada: {
    fontSize: 16,
    color: '#000000',
  },
  statusBar: {
    height: 1,
    backgroundColor: '#E1E1E1',
    marginBottom: 20,
  },
  statusBar1: {
    height: 2,
    width: 59,
    backgroundColor: '#FF0000',
    marginBottom: 60,
  },
  statusBar3: {
    height: 1,
    backgroundColor: '#E1E1E1',
    marginBottom: 20,
  },
  statusBar4: {
    height: 1,
    backgroundColor: '#E1E1E1',
    marginBottom: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationImage: {
    width: 66,
    height: 71,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  locationText: {
    fontSize: 11,
    color: '#707070',
    marginBottom: 5,
  },
  locationName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  Praça: {
    fontSize: 12,
    color: '#707070',
  },
  maisitens: {
    fontSize: 14,
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  Quantidade: {
    fontSize: 16,
    color: '#000',
    marginBottom: 30,
  },
  itemContainer: {
    marginBottom: 20,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    marginTop: 30,
    fontSize: 16,
    color: '#000000',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: '#FFB603',
    padding: 10,
    width: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    color: '#fff',
  },
  quantityInput: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 10,
    width: 40,
    borderColor: '#E1E1E1',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FFB603',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  cupertinoFooter1: {
    marginTop: 70,
  },
});

export default styles;
