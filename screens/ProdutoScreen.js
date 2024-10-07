import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import CupertinoFooter1 from "../components/CupertinoFooter1";

    export default function ProdutoScreen ({ navigation }) {   
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                {/* Imagem de destaque */}
                <Image source={require('../assets/Photo Menu.png')} style={styles.featuredImage} />
                {/* Imagem de conteiner principal */}
                <View style={styles.lancheContainer}>
                <Text style={styles.lancheName}>X-Bacon Burger</Text>
                <Text style={styles.lancheDescription}>Pão De Hambúrguer, Hambúrguer De Carne Bovina, Salada , Queijo Prato E Bacon Frito</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={() => { navigation.navigate('Carrinho') }}>
                        Reservar
                    </Text>
                </TouchableOpacity>
                </View>
                {/* navegationbar */}
                <CupertinoFooter1 style={styles.cupertinoFooter1}
                    onPress={(route) => navigation.navigate(route)} 
                ></CupertinoFooter1>

            </KeyboardAvoidingView>
);


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#211D1D',
        padding: 0,
    },
    featuredImage: {
        width: 362,
        height: 249,
        marginTop: 30,
    },
    lancheContainer: {
        marginTop: 20,
        width: 364,
        height: 407, 
        padding: 30,
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignItems: 'center',
        borderRadius: 36,
        borderColor: '#E1E1E1',
        borderWidth: 1,
        backgroundColor: 'white',
    },
    lancheName: {
        fontFamily: 'DM Sans',
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 20,
    },
    lancheDescription: {
        fontFamily: 'DM Sans',
        fontSize: 12,
        textAlign: 'center',
        color: '#707070',
        textAlign: 'left',
        marginBottom: 230,
    },
    button: {
        backgroundColor: '#FFB603',
        height: 41,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 266,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
    },
    cupertinoFooter1: {
        marginTop: 60,
    }
});