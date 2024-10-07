import React from 'react';
import { Image, StyleSheet } from 'react-native';


export default function Userpicte (){
    return(
        <Image source={require('../assets/foto de perfil.png')} 
        style={styles.logo} />
    )
}

const styles = StyleSheet.create({
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 1 ,
        width: 128,
        height: 128,
        borderRadius: 300,
        marginTop:  30,
    },
});