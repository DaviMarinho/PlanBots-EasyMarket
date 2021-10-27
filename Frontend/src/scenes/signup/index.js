import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ToastAndroid } from 'react-native';
import { registerUser } from '../../services/apiservices';
import InputField from '../../components/inputField';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCPF] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registrar = () => {
    const dict = {
      email: 'email',
      phone: 'telefone',
      cpf: 'cpf'
    }
    registerUser(email, phone, cpf, password)
      .then((r) => {
        if (r.duplicated) {
          ToastAndroid.show(`${dict[Object.keys(r.duplicated)[0]]} ja cadastrado.`, ToastAndroid.SHORT);
        } else {          
          ToastAndroid.show('Cadastro realizado com sucesso.', ToastAndroid.SHORT);
          navigation.navigate('home');
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Cadastro</Text>
        <View style={styles.inputs}>
          <InputField title="Email*" placeholder="Email" text={email} setText={setEmail} large="90%" />
          <InputField title="Telefone*" placeholder="(99) 99999-9999" text={phone} setText={setPhone} large="90%" type="numeric" max={11}/>
          <InputField title="CPF*" placeholder="___.___.___-__" text={cpf} setText={setCPF} large="90%" type="numeric" max={11}/>
          <InputField title="Senha*" placeholder="********" text={password} setText={setPassword} large="90%" password={true} />
          <InputField title="Confirmar Senha*" placeholder="********" text={confirmPassword} setText={setConfirmPassword} large="90%" password={true} />
        </View>
        <View style={styles.button}>
          <Button color='rgb(74,134,232)' onPress={() => registrar()} title="Cadastrar" />
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
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'rgb(74,134,232)',
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
    borderRadius: 8,
  },
  inputs: {
    paddingRight: 12,
    paddingLeft: 12,
    alignItems: 'center',
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