import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import axios from "axios";
import { API_URL } from "@env";
import GoBack from "../../components/Back";
import CupertinoFooter1 from "../../components/CupertinoFooter1";
import styles from "../../styles/usuarios/PraçasScreenStyles";
import { color } from "react-native-elements/dist/helpers";

export default function PraçasScreen({ navigation }) {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAreas = async () => {
    try {
      const response = await axios.get(`${API_URL}/area/`);

      setAreas(response.data.areas);
    } catch (error) {
      console.error("Erro ao carregar áreas: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GoBack />
        <Text style={styles.title}>Praças de Alimentação</Text>
      </View>

      <View style={styles.contentContainer}>
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
            marginVertical: 15,
          }}
        >
          <Text style={styles.text}>{areas.length} Praça(s)</Text>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{ justifyContent: "center", alignItems: "center", flex: 1, zIndex:1 }}
          />
        ) : (
          areas.map((area, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("Restaurants", { id: area.id })}
              style={styles.card}
            >
              
              <Image source={{ uri: area.image }} style={styles.image} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{area.name}</Text>
                <Text style={styles.cardDescription}>{area.restaurant_count} lanchonete(s)</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>

      <CupertinoFooter1
        style={styles.cupertinoFooter1}
        onPress={(route) => navigation.navigate(route)}
      />
    </View>
  );
}

const localStyles = StyleSheet.create({
  skeletonCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#222",
    borderRadius: 8,
  },
  skeletonImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  skeletonTextContainer: {
    flex: 1,
  },
  skeletonText: {
    height: 16,
    marginBottom: 8,
    backgroundColor: "#333",
  },
});
