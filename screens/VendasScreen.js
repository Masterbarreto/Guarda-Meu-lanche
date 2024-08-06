import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
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
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Senac Nações Unidas</Text>

      {/* Imagem de fundo */}
      <Image source={require('../assets/image.png')} style={styles.backgroundImage} 
            onError={(e) => {
              console.log('Erro ao carregar imagem:', e);
            }}
      />

      {/* Ícones de categoria */}
      <View style={styles.categoryIcons}>
        <TouchableOpacity style={styles.categoryIcon}>
          {/* Ícone de hambúrguer */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryIcon}>
          {/* Ícone de pizza */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryIcon}>
          {/* Ícone de bebidas/sobremesas */}
        </TouchableOpacity>
      </View>

      {/* Seção "Mais Pedidos" */}
      {popularItems.length > 0 && (
        <View style={styles.popularItems}>
          <Text style={styles.sectionTitle}>Mais Pedidos</Text>
          {popularItems.map(item => (
            <View key={item.id} style={styles.item}>
              <Text>{item.name}</Text>
              <Text>R$ {item.price}</Text>
              {/* Exibir imagem */}
              {item.imageUrl && (
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ width: 100, height: 100 }}
                />
              )}
            </View>
          ))}
        </View>
      )}

      {/* Ícones de navegação */}
      <View style={styles.navigationIcons}>
        <TouchableOpacity style={styles.navigationIcon} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={24} color="#FFC535" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationIcon}>
          <Ionicons name="cart" size={24} color="#FFC535" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationIcon}>
          <Ionicons name="person" size={24} color="#FFC535" />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#211D1D',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#FFF',
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    color: '#FFF',
  },
  categoryIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    color: '#FFF',
  },
  categoryIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popularItems: {
    marginTop: 20,
    paddingHorizontal: 20,
    color: '#FFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFF',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    color: '#FFF',
  },
  navigationIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    color: '#FFF',
  },
  navigationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});