import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  ToastAndroid,
  Image,
} from "react-native";
import { registerUser } from "../../services/apiservices";
import InputField from "../../components/inputField";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useData } from '../../context/';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCPF] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const { setShowNav, showNav } = useData();

  useEffect(() => {
    setShowNav(false);
  }, [showNav]);


  const registrar = () => {
    const dict = {
      email: "email",
      phone: "telefone",
      cpf: "cpf",
    };
    if (password === confirmPassword) {
      registerUser(email, phone, cpf, password).then((r) => {
        if (r.duplicated) {
          ToastAndroid.show(
            `${dict[Object.keys(r.duplicated)[0]]} ja cadastrado.`,
            ToastAndroid.SHORT
          );
        } else {
          ToastAndroid.show(
            "Cadastro realizado com sucesso.",
            ToastAndroid.SHORT
          );
          navigation.navigate("home");
        }
      });
    } else {
      setPassword('');
      setConfirmPassword('');
      ToastAndroid.show("As senhas não correspondem.", ToastAndroid.SHORT);
    }
  };

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
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Cadastro</Text>
        <View style={styles.inputs}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200, borderRadius: 100 }}
              onPress={pickImage}
            />
          ) : (
            <Ionicons
              name="person-circle-outline"
              size={120}
              color="#4A86E8"
              onPress={pickImage}
            />
          )}
          <InputField
            title="Email*"
            placeholder="Email"
            text={email}
            setText={setEmail}
            large="90%"
          />
          <InputField
            title="Telefone*"
            placeholder="(99) 99999-9999"
            text={phone}
            setText={setPhone}
            large="90%"
            type="numeric"
            max={11}
          />
          <InputField
            title="CPF*"
            placeholder="___.___.___-__"
            text={cpf}
            setText={setCPF}
            large="90%"
            type="numeric"
            max={11}
          />
          <InputField
            title="Senha*"
            placeholder="********"
            text={password}
            setText={setPassword}
            large="90%"
            password={true}
          />
          <InputField
            title="Confirmar Senha*"
            placeholder="********"
            text={confirmPassword}
            setText={setConfirmPassword}
            large="90%"
            password={true}
          />
        </View>
        <View style={styles.button}>
          <Button
            color="rgb(74,134,232)"
            onPress={() => registrar()}
            title="Cadastrar"
          />
        </View>
        <View style={styles.additionalOptions}>
          <Text
            style={styles.additionalOptionsText}
            onPress={() => navigation.navigate("login")}
          >
            Voltar a tela de login
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    fontSize: 36,
    textAlign: "center",
    fontWeight: "bold",
    color: "rgb(74,134,232)",
    paddingTop: 12,
    paddingBottom: 12,
  },
  content: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  label: {
    fontWeight: "bold",
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
    alignItems: "center",
  },
  additionalOptions: {
    marginTop: "10%",
    marginBottom: 12,
    alignItems: "center",
  },
  additionalOptionsText: {
    marginBottom: 6,
    fontSize: 16,
    padding: 6,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  button: {
    alignItems: "center",
    marginTop: "5%",
  },
});

export default Signup;