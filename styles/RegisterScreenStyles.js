
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
  },
  contentContainer: {
    width: '90%', 
    padding: 11,
    marginTop: -50, 
  },
  voltar: {
    color: '#FFF',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    padding: 9,
    borderRadius: 20, 
    paddingHorizontal: 10,
    marginTop: 1,
    fontSize: 16,
  },
  label: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 11,
    marginLeft: 8,
  },
  labelError: {
    color: "#ff375b",
    marginBottom: 5,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#0782F9', 
    width: '100%',
    padding: 16,
    borderRadius: 30, 
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  selectBox: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 20, 
    marginTop: 10,
  },
  selectDropdown: {
    borderRadius: 10,
    marginTop: 5,
  },
});
