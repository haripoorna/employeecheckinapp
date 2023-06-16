import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    onSubmit(username, password);
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder='Username' onChangeText={setUsername} value={username} />
      <TextInput
        style={styles.input}
        placeholder='Password'
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title='Login' onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default LoginForm;
