import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CupertinoFooter1 from "../components/CupertinoFooter1";
import firebase from 'firebase/app';
import 'firebase/firestore';
import { getFirestore, doc, getDoc, collection, query, where } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { getDocs } from 'firebase/firestore';
import { myFS } from '../firebase';

export default function VendasScreen({ navigation }) {
  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        const q = query(collection(myFS, 'items'));
        const snapshot = await getDocs(q);
        console.log('Number of documents:', snapshot.size);
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPopularItems(items);
      } catch (error) {
        console.error('Erro ao buscar itens populares:', error);
      }
    };

    fetchPopularItems();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Barra de busca (opcional) */}
      {/* <View style={styles.searchBar}>
        <Image source={require('./location.png')} style={styles.locationIcon} />
        <Text style={styles.searchText}>Senac Nações Unidas</Text>
      </View> */}

      {/* Imagem de destaque */}
      <Image source={require('../assets/image.png')} style={styles.featuredImage} />

      {/* Categorias (opcional) */}
      {/* <View style={styles.categories}>
        {/* ... seus botões de categoria aqui ... *}
      </View> */}

      {/* Seção "Mais Pedidos" */}
      {popularItems.length > 0 && (
        <View style={styles.popularItems}>
          <Text style={styles.sectionTitle}>Mais Pedidos</Text>
          <ScrollView horizontal={true} style={styles.itemList}>
            {popularItems.map(item => (
              <View key={item.id} style={styles.itemContainer}>
                <View style={styles.itemBox}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.itemImage}
                  />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>R$ {item.price}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Navegação inferior */}
      <CupertinoFooter1 style={styles.cupertinoFooter1}
        onPress={(route) => navigation.navigate(route)} 
      ></CupertinoFooter1>

    </ScrollView>
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
  },
  popularItems: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  itemList: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  itemContainer: {
    marginRight: 20,
  },
  itemBox: {
    width: 150,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  itemImage: {
    width: 120,
    height: 120,
  },
  itemInfo: {
    marginTop: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
  },
  navigationIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  navigationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  cupertinoFooter1: {
    height: 61,
    marginTop: 'auto',
},
})