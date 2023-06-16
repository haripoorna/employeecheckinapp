import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";
import { dataBase } from "../services/firebase";
import { collection,  onSnapshot, } from "firebase/firestore";

const ProfileScreen = ({  }) => {
  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({});
 useEffect(() => {
   getUserData();
 }, [email]);

 useEffect(() => {
   const docRef = collection(dataBase, "users");
   const receiveUsersData = onSnapshot(docRef, (querySnapshot) => {
     let data = [];
     querySnapshot.forEach((item) => {
       data.push({
         id: item.id,
         ...item.data(),
       });
     });
     const result = data.find((obj) => obj?.email?.toLowerCase() === email?.toLowerCase());
     console.log("result", result);
     setUser(result);
   });

   return () => receiveUsersData();
 }, [email]);

 const getUserData = async () => {
   const userDetails = await AsyncStorage.getItem("UserDetails");
     let parsedData = JSON.parse(userDetails);
   setUserData(parsedData);

   setEmail(parsedData.email);
 };
  
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.label}>Name:</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>{user?.name}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.label}>Email:</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>{user?.email}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.label}>Gender:</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>{user?.gender}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.label}>Mobile Number:</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>{user?.mobileNumber}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.label}>Address:</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>{user?.address}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.label}>Employee Code:</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>{user?.employeeCode}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
    padding: 10,
    margin: 20,
    marginTop:40,
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
  },
  cell: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
   textTransform:'capitalize'
  },
});

export default ProfileScreen;
