const express = require('express');

const routes = express.Router();
const ProductController = require('./Controllers/ProductsController');
const StoresController = require('./Controllers/StoresController');
const UsersController = require('./Controllers/UsersController');

// Products
routes.get('/product/:id', ProductController.getProductData);
routes.post('/product/create', ProductController.createProduct)
routes.put('/product/update/:id', ProductController.updateProduct);
routes.delete('/product/delete/:id', ProductController.deleteProduct);

// Store
routes.get('/store', StoresController.getStoreList);
routes.post('/store/create', StoresController.createStore)
routes.put('/store/edit/:id', StoresController.editStore);
routes.delete('/store/delete/:id', StoresController.deleteStore)
// Users
routes.post('/user/create', UsersController.createUser)
routes.put('/user/edit/:id', UsersController.editUser);
routes.delete('/user/delete/:id', UsersController.deleteUser)



module.exports = routes;
