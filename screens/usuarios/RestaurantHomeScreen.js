import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import axios from "axios";
import { API_URL } from "@env";
import GoBack from "../../components/Back";
import CupertinoFooter1 from "../../components/CupertinoFooter1";

function createRows(data, columns) {
  const dataCopy = [...data]; // Faz uma cópia para evitar modificar o original
  const totalItems = Math.ceil(dataCopy.length / columns) * columns;

  while (dataCopy.length < totalItems) {
    dataCopy.push({ id: `empty-${dataCopy.length}`, empty: true });
  }

  return dataCopy;
}
export default function RestaurantHomeScreen({ navigation, route }) {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const restaurantName = route.params.name;
  const logo = route.params.logo;
  const areaId = route.params.areaId;
  const restaurantId = route.params.id;
  const columns = 3;

  const fetchAreas = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/area/${areaId}/restaurants/${restaurantId}/items`
      );

      setFood(response.data);
    } catch (error) {
      console.error("Erro ao carregar os lanches: ", error);
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: logo }} // A URL da imagem da área
            style={{ width: 40, height: 40, borderRadius: 100, marginRight: 20 }}
            onError={() => console.error(`Erro ao carregar imagem da área ${area.name}`)}
          />
          <Text style={styles.title}>{restaurantName}</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{ justifyContent: "center", alignItems: "center", flex: 1, zIndex: 1 }}
          />
        ) : food.items.length > 0 ? (
          <View>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.genericText}>Salgados</Text>
              <Text style={styles.genericText}>Bebidas</Text>
              <Text style={styles.genericText}>Almoço</Text>
              <Text style={styles.genericText}>Lanches</Text>
            </View>
            <FlatList
              data={createRows(food.items, columns)}
              keyExtractor={(item) => item.id.toString()}
              numColumns={columns}
              renderItem={({ item }) => {
                if (item.empty) {
                  return <View style={[styles.card, styles.itemEmpty]} />;
                }
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ProductDetails", { item, restaurantId: restaurantId })}
                    style={styles.card}
                  >
                    <Image
                      source={{ uri: item.url }}
                      style={{ width: 90, height: 90, borderRadius: 16 }}
                      onError={() =>
                        console.error(`Erro ao carregar imagem: ${item.name}`)
                      }
                    />
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.price}>R$ {item.price}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    // backgroundColor: "red",
    width: "100%",
    marginTop: 10,
    // alignItems: "center",
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    marginRight: 20,
    paddingHorizontal: 5,
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    fontFamily: "Circular",
    marginTop: 20,
    marginBottom: 20,
  },
  cupertinoFooter1: {
    height: 61,
    marginTop: "auto",
  },

  card: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#1e1e1e",
    borderRadius: 6,
    marginHorizontal: 3,
    alignItems: "center",
    flexGrow: 1,
    flexBasis: 0,
  },

  cardDescription: {
    fontFamily: "Circular",
    fontSize: 12,
    color: "whitesmoke",
  },
  text: {
    fontFamily: "Circular",
    color: "whitesmoke",
    textAlign: "left",
    marginLeft: 3,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  menuText: {
    fontFamily: "Circular",
    color: "whitesmoke",
    marginTop: 5,
    color: "#cba2fa",
    fontWeight: "100",
    marginHorizontal: 4,
  },
  genericText: {
    fontFamily: "Circular",
    color: "whitesmoke",
    marginHorizontal: 4,
    backgroundColor: "#1e1e1e",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 13,
  },
  price: {
    fontFamily: "Circular",
    color: "yellow",
    marginHorizontal: 4,
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 3,
    fontSize: 14,
  },
  productName: {
    fontFamily: "Circular",
    fontSize: 15,
    color: "#fff",
    marginHorizontal: 10,
    marginTop: 5,
  },
  itemEmpty: {
    backgroundColor: "transparent",
  },
});
