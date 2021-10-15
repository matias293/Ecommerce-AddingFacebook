"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var http = _interopRequireWildcard(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _passport = _interopRequireDefault(require("passport"));

var _index = _interopRequireDefault(require("../routes/index"));

var _auth = _interopRequireDefault(require("../routes/auth"));

var _productos = require("../persistencia/productos");

var _mensajes = require("../persistencia/mensajes");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import passport from '../middlewares/passportFacebook'
var advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
var StoreOptions = {
  store: _connectMongo["default"].create({
    mongoUrl: "mongodb+srv://user:PZvoslz9ew26uxIj@clustercodershop.wuu66.mongodb.net/ecommerce",
    mongoOptions: advancedOptions
  }),
  cookie: {
    maxAge: 600000
  },
  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: false,
  saveUninitialized: false
};
var app = (0, _express["default"])();
app.use((0, _cookieParser["default"])());
app.use((0, _expressSession["default"])(StoreOptions));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));

var publicFolderPath = _path["default"].resolve(__dirname, '../../public');

app.use(_express["default"]["static"](publicFolderPath));
app.use('/api', _index["default"]);
app.use('/', _auth["default"]);
app.use('/', function (req, res, next) {
  if (req.isAuthenticated()) {
    if (req.session.loggedNormal) {
      return res.render('home', {
        pageTitle: 'Home',
        mensaje: req.user.username,
        isLogIn: req.isAuthenticated()
      });
    }

    return res.render('home', {
      pageTitle: 'Home',
      mensaje: req.user.displayName,
      isLogIn: req.isAuthenticated()
    });
  } else {
    res.render('home', {
      pageTitle: 'Home',
      isLogIn: false
    });
  }
});
var myServer = new http.Server(app);
var myWSServer = (0, _socket["default"])(myServer); //Productos

myWSServer.on('connect', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(socket) {
    var listaProductos, todosMensajes;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            //Agregar Producto
            socket.on('new-product', /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(product) {
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _productos.productsPersistencia.add(product);

                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }()); //Mostrar La Lista

            _context5.next = 3;
            return _productos.productsPersistencia.getAll();

          case 3:
            listaProductos = _context5.sent;
            myWSServer.emit('products', listaProductos); //Cuando un usuario se conecta obtiene los productos anteriores

            socket.on('askProduct', /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(productos) {
                var listaProductos;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _productos.productsPersistencia.getAll();

                      case 2:
                        listaProductos = _context2.sent;
                        socket.emit('products', listaProductos);

                      case 4:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x3) {
                return _ref3.apply(this, arguments);
              };
            }()); //Mensajes

            socket.on('new-mensaje', /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(message) {
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return _mensajes.mensajesPersistencia.add(message);

                      case 2:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x4) {
                return _ref4.apply(this, arguments);
              };
            }()); //Mostar Mensajes

            _context5.next = 9;
            return _mensajes.mensajesPersistencia.getAll();

          case 9:
            todosMensajes = _context5.sent;
            myWSServer.emit('mensajes', todosMensajes); //Mostar mensajes anteriores

            socket.on('askMensajes', /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(mensajes) {
                var todosMensajes;
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return _mensajes.mensajesPersistencia.getAll();

                      case 2:
                        todosMensajes = _context4.sent;
                        socket.emit('mensajes', todosMensajes);

                      case 4:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x5) {
                return _ref5.apply(this, arguments);
              };
            }());

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
var _default = myServer;
exports["default"] = _default;