"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var _default = {
  MONGO_INGRESS: process.env.MONGO,
  FACEBOOK_APP_ID: process.env.FACEBOOK_ID,
  FACEBOOK_APP_SECRET: process.env.SECRET_FACEBOOK
};
exports["default"] = _default;