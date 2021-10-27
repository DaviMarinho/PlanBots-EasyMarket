import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { registerStore } from '../../services/apiservices';
import { useData } from '../../context/';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InputField from '../../components/inputField';
import * as ImagePicker from 'expo-image-picker';
import Navbar from '../../components/navbar';

const createStore = ({ navigation }) => {
  const [storeName, setStoreName] = useState('');
  const [storeDescription, setStoreDescription] = useState('');
  const { userData, setStoreData, setUserData } = useData();
  const [storeImage, setStoreImage] = useState(null);

  const cadastrarLoja = () => {
    try {
      registerStore(storeName, storeDescription, userData._id, storeImage)
        .then((r) => {
          setStoreData(r.data);
          setUserData({
            ...userData,
            storeID: r.data._id
          });
          ToastAndroid.show('Loja criada com sucesso.', ToastAndroid.SHORT);
          navigation.navigate('home');
        });

    } catch (e) {
      console.error(e);
      return;
    }
  }

  const pickStoreImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setStoreImage(`data:image/png;base64,${result.base64}`);
      // setStoreData(storeData);
    }
  };

  const renderStoreImage = () => {
    if (storeImage == null) {
      return (
        <View style={styles.imageField}>
        <AntDesign
          name="pluscircleo"
          size={50}
          style={{ color: '#FFF', marginTop: '5%' }}
          onPress={pickStoreImage}
        />
        <Text style={styles.ImageText}>Adicionar imagem da loja</Text>
        <Text style={styles.imageSubtext}>(opcional)</Text>
      </View>
      )
    }
    else {
      return (
        <TouchableOpacity onPress={pickStoreImage}>
          <Image source={{ uri: storeImage }} style={{ height: 200, width: '100%' }} /> 
        </TouchableOpacity>
      )
    }
  }

  return (
    <View style={styles.container}>
      {renderStoreImage()}
      <View style={styles.content}>
        <View style={styles.inputs}>
          <InputField title="Nome da loja*" placeholder="Nome da loja" setText={setStoreName} text={storeName} large="80%" />
          <Text style={styles.inputLabel}>Descrição*</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Descrição*"
            multiline={true}
            onChangeText={setStoreDescription}
            value={storeDescription}
          />
        </View>
        <View style={styles.button}>
          <Button onPress={() => cadastrarLoja()} color='rgb(74,134,232)' title="Criar loja" />
        </View>
      </View>
      <Navbar/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 32,
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
    borderRadius: 8
  },
  inputLabel: {
    fontSize: 14,
    backgroundColor: '#FFF',
    marginBottom: -22,
    marginLeft: '3%',
    fontWeight: 'bold',
    color: '#000',
    elevation: 0.1,
    alignItems: 'center',
    padding: 1,
    alignSelf: 'flex-start',
},
  descriptionInput: {
    width: '80%',
    height: 100,
    marginTop: 12,
    marginBottom: 24,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    textAlignVertical: 'top',
  },
  inputs: {
    marginTop: '5%',
    width: '100%',
    marginLeft: "10%",
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
  },
  imageField: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#6E6E6E",
    width: "100%",
    height: "25%",
  },
  ImageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  imageSubtext: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default createStore;