import React, { useState } from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { fbUriToFirebaseStorage } from '../firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function UploadScreen({ navigation }) {
const [imageUri, setImageUri] = useState(null);

const handleChooseImage = async () => {
    const imagePickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    });

    if (!imagePickerResult.cancelled) {
    setImageUri(imagePickerResult.uri);
    uploadImageToFirebase(imagePickerResult);
    }
};

const uploadImageToFirebase = async (imagePickerResult) => {
    try {
    await fbUriToFirebaseStorage(
        imagePickerResult,
        "my_food_images",
        null,
        (downloadUrl) => {
        saveImageToFirestore(downloadUrl);
        }
    );
    } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    }
};

const saveImageToFirestore = async (downloadUrl) => {
    try {
    const collRef = collection(db, "products");
    await addDoc(collRef, {
        name: 'Nome do Produto', // Substitua pelo nome do produto
        photoUrl: downloadUrl
    });
    console.log('Imagem salva no Firestore!');
      // Navegue para outra tela após o upload (opcional)
      navigation.navigate('HomeScreen'); // Substitua 'HomeScreen' pelo nome da sua tela de destino
    } catch (error) {
    console.error('Erro ao salvar imagem no Firestore:', error);
    }
};

return (
    <View style={styles.container}>
    {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    <Button title="Escolher Imagem" onPress={handleChooseImage} />
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
image: {
    width: 200,
    height: 200,
    marginBottom: 20,
},
});