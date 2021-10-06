import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="red" />
      </View>
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
