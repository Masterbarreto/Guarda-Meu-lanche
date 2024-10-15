
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211D1D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 10,
    borderRadius: 20,
    width: '80%',
    top: 110,
    left: 8,
  },
  cupertinoFooter1: {
    height: 61,
    marginTop: 'auto',
  },
  buttonText: {
    color: '#000000',
    marginLeft: 16,
    fontSize: 18,
  },
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 54,
    height: 54,
    borderRadius: 300,
    marginTop: 1,
    top: 20,
    left: -140,
  },
  greeting: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 1,
    top: -230,
    left: -10,
  },
  notfication: {
    top: '-34.8%',
    left: '47.1%',
    width: '25%',
  },
  notfications: {
    top: -301,
    left: 150,
  },
});

export default styles;
