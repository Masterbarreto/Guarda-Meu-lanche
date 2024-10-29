
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#211D1D',
    padding: 0,
  },
  featuredImage: {
    width: 362,
    height: 249,
    marginTop: 30,
  },
  lancheContainer: {
    marginTop: 20,
    width: 364,
    height: 407,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 36,
    borderColor: '#E1E1E1',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  lancheName: {
    fontFamily: 'DM Sans',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
  },
  lancheDescription: {
    fontFamily: 'DM Sans',
    fontSize: 12,
    color: '#707070',
    textAlign: 'left',
    marginBottom: 230,
  },
  button: {
    backgroundColor: '#FFB603',
    height: 41,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 266,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  cupertinoFooter1: {
    marginTop: '5%',
  },
});

export default styles;
