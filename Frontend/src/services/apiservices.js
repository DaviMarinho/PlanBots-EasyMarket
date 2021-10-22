import APIGeneral from './baseService';

export const getUserList = async () => {
  try {
    const r = await APIGeneral.get('/user');
    return r;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export const registerUser = async (email, phone, cpf, password, image) => {
  try {
    const r = await APIGeneral.post('/user/create', {
      email,
      phone,
      cpf,
      password,
      image,
    });
    return r;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const updateUser = async (userID, email, cpf, phone, pass, image) => {
  try {
    const r = await APIGeneral.put(`/user/edit/${userID}`, {
      email,
      cpf,
      phone,
      pass,
      image,
    });
    return r;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export const loginUser = async (email, password) => {
  try {
    const r = await APIGeneral.post('/user/login', {
      email,
      password
    });
    return r;
  } catch (err) {
    console.error(err);
    return err;
  };
};


// Loja
export const getStoreData = async (storeID) => {
  try {
    const r = await APIGeneral.get(`/store/${storeID}`);
    return r;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export const registerStore = async (storeName, storeDescription, userId) => {
  try {
    const r = await APIGeneral.post("/store/create", {
      storeName,
      storeDescription,
      userId,
    });
    return r;
  } catch (err) {
    console.error(err);
    return err
  };
};

export const updateStore = async (storeID, storeName, storeDescription) => {
  try {
    const r = await APIGeneral.put(`/store/edit/${storeID}`, {
      storeName,
      storeDescription,
    });
    return r;
  } catch (err) {
    console.error(err);
    return err;
  };
};

export const deleteStore = async (storeID) => {
  try {
    const r = await APIGeneral.delete(`/store/delete/${storeID}`);
    return r;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const addProductToStore = async (productsIds, storeID) => {
  try {
    const r = await APIGeneral.put(`/store/addproduct/${storeID}`, {
      productsIds
    });
    return r;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export const changeStoreStatus = async (storeID, status) => {
  console.log(status);
  try {
    const r = await APIGeneral.put(`/store/status/${storeID}`, { status });
    return r;
  } catch (err) {
    console.warn(err);
    return err;
  }
}

// Produtos
export const createProduct = async (
  productName,
  productDescription,
  category,
  available,
  price,
  storeID,
  productImage
) => {
  try {
    const r = await APIGeneral.post("/product/create", {
      productName,
      productDescription,
      category,
      available,
      price,
      storeID,
      productImage
    });
    return r;
  } catch (err) {
    console.error(err);
    return err;
  };
};

export const getProductByStore = async (storeID) => {
  try {
    const r = await APIGeneral.get(`/product/store/${storeID}`);
    return r;
  } catch (err) {
    console.error(err);
    return err;
  };
};

export const deleteProduct = async (productID) => {
  try {
    const r = await APIGeneral.delete(`/product/delete/${productID}`);
    return r;
  } catch (err) {
    console.error(err);
    return err;
  }
};
