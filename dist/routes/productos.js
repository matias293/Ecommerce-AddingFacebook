"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _productos = require("../controllers/productos");

var router = (0, _express.Router)();
router.get('/productos/listar', _productos.productsController.getProducts);
router.get('/vista-test', _productos.productsController.getProductsFake);
router.get('/productos/listar/:id', _productos.productsController.getProduct);
router.post('/productos/agregar', _productos.productsController.postProduct);
router.put('/productos/actualizar/:id', _productos.productsController.updateProduct);
router["delete"]('/productos/borrar/:id', _productos.productsController.deleteProduct);
var _default = router;
exports["default"] = _default;