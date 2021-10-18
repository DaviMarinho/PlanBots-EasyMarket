const express = require('express');

const routes = express.Router();
routes.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
const ProductController = require('./Controllers/ProductsController');
const StoresController = require('./Controllers/StoresController');
const UsersController = require('./Controllers/UsersController');

routes.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Products
routes.get('/product/:id', ProductController.getProductData);
routes.get('/product/store/:id', ProductController.getProductByStoreID);
routes.post('/product/create', ProductController.createProduct);
routes.put('/product/update/:id', ProductController.updateProduct);
routes.delete('/product/delete/:id', ProductController.deleteProduct);

// Store
routes.get('/store', StoresController.getStoreList);
routes.get('/store/:id', StoresController.getStoreByID);
routes.post('/store/create', StoresController.createStore)
routes.put('/store/edit/:id', StoresController.editStore);
routes.put('/store/status/:id', StoresController.changeStoreStatus);
routes.delete('/store/delete/:id', StoresController.deleteStore)

// Users
routes.get('/user', UsersController.getUserList);
routes.post('/user/create', UsersController.createUser)
routes.put('/user/edit/:id', UsersController.editUser);
routes.delete('/user/delete/:id', UsersController.deleteUser)
routes.post('/user/login', UsersController.loginUser);

module.exports = routes;
