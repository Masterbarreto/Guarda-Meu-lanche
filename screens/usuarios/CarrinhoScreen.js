import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import axios from "axios";
import GoBack from "../../components/Back";

export default function CarrinhoScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState({});
  const [quantities, setQuantities] = useState({});

  const handleClearCart = () => setCartItems([]);

  const updateItemOnDatabase = async (cart_id, quantity) => {
    try {
      let rawCredentials = await AsyncStorage.getItem("credentials");
      let credentials = JSON.parse(rawCredentials);
      const token = credentials.token;
      const url = `${API_URL}/users/cart`;

      await axios.patch(
        url,
        { cart_id, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Error updating item:", error.response?.data || error.message);
    }
  };

  const goToRestaurant = async (area_id, restaurant_id) => {
    try {
      const response = await axios.get(
        `${API_URL}/area/${area_id}/restaurants/${restaurant_id}`
      );

      const data = response.data;
 
      navigation.navigate("RestaurantHomeScreen", {
        name: data.name,
        id: data.id,
        logo: data.logo,
        areaId: area_id,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const getMyCart = async () => {
    try {
      let rawCredentials = await AsyncStorage.getItem("credentials");
      let credentials = JSON.parse(rawCredentials);
      const token = credentials.token;
      const url = `${API_URL}/users/cart`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLoading(false);
      setCartItems(response.data.cart);

      const initialQuantities = {};
      const initialPrice = {};
      response.data.cart.forEach((item) => {
        initialQuantities[item.id] = item.quantity;
        initialPrice[item.id] = item.price * item.quantity; // Preço total baseado na quantidade
      });
      setQuantities(initialQuantities);
      setTotalPrice(initialPrice);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyCart();
  }, []);

  const increaseQuantity = (id, price) => {
    setQuantities((prev) => {
      const updatedQuantities = { ...prev, [id]: prev[id] + 1 };
      console.log(updatedQuantities, prev);

      updateItemOnDatabase(id, updatedQuantities[id]);

      setTotalPrice((prevPrice) => ({
        ...prevPrice,
        [id]: updatedQuantities[id] * price, // Atualiza o preço total
      }));
      return updatedQuantities;
    });
  };

  const decreaseQuantity = (id, price) => {
    setQuantities((prev) => {
      const updatedQuantities = { ...prev, [id]: prev[id] > 1 ? prev[id] - 1 : 1 };

      // Atualiza no servidor
      updateItemOnDatabase(id, updatedQuantities[id]);

      setTotalPrice((prevPrice) => ({
        ...prevPrice,
        [id]: updatedQuantities[id] * price, // Atualiza o preço total
      }));
      return updatedQuantities;
    });
  };

  const reserveItem = async (item) => {
    try {
      let rawCredentials = await AsyncStorage.getItem("credentials");
      let credentials = JSON.parse(rawCredentials);
      const token = credentials.token;

      const items = [];
      const body = {};
      body.restaurant_id = Number(item.restaurant_id);
      body.items = items;
      item.items.map((i) => {
        items.push({
          quantity: Number(i.quantity),
          menu_item_id: Number(i.menu_item_id),
        });
      });

      const url = `${API_URL}/orders/`;
      const response = await axios
        .post(url, body, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((r) => {
          // console.log(JSON.stringify(r.data, null, 2));
          return r.data;
        })
        .catch((e) => {
          return e.response.data;
          console.log(JSON.stringify(e.response.data, null, 2));
        });

      if (response?.error) {
        alert(`O item "${item.name}" não foi reservado!`);
      }

      if (response.id) {
        navigation.navigate("Code", { order: response });
      }

      // setIsReserved(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GoBack />
        <Text style={styles.title}>Carrinho</Text>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={handleClearCart}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => `${item.title}-section-${index}`}
          renderItem={({ item }) => (
            <View>
              <View style={styles.sectionHeader}>
                <TouchableOpacity
                  key={item.restaurant_id}
                  onPress={() => goToRestaurant(item.restaurant_area, item.restaurant_id)} // Use uma função anônima
                >
                  <Text style={styles.sectionTitle}>{item.restaurant_name}</Text>
                </TouchableOpacity>
              </View>

              {item.items.map((product, index) => (
                <View style={styles.itemContainer}>
                  <View style={{ flexDirection: "row" }} key={product.id}>
                    <Image source={{ uri: product.image_url }} style={styles.itemImage} />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>{product.name}</Text>
                      <Text style={styles.itemDesc} numberOfLines={3}>
                        {product.desc}
                      </Text>
                      <Text style={styles.itemPrice}>R$ {product.price}</Text>
                      <View>
                        <View style={styles.quantitySelector}>
                          <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => decreaseQuantity(product.id, product.price)}
                          >
                            <Text style={styles.quantityButtonText}>-</Text>
                          </TouchableOpacity>
                          <Text style={styles.quantityText}>{product.quantity}</Text>
                          <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => increaseQuantity(product.id, product.price)}
                          >
                            <Text style={styles.quantityButtonText}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.itemQuantity}>
                    Preço dos items: R$ {product.total_price}
                  </Text>
                </View>
              ))}
              {cartItems.length > 0 && (
                <View style={styles.buttonContainer}>
                  <Text style={styles.totalText}> </Text>
                  <TouchableOpacity
                    style={styles.reserveButton}
                    onPress={() => reserveItem(item)}
                  >
                    <Text style={styles.reserveButtonText}>Reservar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    marginRight: 20,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 0,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    fontFamily: "Circular",
    marginTop: 20,
    marginBottom: 20,
  },
  clearText: {
    color: "#FF5C5C",
    fontFamily: "Circular",
    marginRight: 0,
    textAlign: "right",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  locationImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  locationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  locationArea: {
    fontSize: 14,
    color: "#555",
  },
  sectionHeader: {
    paddingBottom: 10,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "Circular",
  },
  itemContainer: {
    marginBottom: 10,
    backgroundColor: "#232323",
    borderRadius: 8,
    padding: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
    fontFamily: "Circular",
  },
  itemDesc: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 5,
    fontFamily: "Circular",
  },
  itemPrice: {
    fontSize: 14,
    color: "yellow",
    marginBottom: 5,
    fontFamily: "Circular",
  },
  itemQuantity: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "Circular",
    textAlign: "left",
  },
  footer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalText: {
    fontSize: 15,
    fontFamily: "Circular",
    color: "green",
    // marginLeft:10,
  },
  reserveButton: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 3,
    alignItems: "center",
  },
  reserveButtonText: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Circular",
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
