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

export const registerUser = async (email, phone, cpf, password) => {
  try {
    const r = await APIGeneral.post('/user/create', {
      email,
      phone,
      cpf,
      password
    });
    return r;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const updateUser = async (userID, email, cpf, phone, pass) => {
  try {
    const r = await APIGeneral.put(`/user/edit/${userID}`, {
      email,
      cpf,
      phone,
      pass
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
  console.log(storeID, storeName, storeDescription);
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