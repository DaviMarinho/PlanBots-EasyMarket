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
import { Picker } from "@react-native-picker/picker";
import { getDistance } from 'geolib';

const HomePage = ({ navigation }) => {
  const [initialPosition, setInitialPosition] = useState(null);
  const [radius, setRadius] = useState(500);
  const [storeType, setStoreType] = useState("sem filtro");
  const { markers, getStoreLocations, userData, setShowNav, showNav } = useData();

  useEffect(() => {
    setShowNav(true);
  }, [showNav, userData]);

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
      if (storeType === "sem filtro") {
        return markers.map((marker, idx) => {
          if (marker.storeLatitude && marker.storeLongitude) {
            if (getDistance({ latitude: initialPosition.latitude, longitude: initialPosition.longitude }, { latitude: marker.storeLatitude, longitude: marker.storeLongitude }) <= radius) {
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
          }
        });
      }
      return markers.map((marker, idx) => {
        if (marker.storeLatitude && marker.storeLongitude) {
          // remover depois que todas as lojas estejam usando o storeLatitude e storeLongitude
          let tintColor = userData
            ? userData.storeID === marker._id
              ? "red"
              : "rgb(74,134,232)"
            : "rgb(74,134,232)";

          if (getDistance({ latitude: initialPosition.latitude, longitude: initialPosition.longitude }, { latitude: marker.storeLatitude, longitude: marker.storeLongitude }) <= radius) {
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
      <View style={styles.topView}>
        <View style={styles.categoryPickerView}>
          <Picker
            style={styles.categoryPicker}
            selectedValue={storeType}
            onValueChange={(itemValue) => setStoreType(itemValue)}
          >
            <Picker.Item
              label="Tipo de loja"
              value="sem filtro"
              color="#9A9A9A"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Artesanato"
              value="ARTESANATO"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Bebida"
              value="BEBIDA"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Diversos"
              value="DIVERSOS"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Doce"
              value="DOCE"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Marmita"
              value="MARMITA"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Salgado"
              value="SALGADO"
              style={styles.pickerItem}
            />
          </Picker>
        </View>
        <View style={styles.radiusPickerView}>
          <Picker
            style={styles.radiusPicker}
            selectedValue={radius}
            onValueChange={(itemValue) => setRadius(itemValue)}
          >
            <Picker.Item
              label="500 m"
              value={500}
              style={styles.pickerItem}
            />
            <Picker.Item
              label="1 km"
              value={1000}
              style={styles.pickerItem}
            />
            <Picker.Item
              label="1,5 km"
              value={1500}
              style={styles.pickerItem}
            />
            <Picker.Item
              label="2 km"
              value={2000}
              style={styles.pickerItem}
            />
            <Picker.Item
              label="3 km"
              value={3000}
              style={styles.pickerItem}
            />
            <Picker.Item
              label="5 km"
              value={5000}
              style={styles.pickerItem}
            />
          </Picker>
        </View>
      </View>
      {initialPosition ? (
        <MapView
          style={styles.mapStyle}
          initialRegion={initialPosition}
          provider={PROVIDER_GOOGLE}
        >
          {renderMarkers()}
          <Circle
            radius={radius}
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
  topView: {
    width: '100%',
    height: '13%',
    backgroundColor: "rgb(74,134,232)",
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5%',
  },
  categoryPicker: {
    width: "110%",
    marginLeft: "-3%",
  },
  radiusPicker: {
    width: "125%",
    marginLeft: "-3%",
  },
  categoryPickerView: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    padding: 10,
    borderRadius: 8,
    width: "65%",
    backgroundColor: '#FFF',
  },
  radiusPickerView: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    padding: 10,
    borderRadius: 8,
    width: "30%",
    backgroundColor: '#FFF',
  },
  pickerItem: {
    fontSize: 14,
  },
});

export default HomePage;
