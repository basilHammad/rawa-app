import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Animated,
  Text,
  Button,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const Map = ({ route }) => {
  const { cords } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        initialRegion={{
          latitude: +cords.lat,
          longitude: +cords.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: +cords.lat,
            longitude: +cords.lng,
          }}
        />
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Map;
