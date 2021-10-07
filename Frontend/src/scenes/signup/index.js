import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ToastAndroid, ActivityIndicator } from 'react-native';
import { registerUser } from '../../services/apiservices';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCPF] = useState('');
  const [password, setPassword] = useState('');

  const registrar = async () => {
    await registerUser(email, phone, cpf, password)
      .then((r) => r);
    ToastAndroid.show('Cadastro realizado com sucesso.', ToastAndroid.SHORT);
    navigation.navigate('home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Cadastro</Text>
        <View style={styles.inputs}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            autoCompleteType="email"
          />
          <Text style={styles.label}>Telefone:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPhone}
            value={phone}
            placeholder="(DDD) Telefone"
            keyboardType="numeric"
            maxLength={11}
          />
          <Text style={styles.label}>CPF:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setCPF}
            value={cpf}
            placeholder="CPF"
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
        </View>
        <View style={styles.button}>
          <Button color='rgb(117,136,236)' onPress={() => registrar()} title="Cadastrar" />
        </View>
        <View style={styles.additionalOptions}>
          <Text style={styles.additionalOptionsText} onPress={() => navigation.navigate('login')}>
            Realizar login
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

export default Signup;