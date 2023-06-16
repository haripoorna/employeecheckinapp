import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CheckOutButton = ({ onPress,disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? { backgroundColor: "#eee" } : { backgroundColor: "#dc3545" }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>Check Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CheckOutButton;
