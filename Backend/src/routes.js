const express = require('express');

const routes = express.Router();
const ProductController = require('./Controllers/ProductsController');
const StoresController = require('./Controllers/StoresController');
const UsersController = require('./Controllers/UsersController');



// Products

// Store
routes.get('/store', StoresController.getStoreList);
routes.post('/store/create', StoresController.createStore)
routes.put('/store/edit/:id', StoresController.editStore);
routes.delete('/store/delete/:id', StoresController.deleteStore)
// Users
routes.get('/user/:id', UserController.getUserList);
routes.post('/user/create', UsersController.createUser)
routes.put('/user/edit/:id', UsersController.editUser);
routes.delete('/user/delete/:id', UsersController.deleteUser)



module.exports = routes;
