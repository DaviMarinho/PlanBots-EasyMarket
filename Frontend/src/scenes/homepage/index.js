import React, { useEffect, useState } from "react";
import MapView, { Marker, Circle } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useData } from '../../context/';
import * as Location from "expo-location";

const HomePage = () => {
  const [initialPosition, setInitialPosition] = useState(null);
  const { markers, getStoreLocations } = useData();

  const getUserLocation = () => {
    Location.installWebGeolocationPolyfill();
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setInitialPosition({
          latitude: p.coords.latitude,
          longitude: p.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      (e) => console.error(e),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  const renderMarkers = () => {
    if (markers?.length) {
      return markers.map((marker, idx) => {
        if (marker.storeLatitude && marker.storeLongitude) { // remover depois que todas as lojas estejam usando o storeLatitude e storeLongitude
          return (
            <Marker
              coordinate={{
                latitude: parseFloat(marker.storeLatitude),
                longitude: parseFloat(marker.storeLongitude),
              }}
              pinColor={"red"} // any color
              title={marker.storeName}
              description={marker.storeDescription}
              key={idx}
              onPress={() => console.log("testando")}
            />
          );
        }
      });
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (initialPosition) {
      getStoreLocations();
    }
  }, [initialPosition]);

  return (
    <View style={styles.container}>
      {initialPosition ? (
        <MapView style={styles.mapStyle} initialRegion={initialPosition}>
          {renderMarkers()}
          <Circle
            radius={1500}
            center={initialPosition}
            fillColor="rgba(180,0,0,0.3)"
            strokeWidth={2}
          />
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="red" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default HomePage;
