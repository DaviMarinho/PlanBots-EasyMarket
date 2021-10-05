import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ToastAndroid } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navbar = () => {
  const navigation = useNavigation();
  const [userdata, setUserdata] = useState();

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      setUserdata(JSON.parse(value));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Ionicons name="person" size={30} color="#FFF" onPress={() => navigation.navigate('login')} />
      <Ionicons name="home" size={30} color="#FFF" onPress={() => navigation.navigate('home')} />
      <Feather name="shopping-bag" size={30} color="#FFF" onPress={() => {
        console.log(userdata);
        if (userdata) {
          if (userdata.storeID === '') {
            navigation.navigate('showStore');
          } else {
            console.log('teste');
          }
        } else {
          ToastAndroid.show("Para visualizar/cadastrar uma loja realize seu login", ToastAndroid.LONG);
          navigation.navigate('login');
        }
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'rgb(117,136,236)',
    bottom: 0,
    width: '100%',
    position: 'absolute',
    paddingTop: 16,
    paddingBottom: 16,
  },
});


export default Navbar;