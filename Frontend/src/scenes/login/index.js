import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import Navbar from '../../components/navbar';
import Header from '../../components/header';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.header}>Login</Text>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Email"
        />
        <Text>Senha:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Senha"
        />
        <View>
          <Text>
            Esqueci minha senha
          </Text>
          <Text>
            Criar conta
          </Text>
        </View>
        <Button title="Entrar" />
      </View>
      <Navbar />
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
  label: {
    textAlign: 'left',
    alignItems: 'flex-start',
  },
  content: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '90%',
  },
});

export default Login;