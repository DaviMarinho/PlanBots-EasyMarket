import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useData } from "../../context";
import AntDesign from "react-native-vector-icons/AntDesign";

const Header = () => {
  const { userClean, getStoreLocations, userData } = useData();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoA}>Easy</Text>
        <Text style={styles.logoB}>Market</Text>
      </View>

      {userData && (
        <View style={styles.icons}>
          <TouchableOpacity
            onPress={() => {
              getStoreLocations();
              navigation.navigate("home");
            }}
          >
            <AntDesign name="reload1" size={30} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              userClean();
              navigation.navigate("login");
            }}
          >
            <MaterialIcons name="exit-to-app" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(74,134,232)",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 60,
    paddingBottom: 15,
  },
  logoA: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#ECB353",
  },
  logoB: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFF",
  },
  logo: {
    flex: 1,
    flexDirection: "row",
  },
  icons: {
    flexDirection: "row",
    width: 70,
    justifyContent: "space-between",
  },
});

export default Header;
