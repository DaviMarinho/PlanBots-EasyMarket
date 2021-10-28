const Store = require('../Models/StoreSchema');
const Product = require('../Models/ProductSchema');
const User = require('../Models/UserSchema');

const getStoreList = async (req, res) => {
  return res.json(await Store.find());
}

const getOpenStores = async (req, res) => {
  return res.json(await Store.find({ open: true }));
}

const getStoreByID = async (req, res) => {
  return res.json(await Store.findOne({ _id: req.params.id }))
};

const changeStoreStatus = async (req, res) => {
  const { id } = req.params;
  const { status, lat, long } = req.body;

  try {
    const updatedStatus = await Store.findOneAndUpdate({ _id: id }, {
      open: status,
      storeLatitude: lat,
      storeLongitude: long
    }, { new: true });
    return res.json(updatedStatus);
  } catch (err) {
    return res.json(err);
  }
}

const editStoreImage = async (req, res) => {
  const { id } = req.params;
  const { storeImage } = req.body;

  try {
    const newStore = await Store.findOneAndUpdate({ _id: id }, {
      storeImage,
    }, {new: true});
    return res.json(newStore);
  } catch (err) {
    return res.json(err);
  }
}

const getStoreOwnerPhone = async (req, res) => {
  const { id } = req.params;

  try {
    const userData = await User.findOne({ storeID: id });
    return res.json({ phone: userData.phone });
  } catch (err) {
    return res.json(err);
  }
}

const createStore = async (req, res) => {
  const {
    storeName,
    storeDescription,
    userId,
    storeImage,
  } = req.body;

  if (!storeName) {
    return res.json({ 'err': 'invalid name' });
  }

  try {
    const newStore = await Store.create({ storeName, storeDescription, storeImage});
    await User.findOneAndUpdate({ _id: userId }, {
      storeID: newStore._id
    }, { new: true });
    return res.json(newStore);
  } catch (err) {
    return res.json(err);
  }
}

const editStore = async (req, res) => {
  const { id } = req.params;
  const { storeName, storeDescription, storeImage } = req.body;

  if (!storeName) {
    return res.json({ 'err': 'invalid name' });
  }

  try {
    const updatedStore = await Store.findOneAndUpdate({ _id: id }, {
      storeName,
      storeDescription,
      storeImage,
    }, { new: true });
    return res.json(updatedStore);
  } catch (err) {
    return res.json(err);
  }
};

const deleteStore = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  try {
    const deletedStore = await Store.findOneAndDelete({ _id: user.storeID });
    await Product.deleteMany({ storeID: user.storeID });
    await User.findOneAndUpdate({ _id: id }, {
      storeID: "",
    }, { new: true });
    return res.json(deletedStore);
  } catch (err) {
    return res.json(err);
  }
};

module.exports = { 
  getStoreList, 
  createStore, 
  editStore, 
  deleteStore, 
  getStoreByID, 
  changeStoreStatus, 
  getOpenStores, 
  editStoreImage,
  getStoreOwnerPhone
};