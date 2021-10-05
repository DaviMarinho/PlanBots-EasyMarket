import React from 'react'
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import Navbar from '../../components/navbar';
import Top from '../../components/header';
import AntDesign from 'react-native-vector-icons/AntDesign';

const showStore = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Top />
      <View style={styles.content}>
        <Text style={styles.header}>
          Sua Loja
        </Text>
        <Text style={styles.subtext}>
          Você ainda não abriu nenhuma loja, clique no botão abaixo para começar a montar sua primeira loja.
        </Text>
        <AntDesign name="pluscircleo" size={50} color={styles.header.color} />
      </View>
      <Navbar navigation={navigation} />
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
    color: 'rgb(117,136,236)',
    paddingTop: 12,
    paddingBottom: 12,
  },
  subtext: {
    textAlign: 'center',
    color: 'rgb(117,136,236)',
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