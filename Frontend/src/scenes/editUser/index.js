import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ToastAndroid } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { updateUser } from '../../services/apiservices';
import { validateEmail, validatePhone, validatePassword } from '../../utils/validate';
import { useData } from '../../context/';

const editUser = ({ route, navigation }) => {
  const userID = route.params.id;
  const [email, setEmail] = useState(route.params.email);
  const [phone, setPhone] = useState(route.params.phone);
  const [cpf, setCPF] = useState(route.params.cpf);
  const [password, setPassword] = useState();
  const { setUserData } = useData();

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
    updateUser(userID, email, cpf, phone, password)
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
          <Ionicons name="person" style={styles.icon} size={80} />
        </View>
        <View style={styles.inputs}>
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
            placeholder="(DDD) Telefone"
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
          <Button title="Editar" onPress={() => updateUserData()} />
        </View>
      </View>
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