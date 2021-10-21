
import minimist from 'minimist'
 import dotenv from 'dotenv';
dotenv.config();

import { dbConnection } from './db/connection';
import Server from './services/server';
import logger from './config/logger'

const argumentos = minimist(process.argv.slice(2));
export const PORT = argumentos.puerto || 8080;

dbConnection()
.then(result => {
  Server.listen(PORT, () =>
  logger.info(
    `Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`
  )
);
   
  })
  .catch(err => {
    logger.error(err);
  });

