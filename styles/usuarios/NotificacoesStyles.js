// styles/usuarios/NotificationScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211D1D',
    justifyContent: 'center',
  },
  cupertinoFooter1: {
    height: 61,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 17,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    backgroundColor: '#333',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  textContainer: {
    marginLeft: 10,
  },
  notificationType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  notificationMessage: {
    fontSize: 14,
    color: 'white',
  },
  back: {
    position: 'absolute',
    left: 15,
    top: 20,
    backgroundColor: 'transparent',
  },
  icon: {
    marginRight: 10,
    color: 'white',
  },
});

export default styles;
