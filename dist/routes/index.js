"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("./auth"));

var _productos = _interopRequireDefault(require("./productos"));

var router = (0, _express.Router)();
router.use('/', _productos["default"]); // router.use('/',authRouter)

var _default = router;
exports["default"] = _default;