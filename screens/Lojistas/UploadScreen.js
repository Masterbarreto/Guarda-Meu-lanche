// screens/upload/UploadImageScreen.js
import { StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CupertinoFooter2 from "../../components/CupertinoFooter2";
import styles from "../../styles/Lojistas/UploadImageScreenStyles"; // Importando o novo estilo

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  description: yup.string().required('Descrição é obrigatória'),
});

const select = [
  { key: 'Hamburguer', value: 'Hamburguer' },
  { key: 'Pizza', value: 'Pizza' },
  { key: 'Refri', value: 'Refri' },
];

export default function UploadImageScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState();
  const [selectedCategory, setSelectedCategory] = useState('');
  const { control, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange' // Atualiza o estado a cada mudança de campo
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets?.length === 1) {
      setSelectedImage(result.assets[0]);
    }
  };

  const onSubmit = (data) => {
    console.log(`
      Submitted data:
      • Name: ${data.name}
      • Category: ${selectedCategory}
      • Description: ${data.description}
      • Image: ${selectedImage.uri}
    `);
    navigation.navigate('UploadScreens2'); // Navega para a tela UploadScreens2
  };

  // Verifica se todos os campos obrigatórios estão preenchidos
  const isAllFieldsFilled = () => {
    return !errors.name && !errors.description && selectedCategory && selectedImage;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Nome do produto</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Nome do produto"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.name?.message && <Text style={styles.labelError}>{errors.name?.message}</Text>}

        <Text style={styles.label}>Categoria</Text>
        <SelectList
          setSelected={(val) => {
            setSelectedCategory(val);
          }}
          data={select}
          save="value"
          boxStyles={styles.selectBox}
        />

        <Text style={styles.label}>Descrição</Text>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Descrição"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline={true}
              numberOfLines={4}
            />
          )}
        />
        {errors.description?.message && <Text style={styles.labelError}>{errors.description?.message}</Text>}

        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.buttonText}>Selecionar Imagem</Text>
        </TouchableOpacity>

        {selectedImage && (
          <Image source={{ uri: selectedImage.uri }} style={styles.image} />
        )}

        <TouchableOpacity
          style={[styles.uploadButton, { opacity: isAllFieldsFilled() ? 1 : 0.5 }]} // Controla a opacidade
          onPress={isAllFieldsFilled() ? handleSubmit(onSubmit) : null} // Habilita o botão apenas se todos os campos estiverem preenchidos
          disabled={!isAllFieldsFilled()} // Desabilita o botão se os campos não estiverem preenchidos
        >
          <Text style={styles.buttonText}>Próxima</Text>
        </TouchableOpacity>

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

      <CupertinoFooter2
        style={styles.cupertinoFooter1}
        onPress={(route) => navigation.navigate(route)}
      />
    </KeyboardAvoidingView>
  );
}
