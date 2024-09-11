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

        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={{ top: 10 }}>
                <Image
                    source={require("../assets/icon.png")}
                    style={styles.containerLogo}
                />
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
                    <Text style={styles.buttonOutlineText} numberOfLines={2}>Não tem uma conta? Cadastre-se</Text>
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
        // backgroundColor: '#211D1D',
        backgroundColor: '#ffb70a',
        padding: 1,
    },
    containerLogo: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 200,
        borderRadius: 300,
        marginTop: 50,
    },
    containerBottom: {
        backgroundColor: '#211D1D',

        marginHorizontal: 'auto'

    },
    inputContainer: {
        flex: 0.6,
        marginTop: 2,
        top: 40,
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginTop: 10,
        height: 45,
        top: -4,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        top: 70,
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
    buttonOutline: {
        backgroundColor: 'transparent',
        color: '#000',
        padding: '0px',
        textAlign: 'center',
        marginTop: 40,
        flexWrap: 'wrap',
        top: 10,
    },
    buttonOutlineText: {
        color: '#0782F9', // Cor do texto do botão de cadastro
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 'auto',
        paddingHorizontal: "auto", // Remova o preenchimento horizontal

    },
    forgotPasswordText: {
        color: '#0782F9',
        marginTop: 15,
        alignSelf: 'flex-start', // Alinha o texto à direita
        top: -10,
    },
    label: {
        color: '#fff', // Cor branca
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 0, // Reduzir a margem inferior para aproximar do TextInput
        top: 0,
    },
    labelError: {
        alignSelf: 'flex-start',
        color: "#ff375b",
        marginBottom: 8,
    },
    mainBottom: {
        flex: 0.8,
        backgroundColor: "red",
        width: "100%",
        padding: 1,
        margin: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25

    }
});
