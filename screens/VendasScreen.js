import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CupertinoFooter1 from "../components/CupertinoFooter1";
import Lanches from '../components/Lanches';

export default function VendasScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Imagem de destaque */}
      <Image source={require('../assets/image.png')} style={styles.featuredImage} />
      
      {/* Container branco */}
      <View style={styles.whiteContainer}>
        {/* Nome da praça */}
        <Text style={styles.title}>Nome da loja</Text>
        <View style={styles.statusBar} />

        {/* Categorias (opcional) */}
        <View style={styles.categories}>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>lanche</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Salgados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Bebidas</Text>
          </TouchableOpacity>
        </View>
        {/* Lanches */}
        <Lanches onPress={(route) => navigation.navigate(route)} />
        
      </View>

      {/* Navegação inferior */}
      <CupertinoFooter1 style={styles.cupertinoFooter1}
        onPress={(route) => navigation.navigate(route)} 
      ></CupertinoFooter1>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211D1D', // Cor de fundo da tela
  },
  featuredImage: {
    width: '100%',
    height: 200, // Ajuste a altura conforme necessário
    marginTop: 20,
  },
  whiteContainer: {
    backgroundColor: '#FFFFFF', // Cor de fundo branca
    padding: 10, // Adiciona padding para os elementos dentro do container
    borderRadius: 10, // Adiciona borda arredondada ao container
    marginBottom: 10, 
    marginTop: 20,
    maxHeight: '70%', 
    width: 402, 
    height: 519, 
    flexShrink: 0,
  },
  cupertinoFooter1: {
    marginTop: 1,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 30, // Aumenta a margem acima das categorias
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#000000',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  categoryText: {
    fontSize: 16,
    color: '#FFF'
  },
  statusBar: {
    height: 1, // Ajuste a altura conforme necessário
    backgroundColor: 'black',
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    color: '#000', // Altera a cor do texto para preto
    textAlign: 'center',
    marginVertical: 10,
  },
});