import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import CupertinoFooter1 from "../../components/CupertinoFooter1";

export default function PraçasScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Logo */}
            <TouchableOpacity onPress={() => navigation.navigate('UserScreen')}>
                <Image
                    source={require('../../assets/icon.png')}
                    style={styles.containerLogo}
                />
            </TouchableOpacity>

            {/* Botões de navegação */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Vendas')}>
                <Icon name="restaurant-menu" size={24} color="#000000" />
                <Text style={styles.buttonText}>Loja A</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Vendas')}>
                <Icon name="fastfood" size={24} color="#000000" />
                <Text style={styles.buttonText}>Loja B</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Vendas')}>
                <Icon name="local-dining" size={24} color="#000000" />
                <Text style={styles.buttonText}>Loja C</Text>
            </TouchableOpacity>

            {/* Notificação */}
            <TouchableOpacity style={styles.notification} onPress={() => navigation.navigate('Notificacoes')}>
                <Icon name="circle" size={50} color="#A4A9AE" />
            </TouchableOpacity>
            
            <View style={styles.notifications}>
                <Ionicons name="notifications-outline" size={24} color="white" onPress={() => navigation.navigate('Notificacoes')} />
            </View>

            {/* Footer */}
            <CupertinoFooter1 style={styles.cupertinoFooter1}
            onPress={(route) => navigation.navigate(route)} 
            ></CupertinoFooter1>
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
    cupertinoFooter1: {
        height: 61,
        marginTop: 'auto',
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
    notification: {
        top: -261,
        left: 172,
        width: '25%',
    },
    notifications: {
        top: -301,
        left: 150,
    },
});
