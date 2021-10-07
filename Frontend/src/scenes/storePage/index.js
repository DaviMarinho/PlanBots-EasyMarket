import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStoreData, createProduct, addProductToStore } from '../../services/apiservices';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CreateButton from '../../components/createButton';
import Modal from 'react-native-modal';

const storePage = ({ navigation }) => {
  const [userdata, setUserdata] = useState();
  const [storeName, setStoreName] = useState();
  const [storeDescription, setStoreDescription] = useState();
  const [modalVisibility, setModalVisibility] = useState(false);
  const [productName,  setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productID, setProductID] = useState('');
  const [storeID, setStoreID] = useState('');

  const getStoreDataFromAPI = async () => {
    await getStoreData(userdata.storeID)
      .then((r) => {
        setStoreName(r?.data?.storeName);
        setStoreDescription(r?.data?.storeDescription);
        setStoreID(r?.data?._id);
      });
  };

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user_Data');
      setUserdata(JSON.parse(value));
    } catch (e) {
      console.error(e);
    };
  }

  const createNewProduct = async () => {
    await createProduct(productName, productDescription, productCategory, true, productPrice)
      .then((r) =>{
        setProductID(r?.data?._id);
      });
  }

  const addNewProductToStore = async () => {
    await addProductToStore(productID, storeID)
      .then(() => ToastAndroid.show('Cadastro realizado com sucesso.', ToastAndroid.SHORT))
  }

  const addProduct = () => {
    createNewProduct();
    addNewProductToStore();
    setModalVisibility(false);
  }

  useEffect(() => {
    if (userdata) {
      getStoreDataFromAPI();
    }
  }, [userdata]);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Modal isVisible={modalVisibility} onBackdropPress={() => setModalVisibility(false)} avoidKeyboard={false}>
        <View style={styles.modalContainer}>
          <Text style={styles.pageTitle}>
            Adicionar novo produto
                </Text>
          <View style={styles.inputView}>
            <Text style={styles.inputLabel}>Nome do produto*</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do produto"
              onChangeText={setProductName}
              value={productName}
            />
            <Text style={styles.inputLabel}>Categoria do produto*</Text>
            <TextInput
              style={styles.input}
              placeholder="Categoria do produto"
              onChangeText={setProductCategory}
              value={productCategory}
            />
            <Text style={styles.inputLabel}>Preço*</Text>
            <TextInput
              style={styles.input}
              placeholder="R$ 00.00"
              onChangeText={setProductPrice}
              value={productPrice}
            />
            <Text style={styles.inputLabel}>Descrição*</Text>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Descrição"
              multiline={true}
              onChangeText={setProductDescription}
              value={productDescription}
            />
          </View>
          <CreateButton create={addProduct} text='Cadastrar produto' />
        </View>
      </Modal>  
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
            onPress={() => setModalVisibility(true)} // abrir modal
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
  },
  
  modalContainer: {
    position: 'absolute',
    width: '100%',
    height: 445,
    backgroundColor: 'white',
    borderRadius: 10,
  },

  pageTitle: {
    textAlign: 'center',
    color: 'rgb(117,136,236)',
    fontSize: 22,
    padding: 16,
    fontWeight: 'bold',
  },

  inputView: {
    marginLeft: '10%',
    width: '100%',
    alignItems: 'flex-start',
  },

  input: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    width: '80%',
  },

  inputLabel: {
    fontSize: 14,
    backgroundColor: '#FFF',
    marginBottom: -22,
    marginLeft: '3%',
    fontWeight: 'bold',
    color: '#000',
    elevation: 0.1,
    alignItems: 'center',
    padding: 1,
  },

  descriptionInput: {
    width: '80%',
    height: 100,
    marginTop: 12,
    marginBottom: 24,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    textAlignVertical: 'top',
  },
});

export default storePage;