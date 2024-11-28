import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  View,
  Text,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function FoodBanner({ navigation }) {
  const areas = [
    {
      name: "Rosquinha",
      img: "https://i.pinimg.com/564x/1b/32/84/1b3284b5c2c38627edc196d5d5f2b89c.jpg",
    },
    {
      name: "Pracinha da fumaça",
      img: "https://i.pinimg.com/564x/2c/ca/be/2ccabe460583735925ec3558e029357e.jpg",
    },
    {
      name: "Cantina",
      img: "https://i.pinimg.com/564x/99/1e/f3/991ef3a7922595b1e5aa35fa1a94cca1.jpg ",
    },
    {
      name: "Coma bem",
      img: "https://i.pinimg.com/564x/2b/2a/cf/2b2acf21f3ba5708cb3005f13e30c93b.jpg",
    },
  ];
  return (
    <View style={styles.foodBanner}>
      <View style={styles.header}>
        <Text style={styles.title}>Recomendado</Text>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate("Praças")}
          style={styles.back}
        >
          <Icon name="arrow-forward" size={24} color="#fff" />
        </TouchableOpacity> */}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {areas.map((area, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: area.img }} style={styles.image} resizeMode="cover" />
            <Text style={styles.cardTitle}>{area.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
export const styles = StyleSheet.create({
  header: {
    flexDirection: "row", // Alinha os itens em linha
    justifyContent: "space-between", // Espaça os itens para os lados
    alignItems: "center", // Centraliza verticalmente os itens
    padding: 0,
    marginRight: 20,
    paddingHorizontal: 5,

  },
  foodBanner: {
    marginTop: 10,
    alignSelf: "stretch",
    marginHorizontal: 5,
    paddingBottom: 5,
    height:300,

  },
  title: {
    fontFamily: "Circular",
    color: "#fffdff",
    fontSize: 17,
    marginBottom: 10,
    marginTop: 4,
    letterSpacing: 0.8,
  },
  scrollContainer: {
    flexDirection: "row",
    paddingHorizontal: 5,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  card: {
    width: 150,
    alignItems: "center",
    marginRight: 10,
    marginBottom: 10,
    paddingBottom: 10, // Espaço para o texto
  },
  cardTitle: {
    fontFamily: "Circular",
    fontSize: 12,
    color: "#fff",
    marginTop: 5,
    textAlign: "center",
    paddingHorizontal: 5,
    width: "100%", // ocupa toda a largura do card
  },
});
