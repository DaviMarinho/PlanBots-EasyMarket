const Product = require('../Models/ProductSchema');

const getProductData = async (req, res) => {
    const { id } = req.params;
    return res.json(await Product.findOne({ _id: id }));
};

const getProductByStoreID = async (req, res) => {
    const { id } = req.params;
    return res.json(await Product.find({storeID: id}));
}

const createProduct = async (req, res) => {
  const {
    productName,
    productDescription,
    category,
    available,
    price,
    storeID,
    productImage,
  } = req.body;

  if (!productName || !productDescription || !category || !available || !price) {
    return res.json({ 'err': 'invalid values' });
  }

  try {
    const newProduct = await Product.create({
      productName,
      productDescription,
      category,
      available,
      price,
      storeID,
      productImage,
    });
    return res.json(newProduct);
  } catch (err) {
    return res.json(err);
  }
};

const updateProduct = async (req, res) => {
    const {
        productName,
        productDescription,
        category,
        available,
        price
    } = req.body;

    if (!productName || !productDescription || !category || !available || !price) {
        return res.json({ 'err': 'invalid values' });
    };

    try {
        const updatedProduct = await Product.findOneAndUpdate({
            _id: id,
            productName,
            productDescription,
            category,
            available,
            price
        });
        return res.json(updatedProduct);
    } catch (err) {
        return res.json(err);
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    return res.json(await Product.findOneAndDelete({ _id: id }));
}

module.exports = {
    getProductData,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByStoreID,
};