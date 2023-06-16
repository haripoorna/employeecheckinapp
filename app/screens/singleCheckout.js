import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, Alert } from "react-native";
import CheckInButton from "../components/CheckInButton";
import CheckOutButton from "../components/CheckOutButton";
import Map from "../components/Map";
import Device from "expo-device";
import * as Location from "expo-location";

import { dateConverter, officeLocation } from "../utils/Const";
import { collection, addDoc, setDoc, getDoc, onSnapshot, updateDoc, doc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dataBase } from "../services/firebase";
const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userLat, setUserLat] = useState(null);
  const [userLong, setUserLong] = useState(null);
  const [checkInTime, setCheckInTime] = useState("");
  const [checkInLength, setCheckInLength] = useState([]);
  const [checkOutTime, setCheckOutTime] = useState("");
  const [checkOutLength, setCheckOutLength] = useState([]);

  useEffect(() => {
    (async () => {
      //  console.log("Device", Device.isDevice);
      //  if (Platform.OS === "android" && !Device.isDevice) {

      //   setErrorMsg("Oops, this will not work on Snack in an Android Emulator. Try it on your device!");
      //   return;
      // }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      //  console.log("location", location.coords);
      setUserLat(location.coords.latitude);
      setUserLong(location.coords.longitude);
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return parseInt(distance);
  };

  const toRadians = (degrees) => {
    return (degrees * Math.PI) / 180;
  };
  const handleCheckIn = async () => {
    let userDetails = await AsyncStorage.getItem("UserDetails");
    let parsedData = JSON.parse(userDetails);

    var todayDate = new Date();
    var formattedTodayDate = new Date().toISOString().slice(0, 10);

    try {
      await setDoc(doc(dataBase, "userEntries", JSON.stringify(parsedData.email), formattedTodayDate, "data"), {
        checkInTime: dateConverter(todayDate),
      });
      setCheckInTime([{ checkInTime: JSON.stringify(todayDate) }]);
      setCheckOutTime([]);

      Alert.alert("Check In Added Successfully");
    } catch (e) {
      Alert.alert("Something went wrong", e);
      console.error("Error adding document: ", e);
    }
  };

  const handleCheckOut = async () => {
    let userDetails = await AsyncStorage.getItem("UserDetails");
    let parsedData = JSON.parse(userDetails);

    var todayDate = new Date();
    var formattedTodayDate = new Date().toISOString().slice(0, 10);

    let distance = calculateDistance(officeLocation.latitude, officeLocation.longitude, userLat, userLong);
    //  if (distance > 30) {
    //    Alert.alert("Please come inside office , You should be in 30 meter of radius");
    //  } else {
    try {
      const data = doc(dataBase, "userEntries", JSON.stringify(parsedData.email), formattedTodayDate, "data");
      await updateDoc(data, {
        checkOutTime: dateConverter(todayDate),
      });

      setCheckOutTime([{ checkOutTime: JSON.stringify(todayDate) }]);
      setCheckInTime([]);
      Alert.alert("Check Out Added Successfully");
    } catch (e) {
      Alert.alert("Something went wrong", e);
    }
    //  }
  };
  return (
    <View style={styles.container}>
      <View style={{ width: "100%", height: "70%" }}>
        <Map />
      </View>
      <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20 }}>
        <CheckInButton onPress={handleCheckIn} disabled={checkInTime.length > 0 ? true : false} />
        <CheckOutButton onPress={handleCheckOut} disabled={checkOutTime.length > 0 ? true : false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
    // marginTop: '10%'
  },
});

export default HomeScreen;
