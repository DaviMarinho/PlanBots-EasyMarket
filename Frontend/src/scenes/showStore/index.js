import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const showStore = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>
          Sua Loja
        </Text>
        <Text style={styles.subtext}>
          Você ainda não abriu nenhuma loja, clique no botão abaixo para começar a montar sua primeira loja.
        </Text>
        <AntDesign name="pluscircleo" size={50} color={styles.header.color} onPress={() => navigation.navigate('createStore')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'rgb(74,134,232)',
    paddingTop: 12,
    paddingBottom: 12,
  },
  subtext: {
    textAlign: 'center',
    color: 'rgb(74,134,232)',
    fontSize: 17,
    padding: 16,
  },
  content: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
  }
});

export default showStore;