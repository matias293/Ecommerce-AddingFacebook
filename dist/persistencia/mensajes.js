"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mensajesPersistencia = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _normalizr = require("normalizr");

var _mensaje = require("../models/mensaje");

var author = new _normalizr.schema.Entity('author', {}, {
  idAttribute: 'email'
});
var msge = new _normalizr.schema.Entity('message', {
  author: author
}, {
  idAttribute: '_id'
});
var msgesSchema = new _normalizr.schema.Array(msge);

var Mensajes = function Mensajes() {
  (0, _classCallCheck2["default"])(this, Mensajes);
  (0, _defineProperty2["default"])(this, "getAll", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var messages, normalizedMessages;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _mensaje.messageModel.find();

          case 3:
            messages = _context.sent.map(function (aMsg) {
              return {
                _id: aMsg._id,
                author: aMsg.author,
                text: aMsg.text
              };
            });
            normalizedMessages = (0, _normalizr.normalize)(messages, msgesSchema);
            return _context.abrupt("return", normalizedMessages);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  })));
  (0, _defineProperty2["default"])(this, "add", /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(messageData) {
      var nuevoMensaje, mensajeGuardado;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              nuevoMensaje = new _mensaje.messageModel(messageData);
              _context2.next = 4;
              return nuevoMensaje.save();

            case 4:
              mensajeGuardado = _context2.sent;
              return _context2.abrupt("return", mensajeGuardado);

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 8]]);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
};

var mensajesPersistencia = new Mensajes();
exports.mensajesPersistencia = mensajesPersistencia;