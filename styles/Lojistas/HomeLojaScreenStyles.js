// styles/upload/HomeLojaStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#211D1D",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffff",
    alignSelf: "center",
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  iconWrapper: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: 80,
    height: 80,
    justifyContent: "center",
  },
  selectedIcon: {
    backgroundColor: "#FFC107",
  },
  iconText: {
    fontSize: 12,
    color: "#000",
    marginTop: 5,
  },
  conteiner1: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chartContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  locationImage: {
    width: '100%',
    height: 168,
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 5,
  },
  productList: {
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  productItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productItem: {
    fontSize: 16,
    marginLeft: 10,
  },
  statusBar: {
    height: 40,
    width: 9,
    borderRadius: 10,
    backgroundColor: "#6A7FB8",
  },
  statusBar2: {
    height: 40,
    width: 9,
    borderRadius: 10,
    backgroundColor: "#52A1FF",
  },
  statusBar3: {
    height: 40,
    width: 9,
    borderRadius: 10,
    backgroundColor: "#FF4D4D",
  },
  cupertinoFooter1: {
    alignItems: "center",
    marginTop: "",
  },
});

export default styles;
