import React from "react";
import { View, ScrollView, StyleSheet, Text, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useData } from "../../context/";

const UserAccountScreen = ({ navigation }) => {
  const { userData } = useData();
  const userID = userData._id;
  const userPhone = userData.phone;
  const userEmail = userData.email;
  const userCPF = userData.cpf;

  const renderPhoto = () => {
    if (userData.image == null) {
      return (
        <Ionicons name="person-circle-outline" size={120} color="#4A86E8" />
      );
    }
    return (
      <Image
        source={{ uri: userData.image }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
    );
  };

  return (
    <View style={style.container}>
      <ScrollView>
        <View style={style.teste}>
          {renderPhoto()}
          <Ionicons
            onPress={() => {
              navigation.navigate("editUser");
            }}
            name="create-outline"
            size={30}
            color="#4A86E8"
            style={{ position: "absolute", right: 0, top: 25 }}
          />
        </View>

        <View style={{ alignSelf: "center", width: "100%" }}>
          <Text style={style.textName}>Perfil</Text>

          <View style={style.line} />

          <View style={style.dataInput}>
            <Text style={style.label}>Contato</Text>
            <Text style={style.textformat}>{userPhone}</Text>
          </View>

          <View style={style.line} />

          <View style={style.dataInput}>
            <Text style={style.label}>Email</Text>
            <Text style={style.textformat}>{userEmail}</Text>
          </View>

          <View style={style.line} />

          <View style={style.dataInput}>
            <Text style={style.label}>CPF</Text>
            <Text style={style.textformat}>{userCPF}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  teste: {
    padding: 20,
    alignItems: "center",
    width: 150,
    alignSelf: "center",
  },
  input: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  icon: {
    color: "#4A86E8",
  },
  textName: {
    fontSize: 30,
    textAlign: "center",
    color: "#4A86E8",
    fontWeight: "bold",
  },
  line: {
    backgroundColor: "black",
    height: 1,
    width: "90%",
    margin: 10,
    alignSelf: "center",
  },
  dataInput: {
    alignSelf: "flex-start",
    marginLeft: 15,
  },
  label: {
    fontWeight: "bold",
    color: "#4A86E8",
    fontSize: 24,
    margin: 10,
  },
  textformat: {
    margin: 10,
    fontSize: 18,
  },
});

export default UserAccountScreen;
