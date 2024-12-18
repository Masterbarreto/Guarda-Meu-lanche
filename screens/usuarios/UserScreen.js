import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import axios from "axios";

export default function UserScreen({ navigation }) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const rawCredentials = await AsyncStorage.getItem("credentials");
      const credentials = JSON.parse(rawCredentials);
      const token = credentials.token;

      const response = await axios.get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const toggleTheme = () => setIsDarkTheme((prev) => !prev);

  if (loading) {
    return (
      <View
        style={[styles.container, { justifyContent: "center", alignItems: "center" }]}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro ao carregar o perfil do usuário.</Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: isDarkTheme ? "#161616" : "#FFFFFF" }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: user.profile_picture || "https://via.placeholder.com/100" }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
        </View>
      </View>

      {/* User Information */}
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Icon name="map-marker-outline" size={20} color="#fff" />
          <Text style={styles.infoText}>
            {user.location || "Localização não definida"}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="calendar" size={20} color="#fff" />
          <Text style={styles.infoText}>Membro desde: {user.join_date}</Text>
        </View>
      </View>

      {/* Settings */}
      <View style={styles.settingsContainer}>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Tema Escuro</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#fff5" }}
            thumbColor={isDarkTheme ? "green" : "#f4f3f4"}
            onValueChange={toggleTheme}
            value={isDarkTheme}
          />
        </View>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.settingText}>Editar Perfil</Text>
          <Icon name="account-edit-outline" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("MyOrders")}
        >
          <Text style={styles.settingText}>Meus pedidos</Text>
          <Icon name="food-outline" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("EsqueciaSenha")}
        >
          <Text style={styles.settingText}>Esqueceu a senha?</Text>
          <Icon name="lock-outline" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Text style={styles.settingText}>Configurações de Notificações</Text>
          <Icon name="bell-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <View style={{ justifyContent: "flex-end", flex:1 }}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            await AsyncStorage.clear();
            navigation.replace("Login");
          }}
        >
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#161616",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileName: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Circular",
  },
  profileEmail: {
    fontSize: 16,
    color: "#aaa",
    fontFamily: "Circular",
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#fff",
    fontFamily: "Circular",
  },
  settingsContainer: {
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  settingText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Circular",
  },
  logoutButton: {
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Circular",
  },
  errorText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});
