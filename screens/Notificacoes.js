import React from "react";
import StackView from "@react-navigation/stack";

import { Container, TitleList, Text, GoBack} from "../src/styles/Notificacoes";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Notificacoes = ({navigation}) => {
    return (
        <Container>
            <TitleList>Notificações</TitleList>
            <GoBack onPress={() => navigation.goBack('Home')}>
    
            </GoBack>
            <Text>Essa é uma notificação!</Text>
        </Container>
    )
}
export default Notificacoes;
