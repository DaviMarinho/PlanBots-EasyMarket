const Store = require('../Models/StoreSchema');

const getStoreList = async (req, res) => {
    return res.json(await Store.find());
}

const createStore = async (req, res) => {
    const { storeName } = req.body;

    if (!storeName) {
        return res.json({ 'err': 'invalid name' });
    }

    try {
        const newStore = await Store.create({ storeName });
        return res.json(newStore);
    } catch (err) {
        return res.json(err);
    }
}

const editStore = async (req, res) => {
    const { id } = req.params;
    const { storeName } = req.body;

    if (!storeName) {
        return res.json({ 'err': 'invalid name' });
    }

    try {
        const updatedStore = await Store.findOneAndUpdate({ _id: id }, {
            storeName,
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
    getStoreList, createStore, editStore, deleteStore,
};