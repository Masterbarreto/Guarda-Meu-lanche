// screens/carrinho/CarrinhoScreem.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CupertinoFooter1 from "../../components/CupertinoFooter1";
import styles from "../../styles/usuarios/CarrinhoScreenStyles";

export default function CarrinhoScreen({ navigation }) {
    const [quantidade, setQuantidade] = useState(1);

    const aumentarQuantidade = () => setQuantidade(quantidade + 1);
    const diminuirQuantidade = () => {
        if (quantidade > 1) setQuantidade(quantidade - 1);
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.lancheContainer}>
                {/* Header com botão de voltar, título e "Limpar" */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltar}>
                        <Icon name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.carrinhoText}>Carrinho</Text>
                    <TouchableOpacity>
                        <Text style={styles.limparText}>Limpar</Text>
                    </TouchableOpacity>
                </View>

                {/* Status Bar */}
                <View style={styles.statusBar} />
                <Text style={styles.Retirada}> Retirada </Text>
                <View style={styles.statusBar1} />

                {/* Imagem de Localização */}
                <View style={styles.locationContainer}>
                    <Image source={require('../../assets/Rectangle 206.png')} style={styles.locationImage} />
                    <View style={styles.textContainer}>
                        <Text style={styles.locationText}>Retirar em</Text>
                        <Text style={styles.locationName}>Senac Santo Amaro</Text>
                        <Text style={styles.Praça}>P1</Text>
                    </View>
                </View>

                <View style={styles.statusBar3} />
                <View style={styles.itemContainer}>
                    <Text style={styles.itemName}>X-Bacon Búrguer</Text>
                    <Text style={styles.itemPrice}>R$ 23,00</Text>
                </View>

                <View style={styles.statusBar4} />
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltar}>
                    <Text style={styles.maisitens}>Adicionar mais itens</Text>
                </TouchableOpacity>
                <View style={styles.statusBar4} />

                {/* Controle de Quantidade */}
                <Text style={styles.Quantidade}>Quantidade</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={diminuirQuantidade} style={styles.quantityButton}>
                        <Text style={styles.quantityText}>-</Text>
                    </TouchableOpacity>
                    <TextInput style={styles.quantityInput} value={String(quantidade)} editable={false} />
                    <TouchableOpacity onPress={aumentarQuantidade} style={styles.quantityButton}>
                        <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* Botão de Reservar */}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Confirmaçao')}>
                    <Text style={styles.buttonText}>Reservar</Text>
                </TouchableOpacity>

                {/* Navegação do Footer */}
                <CupertinoFooter1 style={styles.cupertinoFooter1} onPress={(route) => navigation.navigate(route)} />
            </View>
        </KeyboardAvoidingView>
    );
}
