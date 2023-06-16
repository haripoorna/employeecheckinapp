import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CheckInScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check-In Screen</Text>
      {/* Add check-in form or any other check-in related components */}
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

export default CheckInScreen;
