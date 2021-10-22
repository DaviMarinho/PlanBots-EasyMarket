import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Image, ToastAndroid } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { updateUser } from '../../services/apiservices';
import { validateEmail, validatePhone, validatePassword } from '../../utils/validate';
import { useData } from '../../context/';
import InputField from '../../components/inputField';
import * as ImagePicker from 'expo-image-picker';

const editUser = ({ route, navigation }) => {
  const userID = route.params.id;
  const [email, setEmail] = useState(route.params.email);
  const [phone, setPhone] = useState(route.params.phone);
  const [cpf, setCPF] = useState(route.params.cpf);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(route.params.image);
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
    updateUser(userID, email, cpf, phone, password, image)
      .then((r) => {
        try {
          setUserData(r.data);
          navigation.navigate('home');
        } catch (e) {
          console.error(e);
        }
      });
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(`data:image/png;base64,${result.base64}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconView}>
        {image ? <Image source={{ uri: image}} style={{ width: 200, height: 200, borderRadius: 100 }} onPress={pickImage} /> : <Ionicons name="person-circle-outline" size={175} style={styles.icon} onPress={pickImage} />}
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