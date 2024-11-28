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
import styles from "../../styles/usuarios/RestaurantScreen";

export default function RestaurantsScreen({ navigation, route }) {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const areaId = route.params.id;

  const fetchAreas = async () => {
    try {
      const response = await axios.get(`${API_URL}/area/${areaId}/restaurants`);

      setAreas(response.data);
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
        <Text style={styles.title}>Lanchonetes</Text>
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
          <Text style={styles.text}>{areas.length} lanchonete(s)</Text>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{ justifyContent: "center", alignItems: "center", flex: 1, zIndex: 1 }}
          />
        ) : areas.length > 0 ? (
          areas.restaurants.map((restaurant, index) => (
            
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("RestaurantHomeScreen", { name: restaurant.name, id:restaurant.id, logo:restaurant.logo, areaId })}
              style={styles.card}
            >
              <View style={styles.cardContent}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{ uri: restaurant.logo }} // A URL da imagem da área
                    style={{ width: 50, height: 50, borderRadius: 8 }}
                    onError={() =>
                      console.error(`Erro ao carregar imagem da área ${restaurant.name}`)
                    }
                  />

                  <Text style={styles.cardTitle}>{restaurant.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require("../../assets/pngwing.com.png")}
              style={{ width: 60, height: 60, marginVertical: 20 }}
            ></Image>

            <Text
              style={{
                fontSize: 20,
                fontFamily: "Circular",
                color: "whitesmoke",
                marginHorizontal: 15,
              }}
            >
              Ops..., parece que não há nada por aqui ainda.
            </Text>
          </View>
        )}
      </View>

      <CupertinoFooter1
        style={styles.cupertinoFooter1}
        onPress={(route) => navigation.navigate(route)}
      />
    </View>
  );
}
