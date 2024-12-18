import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { API_URL } from "@env";

export default function FoodAreaCard({ navigation }) {
  const [areas, setAreas] = useState([]); // Estado para armazenar as áreas
  const [loading, setLoading] = useState(true); // Estado para mostrar carregamento

  const fetchAreas = async () => {
    try {
      const url = `${API_URL}/area/`;

      let response = await axios
        .get(url)
        .then((data) => {
          return data.data;
        })
        .catch((e) => {
          return e.response.data;
        });
      setAreas(response.areas);
    } catch (error) {
      
      console.error("Erro ao carregar áreas: ", error);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };
  useEffect(() => {
    fetchAreas(); // Chama a função quando o componente é montado
  }, []);
  return (
    <View style={styles.foodAreaCard}>
      <View style={styles.header}>
        <Text style={styles.foodAreaTitle}>Praças de alimentação</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Praças")}
          style={styles.back}
        >
          <Icon name="arrow-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer} horizontal={true}>
        {areas.map((area, index) => (
          <TouchableOpacity
          key={area.id}
            onPress={() => navigation.navigate("Restaurants", { id: area.id })}
            style={styles.back}
          >
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{area.name}</Text>
            </View>
          </TouchableOpacity>
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
    marginTop: 10,
  },

  card: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#1e1e1e",
    borderRadius: 5,
  },
  cardTitle: {
    fontFamily: "Circular",
    fontSize: 14,
    color: "#fff",
  },
});
