import React, { useCallback, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import GoBack from "../../components/Back";
import { color } from "react-native-elements/dist/helpers";
import { API_URL } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  const stars = Array(fullStars)
    .fill("full")
    .map((_, i) => (
      <Icon key={`full-${i}`} name="star" size={18} color="yellow" style={styles.star} />
    ));

  if (halfStar) {
    stars.push(
      <Icon key="half" name="star-half" size={18} color="yellow" style={styles.star} />
    );
  }

  return stars;
};

export default function ProductDetails({ navigation, route }) {
  const areaId = route.params.id;
  const item = route.params.item;
  const restaurantId = route.params.restaurantId;

  const [quantity, setQuantity] = useState(1); // Estado para quantidade
  const [isReserved, setIsReserved] = useState(false);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const reserveItem = async () => {
    try {
      let rawCredentials = await AsyncStorage.getItem("credentials");
      let credentials = JSON.parse(rawCredentials);
      const token = credentials.token;

      const body = {
        restaurant_id: Number(restaurantId),
        items: [
          {
            menu_item_id: item.id,
            quantity: Number(quantity),
          },
        ],
      };

      const url = `${API_URL}/orders/`;
      const response = await axios
        .post(url, body, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((r) => r.data)
        .catch((e) => e.response.data);

      if (response.error) {
        alert(`O item "${item.name}" não foi reservado!`);
      }

      if (response.id) {
        navigation.navigate("Code", { order: response });
      }

      setIsReserved(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GoBack />
        <Text style={styles.title}>{item.name}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Image
          source={{ uri: item.url }}
          style={styles.image}
          onError={() => console.error(`Erro ao carregar imagem do produto ${item.name}`)}
        />
        <Text style={[styles.genericText, styles.price]}>R$ {item.price}</Text>

        <View style={styles.starContainer}>
          {renderStars(4.7)}
          <Text style={styles.ratingText}>4.7</Text>
        </View>
        <Text style={styles.desc}>{item.desc}</Text>
        <View>
          <Text style={[styles.genericText, styles.h1, { marginTop: 5 }]}>
            Ingredientes:
          </Text>
          <Text style={[styles.genericText, styles.h3]}>Cebola</Text>
          <Text style={[styles.genericText, styles.h3]}>Farinha</Text>
          <Text style={[styles.genericText, styles.h3]}>Manteiga</Text>
          <Text style={[styles.genericText, styles.h3]}>Cuscuz</Text>
          <Text style={[styles.genericText, styles.h3]}>Batata</Text>
        </View>

        <View style={{ flex: 1, justifyContent: "flex-end" , }}>
          <View style={styles.quantitySelector}>
            <Text
              style={[
                {
                  fontFamily: "Circular",
                  color: "whitesmoke",
                  marginHorizontal: 4,
                  fontSize: 21,
                  marginLeft: 3,
                  marginRight: 15,
                },
              ]}
            >
              Quantidade:
            </Text>

            <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={[styles.genericText, styles.h1, { marginBottom: 10 }]}>
              Total: {"  "}
              <Text style={{ color: "yellow", fontSize: 26 }}>
                {quantity * item.price}
              </Text>
            </Text>
          </View>
          <View style={{ borderTopWidth: 1, borderColor: "#333", paddingTop:10 }}>
            <TouchableOpacity style={styles.addToCartButton}>
              <Text style={[styles.genericText, styles.buttonText]}>
                Adicionar ao carrinho
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addToCartButton} onPress={reserveItem}>
              <Text style={[styles.genericText, styles.buttonText]}>Reservar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    width: "100%",
    marginRight:20
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Circular",
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    resizeMode: "cover",
  },
  genericText: {
    fontFamily: "Circular",
    color: "whitesmoke",
    fontSize: 13,
  },
  h1: {
    fontSize: 22,
    marginTop: 5,
  },
  h3: {
    fontSize: 14,
    marginTop: 5,
  },
  price: {
    fontSize: 30,
    marginVertical: 4,
  },
  desc: {
    fontSize: 15,
    color: "#fff",
    marginTop: 7,
  },
  ratingText: {
    marginLeft: 5,
    color: "whitesmoke",
    fontSize: 19,
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },
  addToCartButton: {
    backgroundColor: "#434343",
    padding: 15,
    borderRadius: 9,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
  },

  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 15,
    // backgroundColor: "red",
  },
  quantityButton: {
    backgroundColor: "#434343",
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    color: "whitesmoke",
    fontFamily: "Circular",
  },

  quantityText: {
    fontSize: 18,
    color: "whitesmoke",
    marginHorizontal: 15,
    fontFamily: "Circular",
  },
});
