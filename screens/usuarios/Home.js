import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import CupertinoFooter1 from "../../components/CupertinoFooter1";


export default function FoodPricingScreen({ navigation }) {
return (
    <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.navigate('UserScreen')}>
        <Image
        source={require('../../assets/icon.png')}
        style={styles.containerLogo}

        />
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Praças')}>
        <Icon name="restaurant-menu" size={24} color="#000000" />
        <Text style={styles.buttonText}>Preço de alimentação - P1</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UploadImage')}>
        <Icon name="fastfood" size={24} color="#000000" />
        <Text style={styles.buttonText}>Preço de alimentação - P2</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Vendas')}>
        <Icon name="local-dining" size={24} color="#000000" />
        <Text style={styles.buttonText}>Preço de alimentação - P3</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.notfication} onPress={() => navigation.navigate('Notificacoes')}>
    <Icon name="circle" size={50} color="#A4A9AE" />
    </TouchableOpacity>
    <View style={styles.notfications}>
        <Ionicons name="notifications-outline" size={24} color="white" onPress={() => navigation.navigate('Notificacoes')} />
    </View>
    <CupertinoFooter1 style={styles.cupertinoFooter1}onPress={(route) => navigation.navigate(route)} ></CupertinoFooter1>
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#211D1D',
    alignItems: 'center',
    justifyContent: 'center',
},
button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 10,
    borderRadius: 20,
    width: '80%',
    top: 110,
    left: 8,
},
cupertinoFooter1: {
    height: 61,
    marginTop: 'auto',
},
buttonText: {
    color: '#000000',
    marginLeft: 16,
    fontSize: 18,
},
containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 54,
    height: 54,
    borderRadius: 300,
    marginTop: 1,
    top: 20,
    left: -140,
},
greeting: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 1,
    top: -230,
    left: -10,
},

notfication: {
    top: -261,
    left: 172,
    width: "25%",
},

notfications: {
    top: -301,
    left: 150,
}
});