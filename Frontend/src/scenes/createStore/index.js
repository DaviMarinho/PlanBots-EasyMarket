import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { registerStore } from '../../services/apiservices';
import AsyncStorage from '@react-native-async-storage/async-storage';

const createStore = ({ navigation }) => {
  const [storeName, setStoreName] = useState('');
  const [storeDescription, setStoreDescription] = useState('');

  const cadastrarLoja = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      const userId = JSON.parse(value)._id;
      await registerStore(storeName, storeDescription, userId)
        .then(async (r) => {
          try {
            const value = JSON.stringify(r.data);
            await AsyncStorage.setItem("@storage_Key", value);
          } catch (e) {
            console.error(e);
          }
        });
      navigation.navigate('home');
    } catch (e) {
      console.error(e);
      return;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Criar loja</Text>
        <View style={styles.inputs}>
          <Text style={styles.label}>Nome da Loja:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setStoreName}
            value={storeName}
            placeholder="Nome da loja"
          />
          <Text style={styles.label}>Descrição:</Text>
          <TextInput
            style={styles.descriptionInput}
            onChangeText={setStoreDescription}
            value={storeDescription}
            placeholder="Descrição"
            multiline={true}
          />
        </View>
        <View style={styles.button}>
          <Button onPress={() => cadastrarLoja()} color='rgb(117,136,236)' title="Criar loja" />
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
  descriptionInput: {
    height: 100,
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

export default createStore;