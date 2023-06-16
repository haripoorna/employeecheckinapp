import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CheckOutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check-Out Screen</Text>
      {/* Add check-out form or any other check-out related components */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default CheckOutScreen;
