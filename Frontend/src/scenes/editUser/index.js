import React, { useState, useEffect } from 'react'
import { StyleSheet, StatusBar, View, Text, Button, TextInput, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../../components/navbar';
import Header from '../../components/header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { updateUser } from '../../services/apiservices';
import { validateEmail, validatePhone, validatePassword } from '../../utils/validate';

const editUser = () => {
  const [userID, setUserID] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [cpf, setCPF] = useState();
  const [password, setPassword] = useState();

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      const data = JSON.parse(value);
      setUserID(data._id);
      setEmail(data.email);
      setPhone(data.phone);
      setCPF(data.cpf);
    } catch (e) {
      console.error(e);
    }
  }

  const updateUserData = async () => {
    if (!validatePassword(password)) {
      ToastAndroid.show("Senha muito curta.", ToastAndroid.LONG);
      return;
    }
    if (!validateEmail(email)) {
      ToastAndroid.show("Email invalido.", ToastAndroid.LONG);
      return;
    }
    if (!validatePhone(phone)) {
      ToastAndroid.show("Telefone invalido. Utilize o formato DDD+Telefone (celular).", ToastAndroid.LONG);
      return;
    }
    await updateUser(userID, email, cpf, phone, password)
      .then(async (r) => {
        try {
          const value = JSON.stringify(r.data);
          await AsyncStorage.setItem("@storage_Key", value);
          navigation.navigate('home');
        } catch (e) {
          console.error(e);
        }
      });
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.iconView}>
          <Ionicons name="person" style={styles.icon} size={80} />
        </View>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
        <Text style={styles.label}>CPF:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCPF}
          value={cpf}
          editable={false}
          placeholder="CPF"
          maxLength={11}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Telefone:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPhone}
          value={phone}
          placeholder="(DDD) + Telefone"
          keyboardType="numeric"
          maxLength={11}
        />
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Senha"
          secureTextEntry={true}
        />
        <View style={styles.button}>
          <Button title="Editar" onPress={() => updateUserData()} />
        </View>
      </View>
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  iconView: {
    alignItems: 'center',
  },
  icon: {
    color: 'rgb(117,136,236)',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8
  },
  inputs: {
    paddingRight: 12,
    paddingLeft: 12,
  },
  button: {
    alignItems: 'center',
  }
});

export default editUser;