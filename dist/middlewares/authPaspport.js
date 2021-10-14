"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = _interopRequireDefault(require("passport-local"));

var _usuario = _interopRequireDefault(require("../models/usuario"));

var LocalStrategy = _passportLocal["default"].Strategy;
var StrategyOptions = {
  usernameField: 'username',
  passwordFIeld: 'password',
  passReqToCallback: true
};

var loginFunc = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, username, password, done) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _usuario["default"].findOne({
              username: username
            });

          case 2:
            user = _context.sent;

            if (user) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", done(null, false, {
              message: 'User does not exist'
            }));

          case 5:
            _context.next = 7;
            return user.isValidPassword(password);

          case 7:
            if (_context.sent) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", done(null, false, {
              message: 'Password is not valid.'
            }));

          case 9:
            console.log('SALIO TODO BIEN');
            return _context.abrupt("return", done(null, user));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function loginFunc(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var signUpFunc = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, username, password, done) {
    var user, userData, newUser;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            if (!(!username || !password)) {
              _context2.next = 4;
              break;
            }

            console.log('Invalid body fields');
            return _context2.abrupt("return", done(null, false));

          case 4:
            _context2.next = 6;
            return _usuario["default"].findOne({
              username: username
            });

          case 6:
            user = _context2.sent;

            if (!user) {
              _context2.next = 12;
              break;
            }

            console.log('User already exists');
            return _context2.abrupt("return", done(null, false, 'User already exists'));

          case 12:
            userData = {
              username: username,
              password: password
            };
            newUser = new _usuario["default"](userData);
            _context2.next = 16;
            return newUser.save();

          case 16:
            return _context2.abrupt("return", done(null, newUser));

          case 17:
            _context2.next = 22;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](0);
            done(_context2.t0);

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 19]]);
  }));

  return function signUpFunc(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

_passport["default"].use('login', new LocalStrategy(StrategyOptions, loginFunc));

_passport["default"].use('signup', new LocalStrategy(StrategyOptions, signUpFunc));

_passport["default"].serializeUser(function (user, done) {
  done(null, user._id);
});

_passport["default"].deserializeUser(function (userId, done) {
  _usuario["default"].findById(userId, function (err, user) {
    done(err, user);
  });
});

var _default = _passport["default"];
exports["default"] = _default;