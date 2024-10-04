import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native'; // Adicione esta linha

export default function CupertinoFooter1(props) {
    const navigation = useNavigation(); // Adicione esta linha para pegar a navegação

    return (
        <View style={styles.container}>
            {/* Lanche 1 */}
            <View style={styles.lancheContainer}>
                <Image source={require('../assets/lanche1.png')} style={styles.featuredImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.lancheName}>Nome do Lanche</Text>
                    <Text style={styles.lancheDescription}>descrição</Text>
                </View>
                <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('home')}>
                    <MaterialCommunityIconsIcon name="plus" />
                </TouchableOpacity>
            </View>

            {/* Lanche 2 */}
            <View style={styles.lancheContainer}>
                <Image source={require('../assets/lanche2.png')} style={styles.featuredImage2} />
                <View style={styles.textContainer}>
                    <Text style={styles.lancheName}>Nome do Lanche</Text>
                    <Text style={styles.lancheDescription}>descrição</Text>
                </View>
                <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('home')}>
                    <MaterialCommunityIconsIcon name="plus" />
                </TouchableOpacity>
            </View>

            {/* Lanche 2 */}
            <View style={styles.lancheContainer}>
                <Image source={require('../assets/lanche3.png')} style={styles.featuredImage2} />
                <View style={styles.textContainer}>
                    <Text style={styles.lancheName}>Nome do Lanche</Text>
                    <Text style={styles.lancheDescription}>descrição</Text>
                </View>
                <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('home')}>
                    <MaterialCommunityIconsIcon name="plus" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    lancheContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    featuredImage: {
        width: 95,
        height: 69,
    },
    featuredImage2: {
        width: 78,
        height: 80,
    },
    lancheName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    lancheDescription: {
        fontSize: 14,
        color: '#888',
    },
    categoryButton: {
        width: 50,
        height: 30,
        backgroundColor: '#FFE48D',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 14,
        color: '#000',
    },
});
