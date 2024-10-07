import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';

const UserProfileCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ImageBackground
          source={require('../assets/gradient.png')} // Imagem de gradiente
          style={styles.background} // Aplicando estilos
          imageStyle={{ borderRadius: 15 }} // Arredondamento
        >
          {/* Ícone de perfil sobrepondo o cartão */}
          <Image
            source={require('../assets/profilepicturev2 1.png')} // Imagem do perfil
            style={styles.profileIcon}
          />
          <Text style={styles.userName}>Lucas Gomes</Text>
          <Text style={styles.userCode}>A15Y</Text>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',// Centraliza horizontalmente
    marginTop: 110, // Espaçamento superior
  },
  card: {
    width: 312, // Definindo largura do cartão
    height: 339, // Definindo altura do cartão
    borderRadius: 15,
    overflow: 'visible', // Permite que o ícone fique visível fora do cartão
    position: 'relative', // Necessário para o posicionamento absoluto do ícone
  },
  profileIcon: {
    width: 117, // Ajuste o tamanho conforme necessário
    height: 112, // Ajuste o tamanho conforme necessário
    borderRadius: 35, // A metade da largura/altura para um círculo
    backgroundColor: '#C4C4C4',
    position: 'absolute', // Permite que o ícone seja posicionado em relação ao cartão
    top: -61, // Ajuste vertical, mude o valor conforme necessário para quebrar
    alignSelf: 'center', // Centraliza horizontalmente o ícone
  },
  background: {
    flex: 1, // Faz o fundo ocupar todo o espaço do cartão
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
  },
  userName: {
    marginTop: -42,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 72,
  },
  userCode: {
    fontSize: 34,
    fontWeight: '700',
    color: '#000',
  },
});

export default UserProfileCard;
