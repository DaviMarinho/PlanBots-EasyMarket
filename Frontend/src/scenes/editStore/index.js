import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { updateStore } from "../../services/apiservices";
import { useData } from "../../context/";
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';

const editStore = ({ navigation, route }) => {
  const storeID = route.params.storeID;
  const [storeName, setStoreName] = useState(route.params.storeName);
  const [storeDescription, setStoreDescription] = useState(route.params.storeDescription);
  const { setStoreData } = useData();

  const updateStoreData = () => {
    if (storeName.length <= 4) {
      ToastAndroid.show("Nome da loja muito pequeno. Insira pelo menos 5 caracteres.", ToastAndroid.LONG);
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
      <View style={styles.content}>
        <View style={styles.iconView}>
          <FontAwesome5 name="store" style={styles.icon} size={80} />
        </View>
        <View style={styles.inputs}>
          <Text style={styles.label}>Nome da loja:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setStoreName}
            value={storeName}
            placeholder="Nome"
          />
          <Text style={styles.label}>Descrição da loja:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setStoreDescription}
            value={storeDescription}
            placeholder="Descrição"
          />
        </View>
        <View style={styles.button}>
          <Button title="Editar" onPress={() => updateStoreData()} />
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
  },
  button: {
    alignItems: 'center',
  }
});

export default editStore;