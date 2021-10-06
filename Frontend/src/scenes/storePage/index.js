import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStoreData } from '../../services/apiservices';
import AntDesign from 'react-native-vector-icons/AntDesign';

const storePage = ({ navigation }) => {
  const [userdata, setUserdata] = useState();
  const [storeID, setStoreID] = useState();
  const [storeName, setStoreName] = useState();
  const [storeDescription, setStoreDescription] = useState();

  const getStoreDataFromAPI = async () => {
    try {
      await getStoreData(storeID)
        .then((r) => {
          setStoreName(r.data.storeName);
          setStoreDescription(r.data.storeDescription);
        });
    } catch (e) {
      console.error(e);
    };
  };

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      setUserdata(JSON.parse(value));
      // setStoreID(userdata.storeID);
    } catch (e) {
      console.error(e);
    };
  }

  useEffect(() => {
    if (userdata) {
      console.log('userdata', userdata);
      getStoreDataFromAPI();
    }
  }, [userdata]);

  useEffect(() => {
    console.log(storeName, storeDescription);
    getUserData();
  }, []);

  console.log(storeName, storeDescription);

  return (
    <View style={styles.container}>
      {storeName && storeDescription ? (
        <View>
          <View style={styles.storeHeader}>
            <View>
              <Text style={styles.label}>Nome:</Text>
              <Text style={styles.data}>{storeName}</Text>
              <Text style={styles.label}>Descrição:</Text>
              <Text style={styles.data}>{storeDescription}</Text>
            </View>
            <AntDesign
              name="edit"
              size={30}
              style={{ color: 'rgb(117,136,236)' }}
              onPress={
                () => navigation.navigate('editStore', { storeID, name: storeName, description: storeDescription })
              } />
          </View>
          <View style={styles.hr} />
          <View style={styles.centralize}>
            <Text style={styles.label}>Produtos</Text>
          </View>
          <View style={styles.centralize}>
            <AntDesign name="pluscircleo" size={50} style={{ color: 'rgb(117,136,236)' }} onPress={() => navigation.navigate('createStore')} />
          </View>
        </View>
      ) : (
        <ActivityIndicator size="large" color="red" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  storeHeader: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 12,
    paddingLeft: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
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