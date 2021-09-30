const Product = require('../Models/ProductSchema');

const getProdutoInfo = async (req, res) => {
    const {
        id
    } = req.params;
    return res.json(await Product.findOne({
        _id: id
    }));
}

const createProdut = async (req, res) => {
    const {
        productName,
        productDescription,
        category,
        available,
        price
    } = req.body;

    if (!productName || !productDescription || !category || !available || !price) {
        return res.json({
            'err': 'invalid values'
        });
    }

    try {
        const createProduct = await Product.create({
            productName,
            productDescription,
            category,
            available,
            price
        });
        return createProduct;
    } catch (err) {
        return res.json({
            err
        })
    }
}

const updateProduct = (req, res) => {

}

const deleteProduct = (req, res) => {

}

module.exports = {
    getProdutoInfo,
    createProdut,
    updateProduct,
    deleteProduct,
};