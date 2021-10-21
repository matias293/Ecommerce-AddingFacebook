"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _winston = require("winston");

var timestamp = _winston.format.timestamp,
    combine = _winston.format.combine,
    printf = _winston.format.printf,
    errors = _winston.format.errors,
    colorize = _winston.format.colorize;
var logFormat = printf(function (_ref) {
  var level = _ref.level,
      message = _ref.message,
      timestamp = _ref.timestamp,
      stack = _ref.stack;
  return "".concat(timestamp, " ").concat(level, ": ").concat(message);
});
var logger = (0, _winston.createLogger)({
  format: combine(colorize(), timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }), logFormat),
  transports: [new _winston.transports.Console({
    level: 'info'
  }), new _winston.transports.File({
    filename: "".concat(__dirname, "/logs/error-2.log"),
    level: 'error'
  }), new _winston.transports.File({
    filename: "".concat(__dirname, "/logs/warn-2.log"),
    level: 'warn'
  })]
});
var _default = logger;
exports["default"] = _default;