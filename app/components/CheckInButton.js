import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CheckInButton = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? { backgroundColor: "#eee" } : { backgroundColor: "#28a745" }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>Check In</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
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

export default CheckInButton;
