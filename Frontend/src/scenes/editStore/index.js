import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  Image
} from "react-native";
import { updateStore } from "../../services/apiservices";
import { useData } from "../../context/";
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import InputField from '../../components/inputField';

const editStore = ({ navigation }) => {
  const { storeData, setStoreData, showNav, setShowNav } = useData();
  const storeID = storeData._id;
  const [storeName, setStoreName] = useState(storeData.storeName);
  const [storeDescription, setStoreDescription] = useState(storeData.storeDescription);
  const [storeImage, setStoreImage] = useState(storeData.storeImage);

  const editarLoja = () => {
    if (storeName.length <= 4) {
      ToastAndroid.show(
        "Nome da loja muito pequeno. Insira pelo menos 5 caracteres.",
        ToastAndroid.LONG
      );
      return;
    }
    updateStore(storeID, storeName, storeDescription, storeImage).then((r) => {
      setStoreData(r.data);
      navigation.navigate("home");
    });
  };

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
          <Button onPress={() => editarLoja()} color='rgb(74,134,232)' title="Editar loja" />
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
  inputs: {
    paddingRight: 12,
    paddingLeft: 12,
  },
  button: {
    alignItems: "center",
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

export default editStore;
