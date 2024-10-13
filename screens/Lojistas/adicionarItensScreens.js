// screens/upload/AdicionarItens.js
import React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import CupertinoFooter2 from "../../components/CupertinoFooter2";
import styles from "../../styles/Lojistas/AdicionarItensScreenStyles"; // Importando o novo estilo

export default function AdicionarItens({ navigation }) {
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.caixaBranca}>
                <Image 
                    source={require('../../assets/imagem_2024-10-10_093912229-removebg-preview.png')}
                    style={styles.icon}
                    resizeMode="contain" // Ajuste para evitar cortes na imagem
                />
                <Text style={styles.message}>Nenhum produto registrado</Text>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('UploadImage')} // Substitua 'AddItemScreen' pelo nome correto da tela de destino
                >
                    <Text style={styles.buttonText}>ADICIONAR ITEM</Text>
                </TouchableOpacity>
            </View>
            {/* Navegação do Footer */}
            <CupertinoFooter2
                style={styles.cupertinoFooter1}
                onPress={(route) => navigation.navigate(route)}
            />
        </KeyboardAvoidingView>
    );
}
