import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Certifique-se de instalar esta biblioteca

const FoodPricingScreen = () => {
return (
    
    <View style={styles.container}>
    <Image
source={require("../assets/icon.png")}
style={styles.containerLogo}
/>
    <TouchableOpacity style={styles.button}>
        <Icon name="restaurant-menu" size={24} color="#000000"   />
        <Text style={styles.buttonText}>Preço de alimentação - P1</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button}>
        <Icon name="fastfood" size={24} color="#000000" />
        <Text style={styles.buttonText}>Preço de alimentação - P2</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button}>
        <Icon name="local-dining" size={24} color="#000000" />
        <Text style={styles.buttonText}>Preço de alimentação - P3</Text>
    </TouchableOpacity>
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#211D1D',
    alignItems: 'center',
    justifyContent: 'center',
    
},
button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    width: '80%',
    top: -190,
    left: 8,
},
buttonText: {
    color: '#000000',
    marginLeft: 16,
    fontSize: 18,
},
containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 54,
    height: 54,
    borderRadius: 300,
    marginTop: 1,
    top: -240,
    left: -140,
},

});

export default FoodPricingScreen;
