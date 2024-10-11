import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list';
import CupertinoFooter2 from "../../components/CupertinoFooter2";

export default function HomeLoja({ navigation }) {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleIconPress = (iconName) => {
    setSelectedIcon(iconName);
  };

  const handleDateSelect = (val) => {
    setSelectedDate(val);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Minha loja</Text>

      <View style={styles.conteiner1}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={[styles.iconWrapper, selectedIcon === 'loja' && styles.selectedIcon]}
            onPress={() => {
              handleIconPress('loja');
              navigation.navigate('PerfildaLoja'); // Navega para a tela 'Home'
            }}
          >
            <Ionicons name="storefront-outline" size={24} color="#000" />
            <Text style={styles.iconText}>Loja</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconWrapper, selectedIcon === 'pedidos' && styles.selectedIcon]}
            onPress={() => {
              handleIconPress('pedidos');
              navigation.navigate('Home'); // Navega para a tela 'Home'
            }}
          >
            <Ionicons name="clipboard-outline" size={24} color="#000" />
            <Text style={styles.iconText}>Pedidos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconWrapper, selectedIcon === 'produtos' && styles.selectedIcon]}
            onPress={() => {
              handleIconPress('produtos');
              navigation.navigate('adicionarItens'); // Navega para a tela 'Home'
            }}
          >
            <Ionicons name="cube-outline" size={24} color="#000" />
            <Text style={styles.iconText}>Produtos</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <SelectList
          setSelected={(val) => handleDateSelect(val)}
          data={[
            { key: 'hoje', value: 'Hoje' },
            { key: 'ontem', value: 'Ontem' },
            { key: 'semanaPassada', value: 'Semana Passada' },
          ]}
          placeholder="Selecione uma data"
          boxStyles={{ marginBottom: 10 }}
        />
        <Image source={require('../../assets/grafico.png')} style={styles.locationImage} />
      </View>

      <View style={styles.productList}>
        <View style={styles.productItemContainer}>
          <View style={styles.statusBar} />
          <Text style={styles.productItem}>Pão de queijo - R$200</Text>
        </View>
        <View style={styles.productItemContainer}>
          <View style={styles.statusBar2} />
          <Text style={styles.productItem}>Hamburguer - R$200</Text>
        </View>
        <View style={styles.productItemContainer}>
          <View style={styles.statusBar3} />
          <Text style={styles.productItem}>Sucos - R$200</Text>
        </View>
      </View>

      <CupertinoFooter2
        style={styles.cupertinoFooter1}
        onPress={(route) => navigation.navigate(route)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#211D1D",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffff",
    alignSelf: "center",
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  iconWrapper: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: 80,
    height: 80,
    justifyContent: "center",
  },
  selectedIcon: {
    backgroundColor: "#FFC107",
  },
  iconText: {
    fontSize: 12,
    color: "#000",
    marginTop: 5,
  },
  conteiner1: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chartContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  locationImage: {
    width: '100%',
    height: 168,
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 5,
  },
  productList: {
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  productItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productItem: {
    fontSize: 16,
    marginLeft: 10,
  },
  statusBar: {
    height: 40,
    width: 9,
    borderRadius: 10,
    backgroundColor: "#6A7FB8",
  },
  statusBar2: {
    height: 40,
    width: 9,
    borderRadius: 10,
    backgroundColor: "#52A1FF",
  },
  statusBar3: {
    height: 40,
    width: 9,
    borderRadius: 10,
    backgroundColor: "#FF4D4D",
  },
  cupertinoFooter1: {
    alignItems: "center",
    marginTop: "",
  },
});
