"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.isLoggedIn = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passport = _interopRequireDefault(require("passport"));

var _passportFacebook = _interopRequireDefault(require("passport-facebook"));

var _index = _interopRequireDefault(require("../config/index"));

var FaceBookStrategy = _passportFacebook["default"].Strategy;
var strategyOptions = {
  clientID: '1199081557245042',
  clientSecret: 'a9ced53c15fd8ea37ef51e635cf334af',
  callbackURL: 'http://localhost:8080/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails']
};

var loginFunc = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(accessToken, refreshToken, profile, done) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", done(null, profile));

          case 1:
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

_passport["default"].use('facebook', new FaceBookStrategy(strategyOptions, loginFunc));

_passport["default"].serializeUser(function (user, cb) {
  cb(null, user);
});

_passport["default"].deserializeUser(function (obj, cb) {
  cb(null, obj);
});

var isLoggedIn = function isLoggedIn(req, res, done) {
  if (!req.isAuthenticated()) return res.status(401).json({
    msg: 'Unathorized'
  });
  done();
};

exports.isLoggedIn = isLoggedIn;
var _default = _passport["default"];
exports["default"] = _default;