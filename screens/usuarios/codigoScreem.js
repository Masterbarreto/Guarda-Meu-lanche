// screens/codigo/CodigoScreen.js
import React from 'react';
import { KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';
import CupertinoFooter1 from "../../components/CupertinoFooter1";
import UserProfileCard from "../../components/codigo";
import styles from "../../styles/usuarios/Codigo1ScreenStyles";

export default function CodigoScreen({ navigation }) {
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <UserProfileCard style={styles.cards} />
            <CupertinoFooter1 
                style={styles.cupertinoFooter1}
                onPress={(route) => navigation.navigate(route)} 
            />
            <TouchableOpacity style={styles.limparText} onPress={() => navigation.navigate('Status')}>
                <Text style={styles.limparTextContent}>ACOMPANHAR PEDIDO</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}
