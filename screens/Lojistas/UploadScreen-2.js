import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, Switch } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextInput } from 'react-native';
import CupertinoFooter2 from "../../components/CupertinoFooter2";

// Schema de validação
const schema = yup.object({
  price: yup.string().required('Preço é obrigatório'),  // A propriedade price continua como string para formatação.
});

const select = [
  { key: '1 pessoa', value: '1 pessoa' },
  { key: '2 pessoas', value: '2 pessoas' },
  { key: '3 pessoas', value: '3 pessoas' },
  { key: '4 pessoas', value: '4 pessoas' }
];

// Função para formatar o preço inserido
const formatPrice = (value) => {
  let cleanValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos
  const formattedValue = (cleanValue / 100) // Divide por 100 para centavos
    .toFixed(2) // Garante duas casas decimais
    .replace('.', ',') // Troca ponto por vírgula
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Formatação de milhar
  return formattedValue;
};

export default function UploadScreen2({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isInStock, setIsInStock] = useState(true);
  const [quantity, setQuantity] = useState(2);
  const [price, setPrice] = useState('');
  
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const handlePriceChange = (text) => {
    const formattedPrice = formatPrice(text);
    setPrice(formattedPrice);
    setValue('price', formattedPrice, { shouldValidate: true }); // Atualiza o valor no formulário
  };

  const onSubmit = (data) => {
    console.log(`
      Submitted data:
      • Price: ${price}
      • Category: ${selectedCategory}
      • Em Estoque: ${isInStock ? 'sim' : 'Não'}
      • Quantity in Estoque: ${isInStock ? quantity : 0}
    `);
    navigation.navigate('homeLoja'); // Navega para a tela Carrinho
  };

  const isAllFieldsFilled = () => {
    return !errors.price && price && selectedCategory;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.contentContainer}>
        {/* Seletor de Nº de pessoas */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Nº de pessoas</Text>
          <SelectList
            setSelected={(val) => setSelectedCategory(val)}
            data={select}
            save="value"
            boxStyles={styles.selectBox}
          />
        </View>

        {/* Campo Preço (Obrigatório) */}
        <Text style={styles.label}>Preço (Obrigatório)</Text>
        <Controller
          control={control}
          name="price"
          render={({ field: { onBlur } }) => (
            <TextInput
              style={styles.input}
              placeholder="Insira o preço"
              keyboardType="numeric"
              value={price}
              onChangeText={handlePriceChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.price?.message && <Text style={styles.labelError}>{errors.price?.message}</Text>}

        {/* Estoque */}
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Estoque</Text>
          <Switch
            value={isInStock}
            onValueChange={setIsInStock}
            trackColor={{ false: '#767577', true: '#4F9C1F' }}
            thumbColor={isInStock ? '#FFFFFF' : '#D9D9D9'}
          />
        </View>

        {/* Quantidade - Somente se o estoque estiver ativo */}
        {isInStock && (
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Botão Finalizar */}
        <TouchableOpacity
          style={[styles.finalButton, { opacity: isAllFieldsFilled() ? 1 : 0.5 }]}
          onPress={isAllFieldsFilled() ? handleSubmit(onSubmit) : null}
          disabled={!isAllFieldsFilled()}
        >
          <Text style={styles.buttonText}>FINALIZAR</Text>
        </TouchableOpacity>

        {/* Indicador de Estágios */}
        <View style={styles.stageContainer}>
          <View style={styles.stageTextContainer}>
            <Text style={styles.stageText}>Etapa 1</Text>
            <Text style={styles.stageText}>Etapa 2</Text>
          </View>
          <View style={styles.stageBarsContainer}>
            <View style={styles.activeStage} />
            <View style={styles.inactiveStage} />
          </View>
        </View>
      </View>
      <CupertinoFooter2 style={styles.footer} />
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#211D1D',
      justifyContent: 'space-between',
    },
    contentContainer: {
      width: '90%',
      padding: 20,
      marginTop: 22,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 5 },
      alignSelf: 'center',
    },
    input: {
      backgroundColor: '#F0F0F0',
      borderRadius: 5,
      padding: 9,
      marginVertical: 10,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333333',
      marginTop: 1,
    },
    labelError: {
      color: '#ff375b',
      marginBottom: 8,
    },
    selectBox: {
      backgroundColor: '#F0F0F0',
      borderRadius: 5,
      padding: 15,
      marginVertical: 10,
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',  // Fundo cinza claro
        borderRadius: 20,
        width: 276,
        height: 40,
        paddingHorizontal: 15,
        marginVertical: 10,
        alignSelf: 'center', // Centraliza o componente horizontalmente na tela    
    },
    quantityButton: {
        fontSize: 24,
        width: 30,             // Define a largura exata dos botões
        height: 30,            // Define a altura exata dos botões
        borderRadius: 15,      // Define o botão como um círculo
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        color: '#333333',       // Cor do texto
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    quantityValue: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    finalButton: {
      width: 160,
      height: 36,
      backgroundColor: '#FFC107',
      borderRadius: 15,
      padding: -10,
      alignItems: 'center',
      marginTop: 40,
      alignSelf: 'center',
    },
    buttonText: {
      color: '#333',
      fontWeight: '#0000',
      fontSize: 16,
    },
    stageContainer: {
      marginTop: 40,
    },
    stageTextContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 140,
      marginBottom: 5,
    },
    stageBarsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 140,
    },
    activeStage: {
      height: 16,
      width: 60,
      borderRadius: 10,
      backgroundColor: "#4F9C1F",
    },
    inactiveStage: {
      height: 16,
      width: 60,
      borderRadius: 10,
      backgroundColor: "#4F9C1F",
    },
    stageText: {
      color: '#333',
      fontWeight: 'bold',
    },
    cupertinoFooter1: {
      marginBottom: -0,
      alignItems: 'center',
    },
  });