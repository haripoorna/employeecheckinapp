import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen({ navigation }) {

  useEffect(() => {
    getToken();

    return () => {};
  }, []);

  const getToken = async (response) => {
    let token = await AsyncStorage.getItem("token");
    navigation.navigate("LoginScreen");
    token == null ? navigation.navigate("LoginScreen") : navigation.navigate("HomeScreen");
  };
  return (
    <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
      <Text>SplashScreen</Text>
    </View>
  );
}
