const Store = require('../Models/StoreSchema');
const User = require('../Models/UserSchema');

const getStoreList = async (req, res) => {
  return res.json(await Store.find());
}

const getStoreByID = async (req, res) => {
  console.log(req.params._id);
  return res.json(await Store.findOne({ _id: req.params.id }))
}

const createStore = async (req, res) => {
  const { 
    storeName,
    storeDescription,
    userId 
  } = req.body;

  if (!storeName) {
    return res.json({ 'err': 'invalid name' });
  }

  try {
    const newStore = await Store.create({ storeName, storeDescription });
    const user = await User.findOneAndUpdate({ _id: userId }, {
      storeID: newStore._id
    }, { new: true });
    return res.json(user);
  } catch (err) {
    return res.json(err);
  }
}

const editStore = async (req, res) => {
  const { id } = req.params;
  const { storeName, storeDescription } = req.body;

  if (!storeName) {
    return res.json({ 'err': 'invalid name' });
  }

  try {
    const updatedStore = await Store.findOneAndUpdate({ _id: id }, {
      storeName,
      storeDescription
    }, { new: true });
    return res.json(updatedStore);
  } catch (err) {
    return res.json(err);
  }
};

const deleteStore = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStore = await Store.findOneAndDelete({ _id: id })
    return res.json(deletedStore);
  } catch (err) {
    return res.json(err);
  }
};

module.exports = {
  getStoreList, createStore, editStore, deleteStore, getStoreByID,
};