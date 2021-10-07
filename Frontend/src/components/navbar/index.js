import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ToastAndroid, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useData } from '../../context/';

const Navbar = () => {
  const navigation = useNavigation();
  const { userData } = useData();

  return (
    <View style={styles.container}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            if (userData) {
              navigation.navigate('editUser', {
                id: userData._id,
                email: userData.email,
                cpf: userData.cpf,
                phone: userData.phone
              });
            } else {
              navigation.navigate('login')
            }
          }}
        >
          <Ionicons
            name="person"
            size={30}
            color="#FFF"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.navigate('home')}
        >
          <Ionicons
            name="home"
            size={30}
            color="#FFF"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            if (userData) {
              if (userData.storeID === '') {
                navigation.navigate('showStore');
              } else {
                navigation.navigate('storePage');
              }
            } else {
              ToastAndroid.show("Para visualizar/cadastrar uma loja realize seu login", ToastAndroid.LONG);
              navigation.navigate('login');
            }
          }}
        >
          <Feather
            name="shopping-bag"
            size={30}
            color="#FFF"
          />
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgb(117,136,236)',
    bottom: 0,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
  icon: {
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    width: `${100 / 3}%`,
  }
});


export default Navbar;