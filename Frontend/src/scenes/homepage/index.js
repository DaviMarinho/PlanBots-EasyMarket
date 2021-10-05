import React from 'react'
import { StyleSheet, StatusBar, View, Text, Button, TextInput } from 'react-native';
import Navbar from '../../components/navbar';
import Top from '../../components/header';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Ola" onPress={() => navigation.navigate('showStore')}>EasyMarket!</Button>
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
