import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomSheet } from "@gorhom/bottom-sheet";

export default function ExampleScreen() {
  const bottomSheetRef = useRef(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => bottomSheetRef.current?.expand()}
      >
        <Text style={styles.buttonText}>Abrir Bottom Sheet</Text>
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["25%", "50%", "75%"]}
        enablePanDownToClose={true}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.text}>Conteúdo do Bottom Sheet</Text>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#434343",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
});
import { color } from "react-native-elements/dist/helpers";
import { ref } from "yup";
