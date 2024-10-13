import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CupertinoFooter1 from "../../components/CupertinoFooter1";
import Userpicte from '../../components/Userpicte';

export default function UserScreen({ navigation }) {
    const [isDarkTheme, setIsDarkTheme] = React.useState(true);

    const toggleSwitch = () => setIsDarkTheme(previousState => !previousState);
    
    return (
        <View style={[styles.container, { backgroundColor: isDarkTheme ? '#211D1D' : '#FFFFFF' }]}>
            <View style={styles.logoContainer}>
                <Userpicte />
            </View>

            <View style={styles.profileContainer}>
                <Text style={styles.profileName}>Lucas Gomes</Text>
                <Text style={styles.profileInfo}>Senac Nações Unidas</Text>
                <Text style={styles.profileRole}>Aluno</Text>
            </View>

            <View style={styles.settingsContainer}>
                <View style={styles.buttonStyle}>
                    <Text style={styles.settingText}>Tema Escuro</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isDarkTheme ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isDarkTheme}
                    />
                </View>

                <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('Notificacoes')} >
                    <Text style={styles.settingText}>Notificações</Text>
                    <Ionicons name="arrow-down" size={24} color="gray" style={styles.iconStyle} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('EsqueciaSenha')}>
                    <Text style={styles.settingText}>Esqueceu sua senha?</Text>
                    <Ionicons name="lock-closed" size={24} color="gray" style={styles.iconStyle} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>

            <CupertinoFooter1 style={styles.cupertinoFooter1} onPress={(route) => navigation.navigate(route)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cupertinoFooter1: {
        height: 61,
        marginTop: 'auto',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 10,
    },
    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    profileInfo: {
        fontSize: 14,
        color: '#CCCCCC',
    },
    profileRole: {
        fontSize: 14,
        color: '#CCCCCC',
        marginBottom: 10,
    },
    settingsContainer: {
        width: '100%',
        padding: 30,
    },
    buttonStyle: {
        flexDirection: 'row', // Alinhar ícone e texto em linha
        justifyContent: 'space-between', // Espaçar entre o texto e ícone
        alignItems: 'center', // Centralizar conteúdo verticalmente
        backgroundColor: 'white',
        width: '100%',
        paddingVertical: 15, // Aumentado para deixar o botão mais alto
        paddingHorizontal: 20, // Adiciona espaçamento interno horizontal
        marginTop: 20,
        borderRadius: 21,
    },
    settingText: {
        color: '#2E2E2E',
        fontWeight: '700',
        fontSize: 16,
    },
    iconStyle: {
        marginLeft: 10, // Espaçamento entre o texto e o ícone
    },
    logoutButton: {
        marginTop: 30, // Aumenta o espaçamento superior
        paddingVertical: 15, // Aumenta o tamanho do botão
        paddingHorizontal: 100, // Alarga o botão
        backgroundColor: '#FF4D4D',
        borderRadius: 12,
    },
    logoutText: {
        fontSize: 18, // Texto maior
        color: 'white',
        fontWeight: 'bold',
    },
});
