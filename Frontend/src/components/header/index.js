import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.teste}>
        <Text style={styles.logoA}>Easy</Text>
        <Text style={styles.logoB}>Market</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(117,136,236)',
    height: 70,
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
  teste: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12
  }
});

export default Header;