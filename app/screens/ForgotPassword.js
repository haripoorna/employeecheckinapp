import React, { useState } from "react";
import { View, StyleSheet, Text, Button, TextInput, Alert } from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Password reset email sent to", email);
       
      })
      .catch((error) => {
Alert.alert(JSON.stringify(error))
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Forgot Password </Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <Button title='Reset Password' onPress={handleForgotPassword} />
      <Button
        title='Back'
        type='outline'
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 18,
  },
});

export default ForgotPassword;