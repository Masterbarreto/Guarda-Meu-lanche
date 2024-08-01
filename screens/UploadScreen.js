import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { fbUriToFirebaseStorage , getDownloadURL} from '../funçoes/fbUriToFirebaseStorage';

export default function UploadImageScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState();
  const [url, setUrl] = useState('');

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

  const uploadImage = async () => {
    await fbUriToFirebaseStorage(selectedImage,
      "my_pics",
      myProgress,
      myGotUrl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload de Imagem</Text>
      <Button title="Selecionar Imagem" onPress={pickImage} />
      {selectedImage ? (
        <Image source={{ uri: selectedImage.uri }} style={styles.image} />
      ) : (
        <Text>image not loaded yet...</Text>
      )}
      <Button title="Upload" onPress={uploadImage} />
      {url && <Text>URL da imagem: {url}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});