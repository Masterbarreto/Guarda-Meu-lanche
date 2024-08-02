import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextInput } from 'react-native';

//----------------- ---------------importaçoes do firebase-----------------------------------------------//
import * as ImagePicker from 'expo-image-picker';
import { fbUriToFirebaseStorage } from '../funçoes/fbUriToFirebaseStorage';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';
import { addDoc, collection, getFirestore, setDoc } from 'firebase/firestore';
//----------------- -------------------------------------------------------------------------------------//

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  
  description: yup.string().required('Descrição é obrigatória'),
});

const select = [
  { key: 'Eletrônicos', value: 'Eletrônicos' },
  { key: 'Roupas', value: 'Roupas' },
  { key: 'Livros', value: 'Livros' },
  // Adicione mais categorias aqui
];

export default function UploadImageScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState();
  const [url, setUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const db = getFirestore();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      console.log("User cancelled the picker");
    } else if (!result.cancelled && result.assets?.length === 1) {
      setSelectedImage(result.assets[0]);
    } else {
      console.log("Assets picked:", result.assets);
    }
  };

  const myProgress = (ratio) => {
    console.log('Upload progress:', ratio * 100);
  };

  const myGotUrl = (urlFromFirebase) => {
    setUrl(urlFromFirebase);
    console.log('URL da imagem no Firebase:', urlFromFirebase);
  };

  const uploadImage = async (data) => {
    await fbUriToFirebaseStorage(selectedImage,
      "my_pics",
      myProgress,
      myGotUrl);

      const myNewData = {
        "name":  data.name,
        "category": selectedCategory,
        "description": data.description,
        "imageUrl": url
      };
      
      const itemsRef = collection(db, "items");
      const newDocRef = await addDoc(itemsRef, myNewData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.name}>Nome</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder=""
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.name?.message && <Text style={styles.labelError}>{errors.name?.message}</Text>}

        <Text style={styles.category}>Categoria</Text>
        <SelectList
          setSelected={(val) => setSelectedCategory(val)}
          data={select}
          save="value"
          boxStyles={styles.selectBox}
          dropdownStyles={styles.selectDropdown}
        />

        {errors.category?.message && <Text style={styles.labelError}>{errors.category?.message}</Text>}

        <Text style={styles.description}>Descrição</Text>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder=""
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline={true}
              numberOfLines={4}
            />
          )}
        />
        {errors.description?.message && <Text style={styles.labelError}>{errors.description?.message}</Text>}

        <Button title="Selecionar Imagem" onPress={pickImage} />
        {selectedImage ? (
          <Image source={{ uri: selectedImage.uri }} style={styles.image} />
        ) : (
          <Text style={styles.alert}>Imagem não carregada ainda...</Text>
        )}
        <Button title="Upload" onPress={handleSubmit(uploadImage)} />
        {url && <Text>URL da imagem: {url}</Text>}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#211D1D',
  },
  contentContainer: {
    width: '100%',
    padding: 20,
  },
  voltar: {
    color: '#FFF',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 11,
    borderRadius: 21,
    marginTop: 0,
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 0,
  },
  labelError: {
    alignSelf: 'flex-start',
    color: "#ff375b",
    marginBottom: 8,
    marginLeft: 0,
  },
  name: {
    color: '#FFF', // Texto branco
    fontSize: 16,
    marginTop: 20,
  },
  category: {
    color: '#FFF', // Texto branco
    fontSize: 16,
    marginTop: 20,
  },
  description: {
    color: '#FFF', // Texto branco
    fontSize: 16,
    marginTop: 30,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 20,
  },
  alert: {
    color: '#FFFFFF',
    marginTop: 20
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',

  },
  selectBox: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 21,
    marginTop: 20,
  },
  selectDropdown: {
    borderRadius: 21,
    marginTop: 5,
    color: '#FFFFFF',
  },

});