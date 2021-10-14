"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productsController = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _faker = _interopRequireDefault(require("faker"));

var _productos = require("../persistencia/productos");

var Producto = function Producto() {
  (0, _classCallCheck2["default"])(this, Producto);
  (0, _defineProperty2["default"])(this, "getProducts", /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var productos;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _productos.productsPersistencia.getAll();

            case 2:
              productos = _context.sent;

              if (!(productos.length === 0)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", res.status(404).json({
                error: 'No hay productos cargados'
              }));

            case 7:
              res.json({
                productos: productos
              });

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  (0, _defineProperty2["default"])(this, "getProduct", /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var id, product;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = req.params.id;
              _context2.next = 3;
              return _productos.productsPersistencia.getProduct(id);

            case 3:
              product = _context2.sent;

              if (!(product.length === 0)) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                error: 'No existe producto con ese id'
              }));

            case 8:
              res.json({
                product: product
              });

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
  (0, _defineProperty2["default"])(this, "getProductsFake", /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var cantidad, products, fakerProducts, i, _i;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              cantidad = req.query.cantidad;
              products = [];
              fakerProducts = {
                title: _faker["default"].commerce.productName(),
                price: Number(_faker["default"].commerce.price()),
                thumbnail: _faker["default"].image.technics()
              };

              if (!cantidad) {
                _context3.next = 8;
                break;
              }

              if (!(Number(cantidad) !== 0)) {
                _context3.next = 7;
                break;
              }

              for (i = 0; i < Number(cant); i++) {
                products.push(fakerProducts);
              }

              return _context3.abrupt("return", res.json({
                products: products
              }));

            case 7:
              return _context3.abrupt("return", res.status(404).json({
                message: 'No hay productos'
              }));

            case 8:
              for (_i = 0; _i < 10; _i++) {
                products.push(fakerProducts);
              }

              return _context3.abrupt("return", res.json({
                products: products
              }));

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
  (0, _defineProperty2["default"])(this, "postProduct", /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var body;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              body = req.body;
              _context4.next = 3;
              return _productos.productsPersistencia.add(body);

            case 3:
              res.json({
                msg: 'Producto fue agregado exitosamente'
              });

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
  (0, _defineProperty2["default"])(this, "updateProduct", /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var id, body, product;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = req.params.id;
              body = req.body;
              _context5.next = 4;
              return _productos.productsPersistencia.update(id, body);

            case 4:
              product = _context5.sent;

              if (product === 0) {
                res.json({
                  msg: 'No existe un producto con ese id'
                });
              } else {
                res.json({
                  msg: 'Producto Actualizado correctamente',
                  product: product
                });
              }

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
  (0, _defineProperty2["default"])(this, "deleteProduct", /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var id, product;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              id = req.params.id;
              _context6.next = 3;
              return _productos.productsPersistencia["delete"](id);

            case 3:
              product = _context6.sent;

              if (product === 0) {
                res.json({
                  msg: 'No existe un producto con ese id'
                });
              } else {
                res.json({
                  msg: 'Producto Eliminado exitosamente'
                });
              }

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());
};

var productsController = new Producto();
exports.productsController = productsController;