import React, { useEffect, useState } from "react";
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import { useData } from "../../context/";
import * as Location from "expo-location";

const HomePage = ({ navigation }) => {
  const [initialPosition, setInitialPosition] = useState(null);
  const { markers, getStoreLocations, userData } = useData();

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
        if (marker.storeLatitude && marker.storeLongitude) {
          // remover depois que todas as lojas estejam usando o storeLatitude e storeLongitude
          let tintColor = userData
            ? userData.storeID === marker._id
              ? "red"
              : "rgb(74,134,232)"
            : "rgb(74,134,232)";
          return (
            <Marker
              coordinate={{
                latitude: parseFloat(marker.storeLatitude),
                longitude: parseFloat(marker.storeLongitude),
              }}
              // pinColor={color} // any color
              title={marker.storeName}
              description={marker.storeDescription}
              key={idx}
              onPress={() => navigation.navigate("storePage", marker)}
              // image={require('../../../assets/trolley.png')}
            >
              <Image
                source={require("../../../assets/trolley.png")}
                style={{ width: 20, height: 20, tintColor }}
                resizeMode="contain"
              />
            </Marker>
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
        <MapView
          style={styles.mapStyle}
          initialRegion={initialPosition}
          provider={PROVIDER_GOOGLE}
        >
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
