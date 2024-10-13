
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#211D1D",
  },
  featuredImage: {
    width: "100%",
    height: 190,
    marginTop: 0,
    bottom: 0,
    maxHeight: "25%",
  },
  whiteContainer: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 14,
    borderBottomRightRadius: 23,
    borderBottomLeftRadius: 23,
    marginBottom: 10,
    width: 402,
    height: 519,
    maxHeight: "80%",
    flexShrink: 0,
    flex: 1,
  },
  cupertinoFooter1: {
    marginTop: 1,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 30,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#000000",
    borderRadius: 10,
    marginHorizontal: 8,
  },
  categoryText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "700",
  },
  statusBar: {
    height: 1,
    backgroundColor: "black",
    marginTop: 10,
  },
  title: {
    fontSize: 19,
    color: "#000",
    textAlign: "center",
    marginVertical: 9,
    fontWeight: "800",
    letterSpacing: 2,
  },
});

export default styles;
