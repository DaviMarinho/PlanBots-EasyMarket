import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ToastAndroid, ActivityIndicator } from 'react-native';
import { loginUser, getStoreData } from '../../services/apiservices';
import { useData } from '../../context/';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userData, setUserData, setStoreData, storeData } = useData();

  const login = async () => {
    await loginUser(email, password)
      .then((r) => {
        if (r.data.message === 'user not found') {
          ToastAndroid.show("Email incorreto", ToastAndroid.SHORT);
          return;
        } else if (r.data.message === 'wrong password') {
          ToastAndroid.show("Senha incorreta", ToastAndroid.SHORT);
          return;
        }
        setUserData(r.data);
        if (r.data.storeID !== '') {
          getStoreDataFromAPI(r.data.storeID);
        }
        navigation.navigate('home');
      });
  };

  const getStoreDataFromAPI = (storeID) => {
    getStoreData(storeID)
      .then((r) => {
        setStoreData(r.data);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Login</Text>
        <View style={styles.inputs}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
          />
          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Senha"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.button}>
          <Button onPress={() => login()} color='rgb(117,136,236)' title="Entrar" />
        </View>
        <View style={styles.additionalOptions}>
          <Text style={styles.additionalOptionsText}>
            Esqueci minha senha
          </Text>
          <Text style={styles.additionalOptionsText} onPress={() => navigation.navigate('register')}>
            Criar conta
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'rgb(117,136,236)',
    paddingTop: 12,
    paddingBottom: 12,
  },
  content: {
    paddingTop: 12,
    paddingBottom: 12,
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
  additionalOptions: {
    marginTop: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  additionalOptionsText: {
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 6,
    fontSize: 16,
    padding: 6,
  },
  button: {
    alignItems: 'center',
  }
});

export default Login;