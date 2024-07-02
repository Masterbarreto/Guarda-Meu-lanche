import * as React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from 'react-native';

export default function User({navigation}) {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
            User screen 
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    text:{
        fontSize: 26,
        fontWeight: 'bold'
    }
})