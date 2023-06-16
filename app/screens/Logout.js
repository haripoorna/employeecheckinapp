import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'

import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Logout({ navigation }) {
  return (
      <View style={{ flex: 1, justifyContent: "center", width: "80%", alignSelf: "center" }}>
        <Button
          title='Logout'
          onPress={async () => {
            await AsyncStorage.removeItem("token");
            navigation.navigate("LoginScreen");
          }}
        />
      </View>
  )
}

const styles = StyleSheet.create({})