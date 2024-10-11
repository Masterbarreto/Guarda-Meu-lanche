import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import CupertinoFooter1 from "../../components/CupertinoFooter1";
import UserProfileCard  from "../../components/codigo";

export default function CodigoScreen({ navigation }) {
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <UserProfileCard style={styles.cards}/>
            <CupertinoFooter1 style={styles.cupertinoFooter1}
            onPress={(route) => navigation.navigate(route)} 
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#211D1D',  // Black background
        
    },
    cards:{
    marginTop: -32,
    },
    cupertinoFooter1:{
        marginTop: 310,
        alignItems: 'center',
    }
});