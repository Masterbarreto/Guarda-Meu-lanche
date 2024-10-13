// screens/confirmacao/ConfirmacaoScreen.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import CupertinoFooter1 from "../../components/CupertinoFooter1";
import styles from "../../styles/usuarios/ConfirmacaoScreenStyles";

export default function ConfirmacaoScreen({ navigation }) {
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            {/* Título */}
            <View style={styles.headerContainer}>
                <Text style={styles.successText}>Reserva realizada com sucesso</Text>
            </View>
            {/* Checkmark image */}
            <View style={styles.checkmarkContainer}>
                <Image source={require('../../assets/chekin.png')} style={styles.locationImage} />
            </View>
            <Text style={styles.confirmationText}>Sua reserva foi confirmada.</Text>
            <Text style={styles.confirmationText}>Dentro de alguns segundos seu código será gerado.</Text>
            {/* Botões */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.generateButton} onPress={() => navigation.navigate('codigo')}>
                    <Text style={styles.buttonText}>Gerar código</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Voltar ao início</Text>
                </TouchableOpacity>
            </View>
            {/* Navegação do Footer */}
            <CupertinoFooter1
                style={styles.cupertinoFooter1}
                onPress={(route) => navigation.navigate(route)}
            />
        </KeyboardAvoidingView>
    );
}
