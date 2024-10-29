// LoginScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#211D1D',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  inputContainer: {
    marginTop: 0,
  },
  input: {
    width: 342,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  buttonContainer: {
    marginTop: -30,
  },
  button: {
    backgroundColor: '#2C5697',
    padding: 15,
    borderRadius: 180,
    alignItems: 'center',
    width: 340,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutline: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 11,
    marginHorizontal: 10,
  },
  forgotPasswordText: {
    color: '#0782F9',
    marginTop: 12,
    fontSize: 14,
    textAlign: 'right',
    marginRight: 2,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  labelError: {
    color: "#ff375b",
    marginBottom: 8,
    marginLeft: 10,
  },
  mainBottom: {
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rect1: {
    width: 80,
    height: 1,
    backgroundColor: "#E6E6E6",
  },
  rect2: {
    width: 80,
    height: 1,
    backgroundColor: "#E6E6E6",
  },
});

export default styles;