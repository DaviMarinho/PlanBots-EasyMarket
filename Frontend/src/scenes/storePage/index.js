import React, { useState, useEffect } from 'react'
import { StyleSheet, StatusBar, View, Text, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../../components/navbar';
import Header from '../../components/header';
import { getStoreData } from '../../services/apiservices';
import AntDesign from 'react-native-vector-icons/AntDesign';

const storePage = () => {
  const [storeName, setStoreName] = useState();
  const [storeDescription, setStoreDescription] = useState();

  const getStoreDataFromAPI = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      const userStoreID = JSON.parse(value).storeID;
      getStoreData(userStoreID)
        .then((r) => {
          setStoreName(r.data.storeName);
          setStoreDescription(r.data.storeDescription);
        });
    } catch (e) {
      console.error(e);
    }
    getStoreData()
  }

  useEffect(() => {
    getStoreDataFromAPI();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.data}>{storeName}</Text>
        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.data}>{storeDescription}</Text>
        <View style={styles.hr} />
      </View>
      <View style={styles.centralize}>
        <Text style={styles.label}>Produtos</Text>
      </View>
      <View style={styles.centralize}>
        <AntDesign name="pluscircleo" size={50} style={{ color: 'rgb(117,136,236)'}} onPress={() => navigation.navigate('createStore')} />
      </View>
      <Navbar />
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
  label: {
    fontSize: 24,
    fontWeight: "bold",
    color: 'rgb(117,136,236)',
  },
  data: {
    fontSize: 18,
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  centralize: {
    alignItems: 'center',
  },
});

export default storePage;