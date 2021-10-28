import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, ToastAndroid } from 'react-native';
import { loginUser, getStoreData } from '../../services/apiservices';
import { useData } from '../../context/';
import InputField from '../../components/inputField';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userData, setUserData, setStoreData, storeData, showNav, setShowNav } = useData();

  useEffect(() => {
    setShowNav(false);
  }, [showNav, userData]);

  const getStoreDataFromAPI = (storeID) => {
    getStoreData(storeID)
      .then((r) => {
        setStoreData(r.data);
      });
  };

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

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Entrar</Text>
        <View style={styles.inputs}>
          <InputField title="Email" placeholder="Email" text={email} setText={setEmail} large="90%" />
          <InputField title="Senha" placeholder="********" text={password} setText={setPassword} large="90%" password={true} />
        </View>
        <View style={styles.button}>
          <Button onPress={() => login()} color='rgb(74,134,232)' title="Entrar" />
        </View>
        <View style={styles.additionalOptions}>
          <Text style={styles.additionalOptionsText}>
            Ainda não possui conta?
          </Text>
          <Text style={styles.newAccount} onPress={() => navigation.navigate('register')}>
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
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'rgb(74,134,232)',
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: '10%',
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
    marginLeft: "10%",
    paddingRight: 12,
    paddingLeft: 12,
  },
  additionalOptions: {
    marginTop: "20%",
    marginBottom: 12,
    alignItems: 'center',
  },
  newAccount: {
    marginBottom: 6,
    fontSize: 16,
    padding: 6,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  additionalOptionsText: {
    fontWeight: 'bold',
    marginTop: 6,
    fontSize: 16,
    padding: 6,
    color: "#000",
  },
  button: {
    alignItems: 'center',
    marginTop: '5%',
  }
});

export default Login;