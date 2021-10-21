"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PORT = void 0;

var _cluster = _interopRequireDefault(require("cluster"));

var _os = _interopRequireDefault(require("os"));

var _minimist = _interopRequireDefault(require("minimist"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _connection = require("./db/connection");

var _server = _interopRequireDefault(require("./services/server"));

var _logger = _interopRequireDefault(require("./config/logger"));

_dotenv["default"].config();

var argumentos = (0, _minimist["default"])(process.argv.slice(2));
var PORT = -1;
exports.PORT = PORT;
(0, _connection.dbConnection)().then(function (result) {
  _server["default"].listen(PORT, function () {
    return _logger["default"].info("Servidor express escuchando en el puerto ".concat(PORT, " - PID WORKER ").concat(process.pid));
  });
})["catch"](function (err) {
  _logger["default"].error(err);
});