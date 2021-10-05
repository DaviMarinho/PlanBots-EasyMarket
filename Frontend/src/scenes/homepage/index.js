import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { StyleSheet, StatusBar, View, Text, Button, TextInput } from 'react-native';
import Navbar from '../../components/navbar';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Ola" onPress={() => navigation.navigate('showStore')}>EasyMarket!</Button>
      <Button title="Limpar" onPress={() => AsyncStorage.clear()}></Button>
      <StatusBar style="auto" />
      <View style={styles.teste}>
        <Text>Oi</Text>
      </View>
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teste: {
    backgroundColor: 'blue'
  }
});

export default HomePage;
