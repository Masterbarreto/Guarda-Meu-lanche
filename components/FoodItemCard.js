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


export default function FoodItemCard() {
  const areas = [
    {
      name: "X - tudo",
      img: "https://i.pinimg.com/564x/d5/d4/bb/d5d4bb7e8a83e3cc20f3383e4ca3e5c7.jpg",
    },
    {
      name: "Milk shake",
      img: "https://i.pinimg.com/564x/d3/99/3c/d3993c3594dcad3c8cb2b1486939a4da.jpg",
    },
    {
      name: "Batatinha",
      img: "https://i.pinimg.com/564x/ae/a2/df/aea2dfe7be862fbad8f08a8b1dee6f50.jpg",
    },
    {
      name: "Strogonoff",
      img: "https://i.pinimg.com/564x/a8/d2/1b/a8d21bd507ac286c02a50d23c84027d3.jpg",
    },
  ];
  return (
    <View style={styles.FoodItemCard}>
      <View style={styles.header}>
        <Text style={styles.foodAreaTitle}>Lanches</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Praças")}
          style={styles.back}
        >
          <Icon name="arrow-forward" size={24} color="#fff" />
        </TouchableOpacity>
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
const styles = StyleSheet.create({
  header: {
    flexDirection: "row", // Alinha os itens em linha
    justifyContent: "space-between", // Espaça os itens para os lados
    alignItems: "center", // Centraliza verticalmente os itens
    padding: 0,
    paddingHorizontal: 5,

  },
  FoodItemCard: {
    marginTop: 0,
    alignSelf: "stretch",
    paddingBottom: 10,
    marginHorizontal: 5,
  },
  foodAreaTitle: {
    fontFamily: "Circular",
    color: "#fffdff",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 4,
    marginLeft: 0,
    letterSpacing: 0.8,
  },
  scrollContainer: {
    flexDirection: "row",
    paddingHorizontal: 5,
    marginTop: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  card: {
    width: 155,
    alignItems: "center",
    marginRight: 10,
    marginBottom: 10,
    paddingBottom: 5, // Espaço para o texto
  },
  cardTitle: {
    fontFamily: "Circular",
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
    textAlign: "center",
    paddingHorizontal: 5,
    width: "100%", // ocupa toda a largura do card
  },
});
