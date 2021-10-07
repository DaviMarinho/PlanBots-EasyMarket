import React, { useEffect, useState } from "react";
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';

const HomePage = () => {
  const [region, setRegion] = useState(null);
  useEffect(() => {
    Location.installWebGeolocationPolyfill()
    navigator.geolocation.getCurrentPosition(
      // success
      async ({ coords: { latitude, longitude } }) => {
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      // error
      () => { }, {
      timeout: 2000,
      enableHighAccuracy: true,
      maximumAge: 1000,
    });
  }, []);
  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle} initialRegion={region} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default HomePage;
