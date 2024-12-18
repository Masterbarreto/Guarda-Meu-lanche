import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import GoBack from "../../components/Back";

export default function StatusScreen({ navigation, route }) {
  const { orderId, order } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GoBack />
        <Text style={styles.title}>Status do Pedido</Text>
      </View>

      {/* Order Info */}
      <View style={styles.contentContainer}>
        <Text style={styles.orderId}>
          <Text style={styles.label}>ID do Pedido:</Text> {orderId}
        </Text>
        <Text style={styles.orderStatus}>
          <Text style={styles.label}>Status:</Text>{" "}
          {order.status === "created"
            ? "Criado"
            : order.status === "preparing"
            ? "Preparando"
            : "Finalizado"}
        </Text>
        <Text style={styles.orderDate}>
          <Text style={styles.label}>Data:</Text> {order.order_date.toLocaleString()}
        </Text>
        <Text style={styles.totalPrice}>
          <Text style={styles.label}>Total:</Text> R$ {order.total_price}
        </Text>

        <Text style={[styles.label, styles.sectionTitle]}>Itens do Pedido:</Text>
        <FlatList
          data={order.items}
          keyExtractor={(item, index) => `${order.id}-item-${index}`}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source={{ uri: item.url }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDesc} numberOfLines={3}>
                  {item.desc}
                </Text>
                <Text style={styles.itemPrice}>R$ {item.price}</Text>
                <Text style={styles.itemQuantity}>Quantidade: {item.quantity}</Text>
              </View>
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
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    width: "100%",
    marginRight:20
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    fontFamily: "Circular",
    marginTop: 20,
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  orderId: {
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
  orderDate: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
    fontFamily: "Circular",
  },
  totalPrice: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 15,
    fontFamily: "Circular",
  },
  label: {
    fontWeight: "bold",
    color: "#fff",
  },
  sectionTitle: {
    marginTop: 10,
    fontSize: 18,
    color: "#fff",
    marginBottom: 5,
  },
  itemContainer: {
    flexDirection: "row",
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
  },
});

