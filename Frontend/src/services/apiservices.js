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
  console.log(email, phone, password, cpf);
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