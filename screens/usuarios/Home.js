// screens/usuarios/FoodPricingScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import CupertinoFooter1 from "../../components/CupertinoFooter1";
import styles from "../../styles/usuarios/HomeStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import SearchBar from "../../components/SeachBar";
import FoodAreaCard from "../../components/FoodAreaCard";
import FoodItemCard from "../../components/FoodItemCard";
import FoodBanner from "../../components/FoodBanner";
import RestaurantsCard from "../../components/RestaurantsCard";
import CategoryFood from "../../components/CategoryFood";
import { API_URL } from "@env";

export default function FoodPricingScreen({ navigation }) {
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      let rawCredentials = await AsyncStorage.getItem("credentials");
      let credentials = JSON.parse(rawCredentials);
      const token = credentials.token;
      

      const response = await axios.get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.profile}
          onPress={() => navigation.navigate("UserScreen")}
        >
          <Image
            src="https://i.pinimg.com/736x/d6/18/a1/d618a1bdd23c0bdc288a139c09110a52.jpg"
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Seja bem-vindo, {user.name}</Text>
      </View>
      <SearchBar />
      <ScrollView style={styles.mainContainer}>
        <FoodBanner />
        <FoodAreaCard navigation={navigation} />
        //Talvez uma possivel feature, em breve
        {/* <CategoryFood></CategoryFood> */}
        {/* <RestaurantsCard></RestaurantsCard> */}
        {/* <FoodItemCard /> */}
      </ScrollView>

      <CupertinoFooter1
        style={styles.cupertinoFooter1}
        onPress={(route) => navigation.navigate(route)}
      />
    </View>
  );
}
