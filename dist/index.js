"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _cluster = _interopRequireDefault(require("cluster"));

var _os = _interopRequireDefault(require("os"));

var _minimist = _interopRequireDefault(require("minimist"));

var _connection = require("./db/connection");

var _server = _interopRequireDefault(require("./services/server"));

var numCPUs = _os["default"].cpus().length;

var argumentos = (0, _minimist["default"])(process.argv.slice(2));
(0, _connection.dbConnection)().then(function (result) {
  var subproceso = argumentos.subproceso || 'FORK';

  if (subproceso === 'CLUSTER' && _cluster["default"].isMaster) {
    console.log("NUMERO DE CPUS ===> ".concat(numCPUs));
    console.log("PID MASTER ".concat(process.pid));

    for (var i = 0; i < numCPUs; i++) {
      _cluster["default"].fork();
    }

    _cluster["default"].on('exit', function (worker) {
      console.log("Worker ".concat(worker.process.pid, " died at ").concat(Date()));

      _cluster["default"].fork();
    });
  } else {
    /* --------------------------------------------------------------------------- */

    /* WORKERS */
    var PORT = 8080;

    _server["default"].listen(PORT, function () {
      return console.log("Servidor express escuchando en el puerto ".concat(PORT, " - PID WORKER ").concat(process.pid));
    });
  }
})["catch"](function (err) {
  console.log(err);
});