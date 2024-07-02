import * as React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from 'react-native';

export default function Carinho({navigation}) {
    return(
        <View style={styles.container}>
            <Text onProgress={"P1 "} style={styles.text}>
            Carinho screen 
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