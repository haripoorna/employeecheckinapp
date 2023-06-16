import React, { useState } from "react";
import { View, TextInput, Alert, StyleSheet,ScrollView, TouchableOpacity, Text } from "react-native";
import { createUserWithEmailAndPassword, auth, db, dataBase } from "../services/firebase";

import {  doc, setDoc,  } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from '../components/Loader';

const SignupScreen = ({navigation}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
//   const [profilePicture, setProfilePicture] = useState("");



  const handleSignup = () => {
    if (name.trim().length === 0) {
      Alert.alert("Input Error", " Name cannot be empty");
    } else  if (mobileNumber.trim().length === 0) {
      Alert.alert("Input Error", "Mobile Number cannot be empty");
    } else if (email.trim().length === 0) {
      Alert.alert("Input Error", "Email cannot be empty");
    } else if (password.trim().length === 0) {
      Alert.alert("Input Error", "Password cannot be empty");
    }else if (employeeCode.trim().length === 0) {
      Alert.alert("Input Error", "Employee Code cannot be empty");
    }else if (address.trim().length === 0) {
      Alert.alert("Input Error", "Address cannot be empty");
    } else  {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
          .then((response) => {
            
          setUserData(response);
        })
        .catch((error) => {
          
      setIsLoading(false);
          Alert.alert("error: " + error.code);
          console.log(error);
        });
    }
  };

    const setUserData = async (response) => {
    await setDoc(doc(dataBase, "users", email.toLowerCase()), {
      name: name,
      email: email,
      mobileNumber: mobileNumber,
      gender: gender,
      address: address,
      employeeCode: address,
      date: new Date().toDateString(),
    });
      try {
      
      setIsLoading(false);
      Alert.alert("Success: " + response.user.email + " has been created");
      await AsyncStorage.setItem("token", JSON.stringify(response._tokenResponse.idToken));
      await AsyncStorage.setItem("UserDetails", JSON.stringify(response.user));
    setTimeout(() => {
      navigation.navigate('Root')
    }, 1000);
    } catch (e) {
        // saving error
        
      setIsLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Register</Text>
        <TextInput style={styles.input} placeholder='Name' onChangeText={setName} value={name} />
        <TextInput
          style={styles.input}
          placeholder='Email'
          onChangeText={setEmail}
          value={email}
          keyboardType='email-address'
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[styles.genderButton, gender === "male" && styles.selectedGenderButton]}
            onPress={() => setGender("male")}
          >
            <Text style={styles.genderButtonText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderButton, gender === "female" && styles.selectedGenderButton]}
            onPress={() => setGender("female")}
          >
            <Text style={styles.genderButtonText}>Female</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder='Mobile Number'
          onChangeText={setMobileNumber}
          value={mobileNumber}
        />
        <TextInput style={styles.input} placeholder='Address' onChangeText={setAddress} value={address} />
        <TextInput
          style={styles.input}
          placeholder='Employee Code'
          onChangeText={setEmployeeCode}
          value={employeeCode}
        />
        {/* <Button title="Choose Profile Picture" onPress={chooseProfilePicture} /> */}
        {isLoading ? <Loader/> : null}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("LoginScreen")}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
        justifyContent: "center",
    paddingTop:'20%'
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 8,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  genderButton: {
    backgroundColor: "#ccc",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  selectedGenderButton: {
    backgroundColor: "#007AFF",
  },
  genderButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#2196f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 30,
  },
});
export default SignupScreen;