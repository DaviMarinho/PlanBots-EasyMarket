import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ToastAndroid, Switch } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useData } from '../../context/';
import { deleteStore, getProductByStore, createProduct, addProductToStore, changeStoreStatus } from '../../services/apiservices';
import CreateButton from '../../components/createButton';
import Modal from 'react-native-modal';

const storePage = ({ navigation }) => {
  const { userData, storeData, setUserData, setStoreData } = useData();
  const [modalVisibility, setModalVisibility] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productID, setProductID] = useState('');
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(storeData.open);

  console.log(storeData);

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

  const addProduct = async () => {
    await createProduct(productName, productDescription, productCategory, true, productPrice, storeData._id, '');
    setModalVisibility(false);
    ToastAndroid.show('Cadastro realizado com sucesso.', ToastAndroid.SHORT);
    getProductsDataFromAPI();
  };

  const getProductsDataFromAPI = () => {
    getProductByStore(storeData._id)
      .then((r) => {
        setProducts(r.data);
      });
  };

  const listProducts = () => {
    if (products.length > 0) {
      return (
        products.map((product, idx) => {
          return (
            <View style={styles.productCard} key={idx}>
              <View style={styles.hr} />
              <Text style={styles.productName}>
                {product.productName}
              </Text>
              <Text style={styles.productDescription}>
                {product.productDescription}
              </Text>
              <Text style={styles.productDescription}>
                R${product.price}
              </Text>
            </View>
          );
        })
      );
    };
  };

  useEffect(() => {
    getProductsDataFromAPI();
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
        <View style={styles.image}>
          <Text style={{ fontSize: 28 }}>Imagem</Text>
        </View>
        <View style={{ paddingLeft: 12, paddingRight: 12, marginTop: 12 }}>
          <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.storeName}>{storeData.storeName}</Text>
            <View style={{ alignItems: 'center' }}>
              <Text>Loja</Text>
              <Switch 
                onValueChange={() => {
                  changeStoreStatus(storeData._id, !isOpen);
                  setStoreData({
                    ...storeData,
                    open: !isOpen
                  });
                  setIsOpen(!isOpen);
                }}
                value={isOpen}
              />
            </View>
          </View>
          <Text style={styles.storeDescription}>{storeData.storeDescription}</Text>
          <View style={{ marginTop: 18 }}>
            {listProducts()}
          </View>
          <View style={styles.addProducts}>
            <Text style={{ fontSize: 20, color: 'rgb(74,134,232)', marginBottom: 10, fontWeight: 'bold' }}>Adicionar produtos</Text>
            <AntDesign
              name="pluscircleo"
              size={50}
              style={{ color: 'rgb(117,136,236)' }}
              onPress={() => setModalVisibility(true)} // abrir modal
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Screen
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 12,
    paddingBottom: 12,
  },

  // Store Information
  image: {
    backgroundColor: 'green',
    height: 180,
    justifyContent: 'center',   // remover
    flexDirection: 'row',       // remover
  },

  header: {
    flexDirection: 'row',
  },

  storeName: {
    fontSize: 32,
    fontWeight: "bold",
    color: 'rgb(74,134,232)',
  },

  storeDescription: {
    fontSize: 18,
    color: 'rgb(74,134,232)',
  },

  // label: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   color: 'rgb(74,134,232)',
  // },
  // data: {
  //   fontSize: 18,
  // },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.8,
  },
  addProducts: {
    alignItems: 'center',
    marginTop: 12
  },
  
  addProductsText: {
    fontSize: 16,
  },
  // icons: {
  //   flexDirection: 'row',
  // },
  // storeHeader: {
  //   paddingTop: 12,
  //   paddingBottom: 12,
  //   paddingRight: 12,
  //   paddingLeft: 12,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },

  // Modal Styles
  modalContainer: {
    position: 'absolute',
    width: '100%',
    height: 445,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  pageTitle: {
    textAlign: 'center',
    color: 'rgb(74,134,232)',
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

  // Product
  productName: {
    fontSize: 24,
    color: 'rgb(74,134,232)',
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 12,
    color: 'rgb(74,134,232)',
    fontWeight: 'bold',
  },
  productCard: {
    justifyContent: "flex-start",
  }
});

export default storePage;