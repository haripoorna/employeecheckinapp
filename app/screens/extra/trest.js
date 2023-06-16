import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, Alert } from "react-native";
import CheckInButton from "../../components/CheckInButton";
import CheckOutButton from "../../components/CheckOutButton";
import Map from "../../components/Map";
import Device from "expo-device";
import * as Location from "expo-location";

import { dateConverter, officeLocation } from "../../utils/Const";
import { collection, addDoc, setDoc, onSnapshot, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dataBase } from "../../services/firebase";
const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userLat, setUserLat] = useState(null);
  const [userLong, setUserLong] = useState(null);
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");

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

  useEffect(() => {
    getCheckIDetails();
    return () => {};
  }, []);

  useEffect(() => {
    getCheckoutDetails();
    return () => {};
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

  const getCheckIDetails = async () => {
    var todayDate = new Date();
    var month = todayDate.getUTCMonth() + 1; //months from 1-12
    var day = todayDate.getUTCDate();
    var year = todayDate.getUTCFullYear();
    let userDetails = await AsyncStorage.getItem("UserDetails");
    let parsedData = JSON.parse(userDetails);
    const docRef = collection(
      dataBase,
      "usersData",
      parsedData.email,
      JSON.stringify(year),
      JSON.stringify(month),
      JSON.stringify(day),
      "userData",
      "checkInTime",
    );
    onSnapshot(docRef, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((item) => {
        data.push({
          id: item.id,
          ...item.data(),
        });
      });

      console.log("checkIn", data);
      setCheckInTime(data);
    });
  };

  const getCheckoutDetails = async () => {
    var todayDate = new Date();
    var month = todayDate.getUTCMonth() + 1; //months from 1-12
    var day = todayDate.getUTCDate();
    var year = todayDate.getUTCFullYear();
    let userDetails = await AsyncStorage.getItem("UserDetails");
    let parsedData = JSON.parse(userDetails);
    const docRef = collection(
      dataBase,
      "usersData",
      parsedData.email,
      JSON.stringify(year),
      JSON.stringify(month),
      JSON.stringify(day),
      "userData",
      "checkOutTime",
    );
    onSnapshot(docRef, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((item) => {
        data.push({
          id: item.id,
          ...item.data(),
        });
      });
      console.log("checkout", data);
      setCheckOutTime(data);
    });
  };

  const handleCheckIn = async () => {
    let userDetails = await AsyncStorage.getItem("UserDetails");
    let parsedData = JSON.parse(userDetails);

    var todayDate = new Date();
    var month = todayDate.getUTCMonth() + 1; //months from 1-12
    var day = todayDate.getUTCDate();
    var year = todayDate.getUTCFullYear();

    //  let distance = calculateDistance(officeLocation.latitude, officeLocation.longitude, userLat, userLong);
    //  if (distance > 30) {
    //    Alert.alert("Please come inside office , You should be in 30 meter of radius");
    //  } else {
    try {
      // const docRef = await addDoc(
      //   collection(
      //     dataBase,
      //     "usersData",
      //     parsedData.email,
      //     JSON.stringify(year),
      //     JSON.stringify(month),
      //     JSON.stringify(day),
      //     "userData",
      //     "checkInTime",
      //   ),
      //   {
      //     checkInTime: JSON.stringify(todayDate),
      //   },
      // );

      const docRef = await addDoc(
        collection(dataBase, "userEntries", JSON.stringify(parsedData.email), "data"),

        //  email: JSON.stringify(parsedData.email),
        //  year: JSON.stringify(year),
        //  month: JSON.stringify(month),
        //  day: JSON.stringify(day),
        { checkInTime: dateConverter(todayDate), checkOutTime: "" },
      );
      setCheckInTime([{ checkInTime: JSON.stringify(todayDate) }]);
      setCheckOutTime([]);

      Alert.alert("Check In Added Succesfully");
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      Alert.alert("Something went wrong", e);
      console.error("Error adding document: ", e);
    }
    //  }
  };

  const handleCheckOut = async () => {
    let userDetails = await AsyncStorage.getItem("UserDetails");
    let parsedData = JSON.parse(userDetails);

    var todayDate = new Date();
    var month = todayDate.getUTCMonth() + 1; //months from 1-12
    var day = todayDate.getUTCDate();
    var year = todayDate.getUTCFullYear();

    // try {
    // const docRef = await addDoc(
    //   collection(
    //     dataBase,
    //     "usersData",
    //     parsedData.email,
    //     JSON.stringify(year),
    //     JSON.stringify(month),
    //     JSON.stringify(day),
    //     "userData",
    //     "checkOutTime",
    //   ),
    //   {
    //     checkOutTime: JSON.stringify(todayDate),
    //   },
    // );

    let distance = calculateDistance(officeLocation.latitude, officeLocation.longitude, userLat, userLong);
    //  if (distance > 30) {
    //    Alert.alert("Please come inside office , You should be in 30 meter of radius");
    //  } else {
    try {
      const data = doc(dataBase, "userEntries", JSON.stringify(parsedData.email), "data");
      await updateDoc(data, {
        checkOutTime: dateConverter(todayDate),
      });
      //  const docRef = await addDoc(
      //    collection(dataBase, "userEntries", JSON.stringify(parsedData.email), "checkOutTime"),
      //    {
      //     //  email: JSON.stringify(parsedData.email),
      //     //  year: JSON.stringify(year),
      //     //  month: JSON.stringify(month),
      //     //  day: JSON.stringify(day),
      //      checkOutTime: dateConverter(todayDate),
      //    },
      //  );
      setCheckOutTime([{ checkOutTime: JSON.stringify(todayDate) }]);
      setCheckInTime([]);
      Alert.alert("Check Out Added Succesfully");
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
      <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20 }}>
        {/* {checkInTime.length == 0 ? ( */}
        <CheckInButton onPress={handleCheckIn} disabled={checkInTime.length > 0 ? true : false} />
        {/* // ) : (
        //   <Text style={{ color: "black", fontSize: 18, alignSelf: "center" }}>
        //     Check In Done today at: {dateConverter(JSON.parse(checkInTime[0].checkInTime))}
        //   </Text>
        // )} */}
        {/* {checkOutTime.length == 0 ? ( */}
        <CheckOutButton onPress={handleCheckOut} disabled={checkOutTime.length > 0 ? true : false} />
        {/* ) : (
          <Text style={{ color: "black", fontSize: 18, alignSelf: "center", marginTop: 20 }}>
            Check Out Done today at: {dateConverter(JSON.parse(checkOutTime[0].checkOutTime))}
          </Text>
        )} */}
        {/* <CheckInButton onPress={handleCheckIn} />
        <CheckOutButton onPress={handleCheckOut} /> */}
        {/* {checkOutTime.length == 0 && <CheckOutButton onPress={handleCheckOut} />} */}
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
