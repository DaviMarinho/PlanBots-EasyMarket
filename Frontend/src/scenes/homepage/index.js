import React from 'react'
import { StyleSheet, View } from 'react-native';
import Header from '../../components/header';
import Navbar from '../../components/navbar';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header />
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  teste: {
    backgroundColor: 'blue'
  }
});

export default HomePage;
