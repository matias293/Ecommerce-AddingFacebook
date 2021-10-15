import cluster from 'cluster';
import os from 'os';
import minimist from 'minimist'
 import dotenv from 'dotenv';
dotenv.config();

import { dbConnection } from './db/connection';
import Server from './services/server';

const argumentos = minimist(process.argv.slice(2));
export const PORT = argumentos.puerto || 8080;

dbConnection()
.then(result => {
  Server.listen(PORT, () =>
  console.log(
    `Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`
  )
);
   
  })
  .catch(err => {
    console.log(err);
  });

