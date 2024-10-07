import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import CupertinoFooter1 from "../components/CupertinoFooter1";

export default function ConfirmacaoScreen({ navigation }) {
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            {/* Título */}
            <View style={styles.headerContainer}>
                <Text style={styles.successText}>Reserva realizada com sucesso</Text>
            </View>
            {/* Checkmark image */}
            <View style={styles.checkmarkContainer}>
                <Image source={require('../assets/chekin.png')} style={styles.locationImage} />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#211D1D',  // Black background
        padding: 20,
    },
    headerContainer: {
        marginBottom: 20,
        marginTop: 190,
    },
    successText: {
        marginTop: -130,
        fontSize: 18,
        color: '#FFFFFF',  // White text
        fontWeight: 'bold',
        textAlign: 'center',
    },
    checkmarkContainer: {
        marginTop: -80,
        marginBottom: 30,
        alignItems: 'center',
    },
    checkmark: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#00C851',  // Green checkmark border
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkIcon: {
        fontSize: 60,
        color: '#00C851',  // Green checkmark color
    },
    confirmationText: {
        fontSize: 14,
        color: '#AAAAAA',  // Light gray text
        textAlign: 'center',
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 190,
        width: '100%',
        alignItems: 'center',
    },
    generateButton: {
        backgroundColor: '#FFBB33',  // Yellow button
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 40,
        marginBottom: 20,
        width: 366,
    },
    backButton: {
        backgroundColor: '#AAAAAA',  // Gray button
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 40,
        width: 366,
    },
    buttonText: {
        fontSize: 16,
        color: '#000000',  // Black text on buttons
        textAlign: 'center',
    },
    cupertinoFooter1: {
        marginTop: 30,
    },
});
