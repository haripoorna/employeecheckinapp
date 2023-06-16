import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, ScrollView } from "react-native";
import { collection, addDoc, setDoc, onSnapshot } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dataBase } from "../services/firebase";
import { query, where, getDocs } from "firebase/firestore";
import { Calendar } from "react-native-calendars";
const EmployeeAttendance = () => {
  const [finalData, setFinalData] = useState([]);
  const [day1, setDay1] = useState([]);
  const [day2, setDay2] = useState([]);
  const [today, setToday] = useState([]);
    const currentDate1 = new Date();
    currentDate1.setDate(currentDate1.getDate() - 1);
    const previousDayDateString = currentDate1.toDateString();

    const currentDate2 = new Date();
    currentDate2.setDate(currentDate2.getDate() - 2);

    const dayBeforeYesterdayDateString = currentDate2.toDateString();

    var formattedTodayDate = new Date().toDateString();
  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const getData = async () => {

    
    let userDetails = await AsyncStorage.getItem("UserDetails");
    let parsedData = JSON.parse(userDetails);
    
    
    
    const day1 = collection(dataBase, "userEntries", JSON.stringify(parsedData.email), previousDayDateString);
    const day2 = collection(dataBase, "userEntries", JSON.stringify(parsedData.email), dayBeforeYesterdayDateString);
    const today = collection(dataBase, "userEntries", JSON.stringify(parsedData.email), formattedTodayDate);
    
    
    onSnapshot(today, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((item) => {
        data.push({
          id: item.id,
          ...item.data(),
        });
      });

      setToday(data);
    });
  
    onSnapshot(day1, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((item) => {
        data.push({
          id: item.id,
          ...item.data(),
        });
      });

      setDay1(data);
    });
  
    onSnapshot(day2, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((item) => {
        data.push({
          id: item.id,
          ...item.data(),
        });
      });

      setDay2(data);
    });
  }

  console.log(day1,day2,today)

  const renderAttendanceItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10 ,}}>
        <View>{item.checkInTime && <Text style={{ fontSize: 20 }}> {item.checkInTime.substring(10, 20)} </Text>}</View>
        {item.checkOutTime && <Text style={{ fontSize: 20, right: 20 }}>{item.checkOutTime.substring(11, 20)}</Text>}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* <View style={{ flex: 1 }}>
        <Calendar
          onDayPress={(date) => {
            console.log("Selected day: ", date);
          }}
          // markedDates={{
          //   "2023-06-07": { selected: true, marked: true },
          //   "2023-06-08": { selected: true, marked: true },
          // }}
        />
      </View> */}

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 30, marginVertical: 15 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Check In</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Check Out</Text>
      </View>
      {day2.length > 0 ? (
        <View style={styles.card}>
          <Text style={styles.cardHeader}>
            Date : {dayBeforeYesterdayDateString}{" "}
          </Text>

          <FlatList
            data={day2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderAttendanceItem}
           
          />
        </View>
      ) : null}
      {day1.length > 0 ? (
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Date : {previousDayDateString} </Text>
          <FlatList data={day1} keyExtractor={(item, index) => index.toString()} renderItem={renderAttendanceItem} />
        </View>
      ) : null}
      {today.length > 0 ? (
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Date : {formattedTodayDate} </Text>
          <FlatList data={today} keyExtractor={(item, index) => index.toString()} renderItem={renderAttendanceItem} />
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 10,
  },
  itemContainer: {
    // marginBottom: 10,
    // padding: 10,
    // borderWidth: 1,
    // borderColor: "#ccc",
    // borderRadius: 5,
  },
  dayText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  card: {
    marginVertical: 15,
    backgroundColor: "#eee",
    marginHorizontal: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  cardHeader: { marginLeft: 20, fontSize: 22, fontWeight: "bold", borderBottomWidth: 1, borderBottomColor: "#1e1e1e" },
});

export default EmployeeAttendance;
