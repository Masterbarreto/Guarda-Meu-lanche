
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211D1D',
    justifyContent: 'space-between',
  },
  contentContainer: {
    width: '90%',
    padding: 20,
    marginTop: 22,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 5 },
    alignSelf: 'center',
    marginTop: '15%',
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    padding: 9,
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 1,
  },
  labelError: {
    color: '#ff375b',
    marginBottom: 8,
  },
  selectBox: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
  },
  image: {
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 20,
  },
  imageButton: {
    backgroundColor: '#FFC107',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  uploadButton: {
    width: 160,
    height: 36,
    backgroundColor: '#FFC107',
    borderRadius: 15,
    padding: -10,
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  stageContainer: {
    marginTop: 40,
  },
  stageTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 140,
    marginBottom: 5,
    marginLeft: '-3%',
  },
  stageBarsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 140,
  },
  activeStage: {
    height: 16,
    width: 60,
    borderRadius: 10,
    backgroundColor: "#4F9C1F",
  },
  inactiveStage: {
    height: 16,
    width: 60,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
  },
  stageText: {
    color: '#333',
    fontWeight: 'bold',
    marginLeft: '12.5%',
  },
  cupertinoFooter1: {
    marginBottom: '-10%',
    alignItems: 'center',
  },
});

export default styles;
