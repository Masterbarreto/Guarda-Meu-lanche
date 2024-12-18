import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import GoBack from "../../components/Back";

export default function OrderCreatedScreen({ navigation, route }) {
  const { order } = route.params;
console.log(order);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <GoBack />
        <Text style={styles.title}>Pedido Criado</Text>
      </View>

      {/* Order Info */}
      <View style={styles.contentContainer}>
        <Text style={styles.orderId}>
          <Text style={styles.label}>ID do Pedido:</Text> {order.id}
        </Text>
        <Text style={styles.orderDate}>
          <Text style={styles.label}>Data:</Text> {order.order_date.toLocaleString()}
        </Text>
        <Text style={styles.orderStatus}>
          <Text style={styles.label}>Status:</Text>{" "}
          {order.status === "created" ? "Criado" : order.status}
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

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.button}
          
          onPress={() => navigation.navigate("Status", { orderId: order.id, order: order })
        }
        >
          <Text style={styles.buttonText}>Acompanhar Pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
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
  actionsContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#333",
    width: "100%",
  },
  button: {
    backgroundColor: "#434343",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Circular",
  },
});
