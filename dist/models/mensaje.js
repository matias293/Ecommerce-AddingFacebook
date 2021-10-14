"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageModel = void 0;

var _mongoose = require("mongoose");

var msgCollectionName = 'message';
var messageSchema = new _mongoose.Schema({
  author: {
    email: {
      type: String,
      required: true,
      max: 100
    },
    nombre: {
      type: String,
      required: true,
      max: 100
    },
    apellido: {
      type: String,
      required: true,
      max: 100
    },
    edad: {
      type: Number,
      required: true
    },
    alias: {
      type: String,
      required: true,
      max: 100
    },
    avatar: {
      type: String,
      required: true,
      max: 100
    },
    fecha: {
      type: String,
      required: true,
      max: 100
    }
  },
  mensaje: {
    type: String,
    required: true,
    max: 1000
  }
});
var messageModel = (0, _mongoose.model)(msgCollectionName, messageSchema);
exports.messageModel = messageModel;