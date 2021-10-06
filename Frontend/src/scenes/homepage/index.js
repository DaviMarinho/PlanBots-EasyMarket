import React from 'react';
import { StyleSheet, View } from 'react-native';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
  },
  teste: {
    backgroundColor: 'blue'
  }
});

export default HomePage;
