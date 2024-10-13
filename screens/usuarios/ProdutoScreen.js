// screens/produtos/ProdutoScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import CupertinoFooter1 from "../../components/CupertinoFooter1";
import styles from "../../styles/usuarios/ProdutoScreenStyles";

export default function ProdutoScreen({ navigation }) {   
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            {/* Imagem de destaque */}
            <Image source={require('../../assets/Photo Menu.png')} style={styles.featuredImage} />
            {/* Imagem de conteiner principal */}
            <View style={styles.lancheContainer}>
                <Text style={styles.lancheName}>X-Bacon Burger</Text>
                <Text style={styles.lancheDescription}>
                    Pão De Hambúrguer, Hambúrguer De Carne Bovina, Salada , Queijo Prato E Bacon Frito
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Carrinho')}>
                    <Text style={styles.buttonText}>Reservar</Text>
                </TouchableOpacity>
            </View>
            {/* Navigation Bar */}
            <CupertinoFooter1 style={styles.cupertinoFooter1} onPress={(route) => navigation.navigate(route)} />
        </KeyboardAvoidingView>
    );
}
