import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const EmailInput = ({ control, errors }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Email</Text>
      {errors.email?.message && <Text style={styles.labelError}>{errors.email?.message}</Text>}
      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Ex: lucas.gomes@gmail.com"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={[styles.input, errors.email && { borderWidth: 1, borderColor: '#ff375b' }]}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 0, 
    top: 6,
    left: 5,
  },
  labelError: {
    alignSelf: 'flex-start',
    color: "#ff375b",
    marginBottom: 8,
  },
  input: { 
    width: 342, 
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 10,
    height: 42,
    top: -2,
  },
});

export default EmailInput;