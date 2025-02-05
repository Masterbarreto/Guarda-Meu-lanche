import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import GoBack from "../components/Back";
import { API_URL } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyOrdersScreen({ navigation }) {
  const [myOrders, setMyOrders] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchMyOrders = async () => {
    let rawCredentials = await AsyncStorage.getItem("credentials");
    let credentials = JSON.parse(rawCredentials);
    const token = credentials.token;
    const url = `${API_URL}/users/orders`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setLoading(false);
    setMyOrders(response.data);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const formatStatus = (status) => {
    switch (status) {
      case "created":
        return "Criado";
      case "preparing":
        return "Preparando";
      case "finished":
        return "Finalizado";
      default:
        return "Desconhecido";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GoBack />
        <Text style={styles.title}>Meus Pedidos</Text>
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#fff"
          style={{ justifyContent: "center", alignItems: "center", flex: 1, zIndex: 1 }}
        />
      ) : myOrders.length > 0 ? (
        <View style={styles.contentContainer}>
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%",
              marginVertical: 15,
            }}
          >
            <Text style={styles.text}>{myOrders.length} pedido(s)</Text>
          </View>
          <FlatList
            data={myOrders.orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.orderContainer}
                onPress={() =>
                  navigation.navigate("Status", { orderId: item.id, order: item })
                }
              >
                <View style={styles.orderDetails}>
                  <Text style={styles.orderId}>
                    <Text style={styles.label}>ID:</Text> {item.order_id}
                  </Text>
                  <Text style={styles.orderDate}>
                    <Text style={styles.label}>Data:</Text> {item.order_date}
                  </Text>
                  <Text style={styles.orderStatus}>
                    <Text style={styles.label}>Status:</Text> {formatStatus(item.status)}
                  </Text>
                  <Text style={styles.totalPrice}>
                    <Text style={styles.label}>Total:</Text> R$ {item.total_price}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContent}
          />
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Image
            source={require("../assets/pngwing.com.png")}
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
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    width: "100%",
    marginRight: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    fontFamily: "Circular",
    marginVertical: 20,
  },
  text: {
    fontFamily: "Circular",
    color: "whitesmoke",
    textAlign: "left",
    marginLeft: 3,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  listContent: {
    paddingHorizontal: 5,
    width: "100%",
  },
  orderContainer: {
    backgroundColor: "#232323",
    borderRadius: 8,
    padding: 15,
    marginBottom: 8,
  },
  orderDetails: {
    flexDirection: "column",
  },
  orderId: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
    fontFamily: "Circular",
  },
  orderDate: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
    fontFamily: "Circular",
  },
  orderStatus: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
    fontFamily: "Circular",
  },
  totalPrice: {
    fontSize: 16,
    color: "yellow",
    fontFamily: "Circular",
  },
  label: {
    fontWeight: "bold",
    color: "#fff",
  },
});
