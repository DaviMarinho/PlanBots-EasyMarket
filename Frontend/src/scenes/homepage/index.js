import React, { useEffect, useState } from "react";
import MapView, { Marker, Circle } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, ToastAndroid } from "react-native";
import * as Location from "expo-location";
import { openStores } from "../../services/apiservices";

const HomePage = () => {
  const [initialPosition, setInitialPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  // const [markers, setMarkers] = useState(
  // [
  //   {
  //     coordinates: {
  //       latitude: -15.832120,
  //       longitude: -47.914840,
  //     },
  //     title: "Churrasco",
  //     description: "No domingo",
  //   },
  // ]);

  // {
  //   coordinates: {
  //     latitude: 35.524548,
  //     longitude: 139.6749817,
  //   },
  //   title: "Best Place",
  //   description: "This is the best place in Japan",
  // },

  // {
  //   coordinates: {
  //     latitude: 35.524698,
  //     longitude: 139.6655507,
  //   },
  //   title: "Second Best Place",
  //   description: "This is the second best place in Japan",
  // },
  // {
  //   coordinates: {
  //     latitude: 35.5230786,
  //     longitude: 139.6701034,
  //   },
  //   title: "Third Best Place",
  //   description: "This is the third best place in Japan",
  // },
  // {
  //   coordinates: {
  //     latitude: 35.521016,
  //     longitude: 139.6561917,
  //   },
  //   title: "Fourth Best Place",
  //   description: "This is the fourth best place in Japan",
  // },

  const getStoresPositions = () => {
    openStores().then((r) => {
      setMarkers(r.data);
    });
  };

  console.log(markers);

  useEffect(() => {
    Location.installWebGeolocationPolyfill();
    navigator.geolocation.getCurrentPosition(
      // success
      async ({ coords: { latitude, longitude } }) => {
        setInitialPosition({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      // error
      () => {},
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    );
  }, []);

  useEffect(() => {
    if (initialPosition) {
      getStoresPositions();
    }
  }, [initialPosition]);

  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle} initialRegion={initialPosition}>
        {markers.map((marker, idx) => {
          console.log(marker);
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
              onPress={() => console.log('testando')}
            />
          );
        })}

        {initialPosition && (
          <Circle
            radius={1500}
            center={initialPosition}
            fillColor="rgba(180,0,0,0.3)"
            strokeWidth={2}
          />
        )}
      </MapView>
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
