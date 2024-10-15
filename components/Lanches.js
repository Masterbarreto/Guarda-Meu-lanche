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
                <View style={styles.IMGContainer}>
                    <Image source={require('../assets/lanche1.png')} style={styles.featuredImage} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.lancheName}>Nome do Lanche</Text>
                    <Text style={styles.lancheDescription}>descrição</Text>
                </View>
                <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('Produto')}>
                    <MaterialCommunityIconsIcon name="plus" />
                </TouchableOpacity>
            </View>

            {/* Lanche 2 */}
            <View style={styles.lancheContainer}>
                <View style={styles.IMGContainer}>
                    <Image source={require('../assets/lanche2.png')} style={styles.featuredImage} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.lancheName}>Nome do Lanche</Text>
                    <Text style={styles.lancheDescription}>descrição</Text>
                </View>
                <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('Produto')}>
                    <MaterialCommunityIconsIcon name="plus" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.l} onPress={() => navigation.navigate('Produto')}>

                </TouchableOpacity>
            </View>

            {/* Lanche 2 */}
            <View style={styles.lancheContainer}>
                <View style={styles.IMGContainer}>
                    <Image source={require('../assets/lanche3.png')} style={styles.featuredImage} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.lancheName}>Nome do Lanche</Text>
                    <Text style={styles.lancheDescription}>descrição</Text>
                </View>
                <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('Produto')}>
                    <MaterialCommunityIconsIcon name="plus" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
        marginLeft: '-2%',
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
    },
    IMGContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'flex-',
        width: 100,
        height: 100,
        backgroundColor: '#FFF',
    },
    lancheContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
        display: "flex",
    },
    featuredImage: {
        width: '100%',
        height: '100%',
        resizeMode: "contain",
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
        marginRight: '10%',
    },
    buttonText: {
        fontSize: 14,
        color: '#000',
    },
});
