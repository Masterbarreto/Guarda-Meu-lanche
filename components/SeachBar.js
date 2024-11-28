// components/SearchBar.js
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Certifique-se de ter a biblioteca instalada

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (searchText.trim()) {
      onSearch(searchText);
      setSearchText(""); // Limpa o campo de pesquisa após a busca
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Busque por uma lanche, ou uma praça."
        value={searchText}
        onChangeText={setSearchText}
        onPress={(p) => {
          
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Icon name="search" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 5,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#fff",
    paddingHorizontal: 10,
    fontSize: 15,
    fontFamily: "Circular",
  },
  button: {
    padding: 10,
  },
});

export default SearchBar;
