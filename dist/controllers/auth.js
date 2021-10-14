"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authController = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _child_process = require("child_process");

var _path = _interopRequireDefault(require("path"));

var _os = _interopRequireDefault(require("os"));

var scriptPath = _path["default"].resolve(__dirname, '../utils/calculos.js');

var Auth = function Auth() {
  (0, _classCallCheck2["default"])(this, Auth);
  (0, _defineProperty2["default"])(this, "getLogin", function (req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/');
    }

    res.render('login', {
      pageTitle: 'Login Facebook'
    });
  });
  (0, _defineProperty2["default"])(this, "postLogin", /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!req.session.loggedIn) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.redirect('/'));

            case 2:
              req.session.loggedNormal = true;
              _context.next = 5;
              return req.session.save();

            case 5:
              return _context.abrupt("return", res.redirect('/'));

            case 6:
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
  (0, _defineProperty2["default"])(this, "getLogOut", function (req, res) {
    if (!req.isAuthenticated()) {
      return res.redirect('/login');
    }

    var username = req.user.displayName;
    req.logout();
    req.session.destroy();
    res.render('logout', {
      pageTitle: 'Log Out',
      isLogIn: req.isAuthenticated(),
      username: username
    });
  });
  (0, _defineProperty2["default"])(this, "postLogout", function (req, res) {
    if (!req.isAuthenticated()) {
      return res.redirect('/login');
    }
  });
  (0, _defineProperty2["default"])(this, "getSignUp", function (req, res) {
    res.render('signup', {
      pageTitle: 'Sign Up'
    });
  });
  (0, _defineProperty2["default"])(this, "postSignUp", /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req.session.loggedIn = true;
              _context2.next = 3;
              return req.session.save();

            case 3:
              res.redirect('/');

            case 4:
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
  (0, _defineProperty2["default"])(this, "failPage", /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              res.render('login-error', {});

            case 1:
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
  (0, _defineProperty2["default"])(this, "data", function (req, res) {
    var foto = 'noPhoto';
    var email = 'noEmail';

    if (req.isAuthenticated()) {
      var userData = req.user; //reinicio contador

      if (!userData.contador) userData.contador = 0;
      userData.contador++;
      if (userData.photos) foto = userData.photos[0].value;
      if (userData.emails) email = userData.emails[0].value;
      res.render('datos', {
        pageTitle: 'Bienvenido',
        nombre: userData.displayName,
        contador: userData.contador,
        foto: foto,
        email: email
      });
    } else {
      res.redirect('/api/login');
    }
  });
  (0, _defineProperty2["default"])(this, "info", function (req, res) {
    res.json({
      'Plataforma': process.platform,
      'Version de Node': process.version,
      'Uso de Memorias': process.memoryUsage(),
      'Path de operacion': process.cwd(),
      'ID del proceso': process.pid,
      'Comando de entrada': process.argv,
      'Numero de procesadores': _os["default"].cpus().length
    });
  });
  (0, _defineProperty2["default"])(this, "randoms", function (req, res) {
    var cant = req.query.cant;
    var query = cant || 500000000;
    var computo = (0, _child_process.fork)(scriptPath, [query]);
    computo.send('start');
    computo.on('message', function (sum) {
      res.json({
        resultado: sum
      });
    }); //  }
  });
};

var authController = new Auth();
exports.authController = authController;