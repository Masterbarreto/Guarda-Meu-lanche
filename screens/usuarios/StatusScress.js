import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import CupertinoFooter1 from "../../components/CupertinoFooter1";
import styles from '../../styles/usuarios/CodigoScreenStyles'; // Importe os estilos

export default function StatusScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tools</Text>
      <Text style={styles.subtitle}>Acompanhar pedido</Text>
      <View style={styles.statusBar} />
      <View style={styles.estimatedTimeContainer}>
        <Text style={styles.estimatedTime}>18:39 - 17:00</Text>
        <Text style={styles.estimatedTimeLabel}>Previsão de entrega</Text>
      </View>
      <View style={styles.timeline}>
        <View style={styles.timelineItem}>
          <View style={styles.markerContainer}>
            <View style={styles.timelineMarkerConfirmed} />
            <View style={styles.statusBarVertical} />
          </View>
          <Text style={styles.timelineText}>Confirmado</Text>
          <Text style={styles.timelineTime}>18:15</Text>
        </View>
        <View style={styles.timelineItem}>
          <View style={styles.markerContainer}>
            <View style={styles.timelineMarkerConfirmed} />
            <View style={styles.statusBarVertical} />
          </View>
          <Text style={styles.timelineText}>Fazendo</Text>
          <Text style={styles.timelineTime1}>18:15</Text>
        </View>
        <View style={styles.timelineItem}>
          <View style={styles.markerContainer}>
            <View style={styles.timelineMarkerConfirmed} />
            <View style={styles.statusBarVertical} />
          </View>
          <Text style={styles.timelineText}>A caminho</Text>
          <Text style={styles.timelineTime2}>18:15</Text>
        </View>
        <View style={styles.timelineItem}>
          <View style={styles.markerContainer}>
            <View style={styles.timelineMarkerDelivered} />
            <View style={styles.statusBarVertical} />
          </View>
          <Text style={styles.timelineText}>Entregue</Text>
          <Text style={styles.timelineTime3}>18:15</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Confirmaçao')}>
        <Text style={styles.buttonText}>CÓDIGO</Text>
      </TouchableOpacity>
      <CupertinoFooter1
        style={styles.cupertinoFooter1}
        onPress={(route) => navigation.navigate(route)}
      />
    </ScrollView>
  );
}
