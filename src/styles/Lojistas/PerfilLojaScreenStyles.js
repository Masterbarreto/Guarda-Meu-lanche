
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#211D1D",
    paddingTop: 1,
    alignItems: 'center',
  },
  minhaLoja: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffff",
    marginBottom: 60,
    marginTop: 12,
  },
  caixaBranca: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 20,
    width: '89%',
    height: "80%", // Adjusted height to make room for the footer
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
    paddingTop: 50, // Adjust this value if the image needs more/less overlap
  },
  profileContainer: {
    position: 'absolute',
    top: -40, // Adjusts overlap amount
    zIndex: 1,
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#fff",
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%',
    borderRadius: 60,
  },
  titleLoja: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    color: "#000",
  },
  cupertinoFooter1: {
    // Removed marginTop to make the footer visible
  },
});

export default styles;
