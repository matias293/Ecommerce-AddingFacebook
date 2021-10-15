"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculo = void 0;

var calculo = function calculo(cant) {
  var numRepetido = {};

  for (var index = 0; index < cant; index++) {
    var num = Math.floor(Math.random() * (1000 - 1 + 1) + 1);

    if (numRepetido[num]) {
      numRepetido[num] += 1;
    } else {
      numRepetido[num] = 1;
    }
  }

  return numRepetido;
};

exports.calculo = calculo;
process.on('message', function (msg) {
  query = Number(process.argv[2]);

  if (msg == 'start') {
    console.log(process.pid, 'calculop');
    console.log('Start calculo');
    var sum = calculo();
    process.send(sum);
  }
});