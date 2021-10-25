import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ToastAndroid } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { updateUser } from '../../services/apiservices';
import { validateEmail, validatePhone, validatePassword } from '../../utils/validate';
import { useData } from '../../context/';
import InputField from '../../components/inputField';

const editUser = ({ navigation }) => {
  const { userData, setUserData } = useData();
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  const [cpf, setCPF] = useState(userData.cpf);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState('');

  const updateUserData = () => {
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
    updateUser(userData._id, email, cpf, phone, password)
      .then((r) => {
        try {
          setUserData(r.data);
          navigation.navigate('home');
        } catch (e) {
          console.error(e);
        }
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconView}>
          <Ionicons name="person-circle-outline" size={175} style={styles.icon} />
        </View>
        <View style={styles.inputs}>
          <InputField title="Email" placeholder="Email" text={email} setText={setEmail} large="90%" />
          <InputField title="Telefone" placeholder="(99) 99999-9999" text={phone} setText={setPhone} large="90%" type="numeric" max={11} />
          <InputField title="CPF" placeholder="___.___.___-__" text={cpf} setText={setCPF} large="90%" type="numeric" max={11} edit={false} />
          <InputField title="Alterar Senha" placeholder="********" text={password} setText={setPassword} large="90%" password={true} />
          <InputField title="Confirmar Nova Senha" placeholder="********" text={confirmPassword} setText={setConfirmPassword} large="90%" password={true} />
        </View>
        <View style={styles.button}>
          <Button title="Editar" onPress={() => updateUserData()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  content: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  iconView: {
    alignItems: 'center',
  },
  icon: {
    color: 'rgb(74,134,232)',
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
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
  }
});

export default editUser;