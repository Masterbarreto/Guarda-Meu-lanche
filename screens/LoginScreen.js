import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Importe sua instância do Firebase
import { getDoc, doc } from 'firebase/firestore';
import { myFS } from '../firebase';

import LogoPrincipal from '../components/LogoPrincipal.js';

const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Informe seu email"),
    password: yup.string().required("Informe sua senha").min(6, "A senha deve ter pelo menos 6 dígitos"),
});

export default function LoginScreen({ navigation }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (data) => {
        try {
            if (!data.email || !data.password) {
                throw new Error('Email e senha são obrigatórios.');
            }

            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;

            const userDocRef = doc(myFS, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            const userData = userDoc.data();

            if (userData && userData.role) {
                if (userData.role === 'Aluno') {
                    navigation.navigate('Home');
                } else if (userData.role === 'Lojista') {
                    navigation.navigate('MinhasLojas');
                } else {
                    console.error('Papel não reconhecido:', userData.role);
                }
            } else {
                console.error('Usuário sem papel definido');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.logoContainer}>
                    <LogoPrincipal />
                </View>

                <View style={styles.mainBottom}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        {errors.email?.message && <Text style={styles.labelError}>{errors.email?.message}</Text>}
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="Ex: Lucas.gomes@gmail.com"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    style={[styles.input, {
                                        borderWidth: errors.email && 1,
                                        borderColor: errors.email && '#ff375b'
                                    }]}
                                />
                            )}
                        />

                        <Text style={styles.label}>Senha</Text>
                        {errors.password?.message && <Text style={styles.labelError}>{errors.password?.message}</Text>}
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="*********"
                                    value={value}
                                    onChangeText={onChange}
                                    secureTextEntry={true}
                                    style={[styles.input, {
                                        borderWidth: errors.password && 1,
                                        borderColor: errors.password && '#ff375b'
                                    }]}
                                />
                            )}
                        />

                        <TouchableOpacity onPress={() => { navigation.navigate('EsqueciaSenha') }}>
                            <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleSubmit(handleLogin)} style={styles.button}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Criar Conta')} style={styles.buttonOutline}>
                        <View style={styles.rect1}></View>
                        <Text style={styles.buttonOutlineText}>
                            Não tem uma conta? Cadastre-se
                        </Text>
                        <View style={styles.rect2}></View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#211D1D',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    inputContainer: {
        marginTop: 0,
    },
    input: {
        width: 342,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        
    },
    buttonContainer: {
        marginTop: -30,
    },
    button: {
        backgroundColor: '#2C5697',
        padding: 15,
        borderRadius: 180,
        alignItems: 'center',
        width: 340,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutline: {
        marginTop: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 11,
        marginHorizontal: 10,
    },
    forgotPasswordText: {
        color: '#0782F9',
        marginTop: 12,
        fontSize: 14,
        textAlign: 'right',
        marginRight: 2,
    },
    label: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 3,
    },
    labelError: {
        color: "#ff375b",
        marginBottom: 8,
        marginLeft: 10,
    },
    mainBottom: {
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rect1: {
        width: 80,
        height: 1,
        backgroundColor: "#E6E6E6",
    },
    rect2: {
        width: 80,
        height: 1,
        backgroundColor: "#E6E6E6",
    },
});
