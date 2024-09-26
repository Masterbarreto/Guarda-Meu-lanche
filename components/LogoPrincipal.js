import React from 'react';
import { Image, StyleSheet } from 'react-native';


export default function LogoPrincipal (){
    return(
        <Image source={require('../assets/icon.png')} 
        style={styles.logo} />
    )
}

const styles = StyleSheet.create({
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 1 ,
        width: 258,
        height: 268,
        borderRadius: 300,
        marginTop:  30,
    },
});