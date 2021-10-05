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

const UserAccountScreen = (props) => {

  const [userName, setUserName] = useState('teste');
  const [userPhone, setUserPhone] = useState('(61) 940028922');
  const [userEmail, setUserEmail] = useState('teste@gmail.com');
  const [userCPF, setUserCPF] = useState('123.456.890.61');

  return (
    <View style={style.container} keyboardShouldPersistTaps='handled'>
      <Header />
      <View style={style.teste}>
        <Ionicons name="person-circle-outline" size={120} color="#4A86E8" />
        <Ionicons name="create-outline" size={30} color="#4A86E8" style={{ position: "absolute", right: 100, top: 25 }} />
      </View>
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
      <Navbar />
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
    fontFamily: 'Inter',
    color: '#4A86E8',
    fontWeight: 'bold'
  },
  line: {
    backgroundColor: 'black',
    height: 1,
    width: 380,
    margin: 10
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
