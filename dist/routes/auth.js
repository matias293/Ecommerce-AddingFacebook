"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _passportFacebook = _interopRequireDefault(require("../middlewares/passportFacebook"));

var _auth = require("../controllers/auth");

var _authPaspport = _interopRequireDefault(require("../middlewares/authPaspport"));

var router = (0, _express.Router)();
router.get('/login', _auth.authController.getLogin);
router.post('/login', _authPaspport["default"].authenticate('login'), _auth.authController.postLogin);
router.get('/auth/facebook', _passportFacebook["default"].authenticate('facebook', {
  scope: ['email']
}));
router.get('/auth/facebook/callback', _passportFacebook["default"].authenticate('facebook', {
  successRedirect: '/datos',
  failureRedirect: '/fail'
}));
router.get('/fail', _auth.authController.failPage);
router.get('/datos', _auth.authController.data); //  router.post('/login',passport.authenticate('login'), authController.postLogin)

router.get('/logout', _auth.authController.getLogOut);
router.post('/signup', _authPaspport["default"].authenticate('signup'), _auth.authController.postSignUp);
router.get('/signup', _auth.authController.getSignUp);
router.get('/randoms', _auth.authController.randoms);
router.get('/info', _auth.authController.info);
var _default = router;
exports["default"] = _default;