// screens/usuarios/Verificacao.js
import * as React from 'react';
import { Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import styles from '../styles/usuarios/VerificacaoStyles';

export default function Verificacao({ navigation }) {
  const [code, setCode] = useState('');

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
