import * as React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from 'react-native';

export default function PraçaScreen({navigation}) {
    return(
        <View style={styles.container}>
            <Text onProgress={""} style={styles.text}>
            P1 screen 
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