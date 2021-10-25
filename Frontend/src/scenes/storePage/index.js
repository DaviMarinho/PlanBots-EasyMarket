import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ToastAndroid,
  Switch,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  deleteStore,
  getProductByStore,
  createProduct,
  deleteProduct,
  changeStoreStatus,
} from "../../services/apiservices";
import CreateButton from "../../components/createButton";
import InputField from "../../components/inputField";
import Modal from "react-native-modal";
import { useData } from "../../context/";

const storePage = ({ route, navigation }) => {
  const { userData, storeData, setUserData, setStoreData } = useData();
  const [modalVisibility, setModalVisibility] = useState(false);
  // Store
  const [storeID, setStoreID] = useState(
    route.params ? route.params._id : storeData._id
  );
  const [storeName, setStoreName] = useState();
  const [storeDescription, setStoreDescription] = useState();
  const [storeImage, setStoreImage] = useState();
  const [isOpen, setIsOpen] = useState();
  // Products
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [products, setProducts] = useState([]);
  const { setMarkers, getStoreLocations } = useData();

  const deleteStoreFromAPI = () => {
    deleteStore(storeData?._id).then((r) => {
      const deletedStoreUser = userData;
      deletedStoreUser.storeID = "";
      setUserData(deletedStoreUser);
      setStoreData();
      navigation.navigate("home");
    });
  };

  const getProductsDataFromAPI = () => {
    getProductByStore(storeID).then((r) => {
      setProducts(r.data);
    });
  }

  const addProduct = async () => {
    await createProduct(
      productName,
      productDescription,
      productCategory,
      true,
      productPrice,
      storeData?._id,
      ""
    );
    setModalVisibility(false);
    setProductCategory("");
    setProductDescription("");
    setProductName("");
    setProductPrice("");
    ToastAndroid.show("Cadastro realizado com sucesso.", ToastAndroid.SHORT);
    getProductsDataFromAPI();
  };

  const openStore = () => {
    // navigator.geolocation.getCurrentPosition(
    //   // success
    //   async ({ coords: { latitude, longitude } }) => {
    //     changeStoreStatus(storeData._id, !isOpen, latitude, longitude);
    //     setStoreData({
    //       ...storeData,
    //       open: !isOpen,
    //       storeLatitude: latitude,
    //       storeLongitude: longitude,
    //     });
    //     setIsOpen(!isOpen);
    //   },
    //   // error
    //   () => {},
    //   {
    //     timeout: 2000,
    //     enableHighAccuracy: true,
    //     maximumAge: 1000,
    //   }
    // );
    navigator.geolocation.getCurrentPosition(
      (p) => {
        changeStoreStatus(
          storeData?._id,
          !isOpen,
          p.coords.latitude,
          p.coords.longitude
        ).then((r) => getStoreLocations());
        setStoreData({
          ...storeData,
          open: !isOpen,
          storeLatitude: p.coords.latitude,
          storeLongitude: p.coords.longitude,
        });
      },
      (e) => console.error(e),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    setIsOpen(!isOpen);
  };

  const deleteProductFromAPI = async (id) => {
    await deleteProduct(id);
    getProductsDataFromAPI();
  };

  const listProducts = () => {
    if (products.length > 0) {
      return products.map((product, idx) => {
        return (
          <View style={styles.productCard} key={idx}>
            {route.params ? (
              <View style={styles.hr} />
            ) : (
              <>
                <View style={styles.productHr} />
                <AntDesign
                  name="closecircleo"
                  size={30}
                  style={styles.productX}
                  onPress={() => deleteProductFromAPI(product._id)}
                />
              </>
            )}

            <View style={styles.product}>
              <View style={styles.productText}>
                <View style={styles.productNameDescription}>
                  <Text numberOfLines={1} style={styles.productName}>
                    {product.productName}
                  </Text>
                  <Text numberOfLines={3} style={styles.productDescription}>
                    {product.productDescription}
                  </Text>
                </View>
                <View style={styles.productPrice}>
                  <Text style={styles.productPriceDescription}>
                    R${product.price}
                  </Text>
                </View>
              </View>
              <View style={styles.productImage} />
            </View>
          </View>
        );
      });
    }
  };

  useEffect(() => {
    getProductsDataFromAPI();
  }, []);

  useEffect(() => {
    console.log(route);
    if (route.params) {
      setStoreName(route.params.storeName);
      setStoreDescription(route.params.storeDescription);
      // setStoreImage(route.params.storeImage);
    } else {
      setStoreName(storeData.storeName);
      setStoreDescription(storeData.storeDescription);
      // setStoreImage(storeData.storeImage);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Modal
          isVisible={modalVisibility}
          onBackdropPress={() => setModalVisibility(false)}
          avoidKeyboard={false}
        >
          <View style={styles.modalContainer}>
            <View style={styles.closeModal}>
              <AntDesign
                name="closecircleo"
                size={30}
                style={{ color: "rgb(117,136,236)" }}
                onPress={() => setModalVisibility(false)}
              />
            </View>
            <Text style={styles.pageTitle}>Adicionar novo produto</Text>
            <View style={styles.inputView}>
              <InputField
                title="Nome do produto*"
                placeholder="Nome do produto"
                setText={setProductName}
                text={productName}
                large="80%"
              />
              <Text style={styles.inputLabel}>Categoria do produto*</Text>
              <View style={styles.pickerView}>
                <Picker
                  style={styles.picker}
                  selectedValue={productCategory}
                  onValueChange={(itemValue) => setProductCategory(itemValue)}
                >
                  <Picker.Item
                    label="Categoria do produto"
                    value="0"
                    color="#9A9A9A"
                    style={styles.pickerItem}
                  />
                  <Picker.Item
                    label="Salgado"
                    value="SALGADO"
                    style={styles.pickerItem}
                  />
                  <Picker.Item
                    label="Doce"
                    value="DOCE"
                    style={styles.pickerItem}
                  />
                </Picker>
              </View>
              <InputField
                title="Preço*"
                placeholder="R$ 00.00"
                setText={setProductPrice}
                text={productPrice}
                large="80%"
                type="numeric"
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
            <CreateButton create={addProduct} text="Cadastrar produto" />
          </View>
        </Modal>
        <View>
          <View style={styles.image}>
            <Text style={{ fontSize: 28 }}>Imagem</Text>
          </View>
          <View style={{ paddingLeft: 12, paddingRight: 12, marginTop: 12 }}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.storeName}>{storeName}</Text>
              {!route.params && (
                <View style={{ alignItems: "center" }}>
                  <Text>Loja</Text>
                  <Switch
                    onValueChange={() => {
                      openStore();
                      setStoreData({
                        ...storeData,
                        open: !isOpen,
                      });
                      setIsOpen(!isOpen);
                    }}
                    value={isOpen}
                  />
                </View>
              )}
            </View>
            <View style={styles.storeDescriptionView}>
              <Text numberOfLines={3} style={styles.storeDescription}>
                {storeDescription}
              </Text>
            </View>
            <View style={{ marginTop: 18 }}>{listProducts()}</View>
            {!route.params && (
              <>
                <View style={styles.hr} />
                <View style={styles.addProducts}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "rgb(74,134,232)",
                      marginBottom: 10,
                      fontWeight: "bold",
                    }}
                  >
                    Adicionar produtos
                  </Text>
                  <AntDesign
                    name="pluscircleo"
                    size={50}
                    style={{ color: "rgb(117,136,236)" }}
                    onPress={() => setModalVisibility(true)} // abrir modal
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
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
    backgroundColor: "#6E6E6E",
    height: 180,
    justifyContent: "center", // remover
    flexDirection: "row", // remover
  },

  header: {
    flexDirection: "row",
  },

  storeName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "rgb(74,134,232)",
  },

  storeDescription: {
    fontSize: 18,
    color: "rgb(74,134,232)",
  },

  storeDescriptionView: {
    height: 60,
  },

  // label: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   color: 'rgb(74,134,232)',
  // },
  // data: {
  //   fontSize: 18,
  // },
  productHr: {
    borderBottomColor: "#6E6E6E",
    borderBottomWidth: 1,
    width: "92%",
  },
  hr: {
    borderBottomColor: "#6E6E6E",
    borderBottomWidth: 1,
  },
  addProducts: {
    alignItems: "center",
    marginTop: 12,
    marginBottom: 100,
  },

  addProductsText: {
    fontSize: 16,
  },

  // Modal Styles
  closeModal: {
    alignItems: "flex-end",
    padding: 8,
    marginBottom: "-8%",
  },
  modalContainer: {
    position: "absolute",
    width: "100%",
    height: 445,
    backgroundColor: "white",
    borderRadius: 10,
  },
  pageTitle: {
    textAlign: "center",
    color: "rgb(74,134,232)",
    fontSize: 22,
    padding: 16,
    fontWeight: "bold",
  },
  inputView: {
    marginLeft: "10%",
    width: "100%",
    alignItems: "flex-start",
  },
  input: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    width: "80%",
  },
  inputLabel: {
    fontSize: 14,
    backgroundColor: "#FFF",
    marginBottom: -22,
    marginLeft: "3%",
    fontWeight: "bold",
    color: "#000",
    elevation: 0.1,
    alignItems: "center",
    padding: 1,
  },
  descriptionInput: {
    width: "80%",
    height: 100,
    marginTop: 12,
    marginBottom: 24,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    textAlignVertical: "top",
  },
  picker: {
    width: "110%",
    marginLeft: "-3%",
  },
  pickerView: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    width: "80%",
  },
  pickerItem: {
    fontSize: 14,
  },
  // Product
  productName: {
    fontSize: 22,
    color: "rgb(74,134,232)",
    fontWeight: "bold",
    marginBottom: -2,
  },
  productDescription: {
    fontSize: 15,
    color: "rgb(74,134,232)",
  },
  productCard: {
    height: 140,
  },
  productText: {
    width: "70%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  productPrice: {
    justifyContent: "flex-end",
    marginBottom: 2,
  },
  productNameDescription: {
    width: "100%",
    justifyContent: "flex-start",
  },
  productPriceDescription: {
    fontSize: 15,
    color: "rgb(74,134,232)",
    fontWeight: "bold",
  },
  productImage: {
    position: "absolute",
    marginTop: 4,
    alignSelf: "flex-end",
    height: "93%",
    width: "28%",
    borderRadius: 8,
    backgroundColor: "#6E6E6E",
  },
  product: {
    height: 110,
    marginTop: 15,
    marginBottom: 15,
    width: "100%",
  },
  productX: {
    marginTop: -15,
    color: "#6E6E6E",
    alignSelf: "flex-end",
    position: "absolute",
  },
});

export default storePage;
