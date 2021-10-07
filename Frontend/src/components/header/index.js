import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useData } from '../../context/';

const Header = () => {
  const { userClean } = useData();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoA}>Easy</Text>
        <Text style={styles.logoB}>Market</Text>
      </View>
      <TouchableOpacity onPress={() => { userClean(); navigation.navigate('home'); }}>
        <MaterialIcons name="exit-to-app" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(117,136,236)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 60,
    paddingBottom: 15,
  },
  logoA: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ECB353'
  },
  logoB: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFF',
  },
  logo: {
    flex: 1,
    flexDirection: 'row',
  }
});

export default Header;