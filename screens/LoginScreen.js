import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { AppRegistry } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Importe sua instância do Firebase
import { getDoc, doc } from 'firebase/firestore';
import { myFS } from '../firebase';

import LogoPrincipal from '../components/LogoPrincipal.js';
import EmailInput  from '../components/EmailIput.js'

const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Informe seu email"),
    password: yup.string().required("Informe sua senha").min(6, "A senha deve ter pelo menos 6 dígitos"),
});

export default function LoginScreen({ navigation }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
// função a ser mudada para api 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (data) => {
        try {
            // Validação de entrada
            if (!data.email || !data.password) {
                throw new Error('Email e senha são obrigatórios.');
            }

            // Fazer login
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;

            // Buscar dados do usuário no Firestore
            const userDocRef = doc(myFS, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            const userData = userDoc.data();

            // Verificar papel do usuário e navegar
            if (userData && userData.role) {
                if (userData.role === 'Aluno') {
                    navigation.navigate('Home');
                } else if (userData.role === 'Lojista') {
                    navigation.navigate('UploadImage');
                } else {
                    console.error('Papel não reconhecido:', userData.role);
                    // Tratar papéis não reconhecidos conforme necessário
                }
            } else {
                console.error('Usuário sem papel definido');
                // Tratar usuários sem papel definido conforme necessário
            }

        } catch (error) {
            console.error('Erro ao fazer login:', error);
            // Mostrar mensagens de erro ao usuário
        }
    };

    const getUserRole = async () => {
        try {
            const userDocRef = doc(myFS, 'users', auth.currentUser.uid);
            const userDoc = await getDoc(userDocRef);
            const userData = userDoc.data();
            if (userData && userData.role) {
                return userData.role;
            } else {
                console.error('Usuário sem papel definido');
                // Tratar usuários sem papel definido conforme necessário
            }
        } catch (error) {
            console.error('Erro ao buscar papel do usuário:', error);
            // Mostrar mensagens de erro ao usuário
        }
    };

    return (

        <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={60} >
            <View style={{ top: 10 }}>
                <LogoPrincipal />
            </View>

            <View style={styles.mainBottom}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    {errors.email?.message && <Text style={styles.labelError}>{errors.email?.message}</Text>}
                    <Controller
                        control={control}
                        name='email'
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
                        name='password'
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="*********"
                                value={value}
                                onChangeText={onChange}
                                secureTextEntry={true}
                                style={[
                                    styles.input, {
                                        borderWidth: errors.password && 1,
                                        borderColor: errors.password && '#ff375b'
                                    }
                                ]}
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
                    <Text style={styles.buttonOutlineText} numberOfLines={2}>
                    Não tem uma conta? Cadastre-se 
                    </Text>
                    <View style={styles.rect2}></View>
                </TouchableOpacity>
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
        backgroundColor: '#211D1D',
        padding: 1,
    },
    containerBottom: {
        backgroundColor: '#211D1D',
        marginHorizontal: 'auto',
        top: 0,
    },
    inputContainer: {
        flex: 0.6,
        marginTop: 1,
        top: 40,
    },
    input: { // entro da caixa 
        width: 342, 
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginTop: 10,
        height: 42,
        top: -2,
    },
    buttonContainer: { //botão de entrar
        width: '60%',
        color: "#2C5697" , 
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -170,
        top: -60,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '150%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 5,
        top: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',

    },
    buttonOutline: { //linha 
        backgroundColor: 'transparent',
        color: '#000',
        padding: '0px',
        textAlign: 'center',
        marginTop: 40,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        top: 10,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 11,
        textAlign: 'center',
        flex: 1, // Ocupa o espaço restante
    },
    forgotPasswordText: {
        color: '#0782F9',
        marginTop: 15,
        alignSelf: 'flex-start', // Alinha o texto à direita
        top: -10,
        left: 197,
    },
    label: {
        color: '#fff', // Cor branca
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 0, // Reduzir a margem inferior para aproximar do TextInput
        top: 6,
        left: 5,
    },
    labelError: {
        alignSelf: 'flex-start',
        color: "#ff375b",
        marginBottom: 8,
    },
    mainBottom: {
        flex: 0.8,
        width: "100%",
        padding: 1,
        margin: -120,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        flexGrow: 1,
    },
    rect1: {
            width: 20,
            height: 1,
            backgroundColor: "#E6E6E6",
            marginLeft: 10
    },
    rect2: {
        width: 20,
        height: 1,
        backgroundColor: "#E6E6E6",
        marginLeft: 10
},
});
