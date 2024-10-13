// screens/upload/HomeLoja.js
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list';
import CupertinoFooter2 from "../../components/CupertinoFooter2";
import styles from "../../styles/Lojistas/HomeLojaScreenStyles"; // Importando o novo estilo

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
              navigation.navigate('Pedidos'); // Navega para a tela 'Home'
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
