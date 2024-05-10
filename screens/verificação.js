import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';

export default function Verificacao({ navigation }) {
const [email, setEmail] = useState('');

return (
    
    <KeyboardAvoidingView style={styles.container} behavior="padding">
    <View>
    <Text style={styles.title}>Digite o código de 4 dígitos</Text>
    <Text style={styles.subtitle} numberOfLines={10}>
    Um código deve ter sido enviado ao email informado
    </Text>
    <View style={styles.inputContainer}>
        <TextInput
        style={styles.input}
        onChangeText={setCode}
        value={code}
        maxLength={4}
        keyboardType="numeric"
        />
    </View>
    </View>
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
    voltar: {
      color: '#FFF', // Texto branco
    fontSize: 16,
    position: 'absolute',
    top: -390,
    left: -170,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 24,
        top: -340,
        left: 7,
    },
    subtitle: {
        color: '#fff',
        fontSize: 15,
        marginBottom: 4,
        top: -340,
        left: 10,
        flexWrap: 'wrap',
    },
});
