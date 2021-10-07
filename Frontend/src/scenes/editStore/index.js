import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ToastAndroid } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { updateStore } from '../../services/apiservices';
import { useData } from '../../context/';

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
    updateStore(storeID, storeName, storeDescription)
      .then((r) => {
        setStoreData(r.data)
        navigation.navigate('home');
      });
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

export default editStore;