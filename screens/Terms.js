import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import { API_URL } from "@env";

export default function TermsConditions() {
  const [terms, setTerms] = useState(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get(`${API_URL}/terms`);
        setTerms(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchTerms();
  }, []);

  if (!terms) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{terms.title}</Text>
      <Text style={styles.version}>Versão: {terms.version}</Text>
      <Text style={styles.date}>Data: {terms.date}</Text>
      {terms.content.map((section, index) => (
        <View key={index} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{section.section}</Text>
          <Text style={styles.sectionText}>{section.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#161616", // Cor de fundo atualizada
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#888",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF", // Texto em branco para contraste
    marginBottom: 10,
    textAlign: "center",
  },
  version: {
    fontSize: 14,
    color: "#FFF", // Texto branco
    textAlign: "center",
  },
  date: {
    fontSize: 14,
    color: "#FFF", // Texto branco
    textAlign: "center",
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFF", // Texto em branco para contraste
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 14,
    color: "#CCC", // Texto um pouco mais suave para as seções
    lineHeight: 22,
  },
});
