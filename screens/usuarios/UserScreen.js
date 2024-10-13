// screens/usuarios/UserScreem.js
import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CupertinoFooter1 from "../../components/CupertinoFooter1";
import Userpicte from '../../components/Userpicte';
import styles from "../../styles/usuarios/UserScreenStyles";

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

                <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('Notificacoes')}>
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
