import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, Alert } from "react-native";
import CheckInButton from "../components/CheckInButton";
import CheckOutButton from "../components/CheckOutButton";
import Map from "../components/Map";
import Device from "expo-device";
import * as Location from "expo-location";

import { dateConverter, officeLocation } from "../utils/Const";
import { collection, addDoc, setDoc, onSnapshot, updateDoc, doc, Timestamp } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dataBase } from "../services/firebase";
import Loader from "../components/Loader";
const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userLat, setUserLat] = useState(null);
  const [userLong, setUserLong] = useState(null);
  const [dataLength, setDataLength] = useState(0);
  const [checkOutLatestId, setCheckOutLatestId] = useState("");
  const [statusOfCheckInBtn, setStatusOfCheckInBtn] = useState(false);
  const [statusOfCheckOutBtn, setStatusOfCheckOutBtn] = useState(true);
  const [checkInValue, setCheckInValue] = useState("");
  const [checkOutValue, setCheckOutValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    // setIsLoading(true)
    let userDetails = await AsyncStorage.getItem("UserDetails");
    let parsedData = JSON.parse(userDetails);
    var formattedTodayDate = new Date().toDateString();
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() );
    const nextDayDateString = currentDate.toDateString();

    var todayDate = new Date();

    const docRef = collection(dataBase, "userEntries", JSON.stringify(parsedData.email), formattedTodayDate);
    onSnapshot(docRef, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((item) => {
        data.push({
          id: item.id,
          ...item.data(),
        });
      });
      setDataLength(data.length);
    });
    //  let distance = calculateDistance(officeLocation.latitude, officeLocation.longitude, userLat, userLong);
    //  if (distance > 30) {
    //    Alert.alert("Please come inside office , You should be in 30 meter of radius");
    //  } else {
    console.log(dataLength);

    try {
      const docRef = await addDoc(
        collection(dataBase, "userEntries", JSON.stringify(parsedData.email), formattedTodayDate),
        {
          id: dataLength + 1,
          checkInTime: dateConverter(todayDate),
          checkOutTime: "",
          timestamp: Timestamp.fromDate(new Date(todayDate)),
        },
      );
      // }

      setCheckInValue(new Date().toLocaleTimeString());
      Alert.alert("Check In Added Succesfully");
      setIsLoading(false);
      setStatusOfCheckOutBtn(false);
      setStatusOfCheckInBtn(true);
      const docRef2 = collection(dataBase, "userEntries", JSON.stringify(parsedData.email), formattedTodayDate);
      onSnapshot(docRef2, (querySnapshot) => {
        let data = [];
        querySnapshot.forEach((item) => {
          if (item.data().checkOutTime == "") {
            console.log(item.id);
            setCheckOutLatestId(item.id);
          }
        });
      });
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      Alert.alert("Something went wrong", e);
      console.error("Error adding document: ", e);
    }
    //  }
  };

  const handleCheckOut = async () => {
    setIsLoading(true);
    let userDetails = await AsyncStorage.getItem("UserDetails");
    let parsedData = JSON.parse(userDetails);

    var todayDate = new Date();

    var formattedTodayDate = new Date().toDateString();
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() );
    const nextDayDateString = currentDate.toDateString();
    let distance = calculateDistance(officeLocation.latitude, officeLocation.longitude, userLat, userLong);
    //  if (distance > 30) {
    //    Alert.alert("Please come inside office , You should be in 30 meter of radius");
    //  } else {

    try {
      const data = doc(dataBase, "userEntries", JSON.stringify(parsedData.email), formattedTodayDate, checkOutLatestId);

      await updateDoc(data, {
        checkOutTime: dateConverter(todayDate),
        timestamp: Timestamp.fromDate(new Date(todayDate)),
      });
      Alert.alert("Check Out Added Successfully");
      setCheckOutValue(new Date().toLocaleTimeString());
      setStatusOfCheckOutBtn(true);
      setIsLoading(false);
      setStatusOfCheckInBtn(false);
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      Alert.alert("Something went wronf", e);
      console.error("Error adding document: ", e);
    }
    //  }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", height: "70%" }}>
        <Map />
      </View>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20 }}>
          <CheckInButton onPress={handleCheckIn} disabled={statusOfCheckInBtn} />

          <CheckOutButton onPress={handleCheckOut} disabled={statusOfCheckOutBtn} />
        </View>
      )}
      <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20 }}>
        {checkInValue != "" && <Text style={{ fontSize: 20, fontWeight: "bold" }}>{checkInValue}</Text>}
        {checkOutValue != "" && <Text style={{ fontSize: 20, fontWeight: "bold" }}>{checkOutValue}</Text>}
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
