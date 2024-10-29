// styles/confirmacao/ConfirmacaoScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#211D1D', // Black background
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
    marginTop: 190,
  },
  successText: {
    marginTop: -130,
    fontSize: 18,
    color: '#FFFFFF', // White text
    fontWeight: 'bold',
    textAlign: 'center',
  },
  checkmarkContainer: {
    marginTop: -80,
    marginBottom: 30,
    alignItems: 'center',
  },
  checkmark: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#00C851', // Green checkmark border
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkIcon: {
    fontSize: 60,
    color: '#00C851', // Green checkmark color
  },
  confirmationText: {
    fontSize: 14,
    color: '#AAAAAA', // Light gray text
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 190,
    width: '100%',
    alignItems: 'center',
  },
  generateButton: {
    backgroundColor: '#FFBB33', // Yellow button
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 40,
    marginBottom: 20,
    width: 366,
  },
  backButton: {
    backgroundColor: '#AAAAAA', // Gray button
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 40,
    width: 366,
  },
  buttonText: {
    fontSize: 16,
    color: '#000000', // Black text on buttons
    textAlign: 'center',
  },
  cupertinoFooter1: {
    marginTop: 30,
  },
});

export default styles;
