import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword, auth ,} from "../services/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Loader from "../components/Loader";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getToken();
    return () => {};
  }, []);

  const getToken = async (response) => {
    try {
      let token = await AsyncStorage.getItem("token");
      console.log(token);
      if (token !== null) {
        // setToken(token)
        navigation.navigate("Root");
      } else {
        setToken("");
      }
    } catch (e) {
      // saving error
    }
  };
  const handleLogin = async () => {
    if (email.trim().length === 0) {
      Alert.alert("Input Error", "Email cannot be empty");
    } else if (password.trim().length === 0) {
      Alert.alert("Input Error", "Password cannot be empty");
    } else {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
            setData(response);
              setIsLoading(false);
        })
          .catch((error) => {
            setIsLoading(false)
          console.log("error==", error);
          Alert.alert("error: " + error.code);
        });
    }
  };

  const setData = async (response) => {
    setIsLoading(false);
    await AsyncStorage.setItem("token", JSON.stringify(response._tokenResponse.idToken));
    await AsyncStorage.setItem("UserDetails", JSON.stringify(response.user));

    let userDetails = await AsyncStorage.getItem("UserDetails");
    console.log(userDetails);
    Alert.alert("Login Successful");
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("Root");
    }, 1000);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Log In</Text>
      <TextInput style={styles.input} placeholder='Email' onChangeText={setEmail} value={email} />
      <TextInput
        style={styles.input}
        placeholder='Password'
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignupScreen")}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgot} onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgot}>Forgot password</Text>
      </TouchableOpacity>
      {isLoading ? (
        <View style={{ position: "absolute" }}>
          <Loader />
        </View>
      ) : null}
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#2196f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgot: {
    marginTop: 20,
    color: "#2196f3",
    fontSize: 18,
    fontWeight: "bold",
  }
});
