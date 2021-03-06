import React from 'react';
import { StyleSheet, View, ToastAndroid, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useData } from '../../context/';

const Navbar = () => {
  const navigation = useNavigation();
  const { userData, storeData, setStoreData, showNav } = useData();

  return (
    (showNav ?
      (< View style={styles.container} >
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            if (userData) {
              navigation.navigate('perfil');
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
            if (userData && !storeData) {
              navigation.navigate('showStore');
            } else if (userData && storeData) {
              navigation.navigate('storePage');
              setStoreData(storeData);
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
      </View >) : <></>)
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgb(74,134,232)',
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