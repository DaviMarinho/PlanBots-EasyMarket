import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import Navbar from '../../components/navbar';
import Header from '../../components/header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const UserAccountScreen = (props) => {

  const navigation = useNavigation();

  const [userName, setUserName] = useState('teste');
  const [userPhone, setUserPhone] = useState('(61) 940028922');
  const [userEmail, setUserEmail] = useState('teste@gmail.com');
  const [userCPF, setUserCPF] = useState('123.456.890.61');
  const [userImage, setUserImage] = useState();

  const getUserdata = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      setUserName(JSON.parse(value).username);
      setUserPhone(JSON.parse(value).phone);
      setUserEmail(JSON.parse(value).email);
      setUserCPF(JSON.parse(value).cpf);
      // setUserImage(JSON.parse(value).username);

    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getUserdata();
  }, []);

  const renderPhoto = () => {
    if(userImage == null) {
      return <Ionicons name="person-circle-outline" size={120} color="#4A86E8" />
    }

    else {
      return <Text>teste</Text>
    }
  }

  return (
    <View style={style.container} keyboardShouldPersistTaps='handled'>
      <View style={style.teste}>
        {renderPhoto()}
        <Ionicons onPress={() => {navigation.navigate("editUser")}} name="create-outline" size={30} color="#4A86E8" style={{ position: "absolute", right: 0, top: 25 }} />
      </View>
      <Text style={style.textName}>{userName}</Text>

      <View style={{ alignSelf: 'center', width: '100%' }}>

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
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
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
