import React from 'react'
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Ionicons name="person" size={30} color="#FFF" />
      <Ionicons name="home" size={30} color="#FFF" onPress={() => navigation.navigate('home')} />
      <Feather name="shopping-bag" size={30} color="#FFF" onPress={() => navigation.navigate('create_store')}/>
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