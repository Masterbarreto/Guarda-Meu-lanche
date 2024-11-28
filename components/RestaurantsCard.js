import { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function RestaurantsCard({ navigation }) {
  const [restaurants, setRestaurants] = useState({});

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/area/1/restaurants/${restaurantId}/items`
      );

      setFood(response.data);
    } catch (error) {
      console.error("Erro ao carregar os lanches: ", error);
    } finally {
      setLoading(false);
    }
  };
  const areas = [
    {
      name: "Rosquinha",
      img: "https://i.pinimg.com/736x/c1/0f/be/c10fbe5d868abef9f1a1f6be1f72b732.jpg",
      stars: 4.5,
    },
    {
      name: "Pracinha da fumaça",
      img: "https://i.pinimg.com/736x/e4/e3/c4/e4e3c4cb8cd6ad602397e9f467b9d582.jpg",
      stars: 4.5,
    },
    {
      name: "Cantina",
      img: "https://i.pinimg.com/736x/34/b9/02/34b902c7608e0a07eda5a2aa985b55af.jpg",
      stars: 3,
    },
    {
      name: "Coma bem",
      img: "https://i.pinimg.com/736x/8a/68/85/8a68850257c082e5ae82e345006b4f8e.jpg",
      stars: 2.5,
    },
  ];

  // Função para renderizar as estrelas
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Estrelas completas
    const halfStar = rating % 1 >= 0.5; // Estrela pela metade, se houver

    // Adiciona estrelas completas
    const stars = Array(fullStars)
      .fill("full")
      .map((_, i) => (
        <Icon
          key={`full-${i}`}
          name="star"
          size={12}
          color="yellow"
          style={styles.star}
        />
      ));

    // Adiciona meia estrela, se houver
    if (halfStar) {
      stars.push(
        <Icon key="half" name="star-half" size={12} color="yellow" style={styles.star} />
      );
    }

    return stars;
  };

  return (
    <View style={styles.foodAreaCard}>
      <View style={styles.header}>
        <Text style={styles.foodAreaTitle}>Principais lanchonetes</Text>
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
            <View style={styles.starContainer}>
              {renderStars(area.stars)}
              <Text style={styles.ratingText}>{area.stars}</Text>
            </View>
            <Text style={styles.cardTitle}>{area.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
    paddingHorizontal: 5,
  },
  foodAreaCard: {
    marginTop: 20,
    alignSelf: "stretch",
    marginHorizontal: 5,
    paddingBottom: 5,
  },
  foodAreaTitle: {
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
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  card: {
    width: 155,
    alignItems: "center",
    marginRight: 10,
    marginBottom: 10,
    paddingBottom: 5,
  },
  cardTitle: {
    fontFamily: "Circular",
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
    textAlign: "center",
    paddingHorizontal: 5,
    width: "100%",
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: 10,
    marginTop: 3,
    // backgroundColor:"red",
    width: "100%",
  },
  star: {
    marginHorizontal: 1,
  },
  ratingText: {
    marginLeft: 5,
    color: "whitesmoke",
    fontSize: 12,
    fontFamily: "Circular",
  },
});
