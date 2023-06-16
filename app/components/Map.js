import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView,{Marker} from "react-native-maps";
import { officeLocation } from '../utils/Const';


const Map = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: "stretch", height: "100%" }}
        region={officeLocation}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Marker coordinate={officeLocation} title='Office Location' />
      </MapView>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%', 
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
export default Map;
