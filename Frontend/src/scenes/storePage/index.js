import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useData } from '../../context/';
import { deleteStore } from '../../services/apiservices';

const storePage = ({ navigation }) => {
  const { userData, storeData, setUserData, setStoreData } = useData();

  const deleteStoreFromAPI = () => {
    deleteStore(storeData._id)
    .then((r) => {
      const deletedStoreUser = userData;
      deletedStoreUser.storeID = '';
      setUserData(deletedStoreUser);
      setStoreData();
      navigation.navigate('home');
    })
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.storeHeader}>
          <View>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.data}>{storeData.storeName}</Text>
            <Text style={styles.label}>Descrição:</Text>
            <Text style={styles.data}>{storeData.storeDescription}</Text>
          </View>
          <View style={styles.icons}>
            <AntDesign
              name="edit"
              size={30}
              style={{ color: 'rgb(117,136,236)' }}
              onPress={() =>
                navigation.navigate('editStore', {
                  storeID: storeData._id,
                  storeName: storeData.storeName,
                  storeDescription: storeData.storeDescription
                })
              } />
            <FontAwesome
              name="trash-o"
              size={30}
              style={{ color: 'rgb(117,136,236)', marginLeft: 6 }}
              onPress={() => deleteStoreFromAPI()}
            />
          </View>

        </View>
        <View style={styles.hr} />
        <View style={styles.centralize}>
          <Text style={styles.label}>Produtos</Text>
        </View>
        <View style={styles.centralize}>
          <AntDesign
            name="pluscircleo"
            size={50}
            style={{ color: 'rgb(117,136,236)' }}
            onPress={() => console.log('criar produto')} // abrir modal
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    color: 'rgb(117,136,236)',
  },
  data: {
    fontSize: 18,
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  centralize: {
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
  }
});

export default storePage;