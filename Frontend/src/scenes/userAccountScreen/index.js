import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useData } from '../../context/';

const UserAccountScreen = ({route, navigation}) => {

  const reqNavigation = useNavigation();
  const { userData, setUserData } = useData();
  const userID = route.params.id;
  const [userName, setUserName] = useState('Perfil');
  const [userPhone, setUserPhone] = useState(route.params.phone);
  const [userEmail, setUserEmail] = useState(route.params.email);
  const [userCPF, setUserCPF] = useState(route.params.cpf);
  const [userImage, setUserImage] = useState(route.params.image);

  const renderPhoto = () => {

    if (userData.image == null) {
      return <Ionicons name="person-circle-outline" size={120} color="#4A86E8" />
    }

    else {
      return <Image source={{ uri: userData.image }} style={{ width: 100, height: 100, borderRadius: 50 }} />
    }
  }

  return (
    <View style={style.container}>
      <ScrollView>

        <View style={style.teste}>
          {renderPhoto()}
          <Ionicons onPress={() => { reqNavigation.navigate("editUser", {
              id: userID,
              email: userEmail,
              cpf: userCPF,
              phone: userPhone
            }) }} name="create-outline" size={30} color="#4A86E8" style={{ position: "absolute", right: 0, top: 25 }} />
        </View>

        <View style={{ alignSelf: 'center', width: '100%' }}>

          <Text style={style.textName}>{userName}</Text>

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
    flex: 1
  },
  teste: {
    padding: 20,
    alignItems: 'center',
    width: 150,
    alignSelf: "center",
  },
  input: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8
  },
  icon: {
    color: '#4A86E8'
  },
  textName: {
    fontSize: 30,
    textAlign: 'center',
    color: '#4A86E8',
    fontWeight: 'bold'
  },
  line: {
    backgroundColor: 'black',
    height: 1,
    width: '90%',
    margin: 10,
    alignSelf: 'center'
  },
  dataInput: {
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
  label: {
    fontWeight: 'bold',
    color: '#4A86E8',
    fontSize: 24,
    margin: 10,
  },
  textformat: {
    margin: 10,
    fontSize: 18,
  }

})

export default UserAccountScreen;
