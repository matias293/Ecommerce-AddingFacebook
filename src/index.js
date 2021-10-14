import cluster from 'cluster';
import os from 'os';
import minimist from 'minimist' 

import { dbConnection } from './db/connection';
import Server from './services/server';

const numCPUs = os.cpus().length;
const argumentos = minimist(process.argv.slice(2))

dbConnection()
.then(result => {
const subproceso = 'CLUSTER' || 'FORK'

  if (subproceso === 'CLUSTER' && cluster.isMaster) {
    console.log(`NUMERO DE CPUS ===> ${numCPUs}`);
    console.log(`PID MASTER ${process.pid}`);
  
    for (let i = 0; i < numCPUs; i++) {     
      cluster.fork();
    }
  
    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} died at ${Date()}`);
      cluster.fork();
    });
  } else {
    /* --------------------------------------------------------------------------- */
    /* WORKERS */
  
  const PORT =   8080
    Server.listen(PORT, () =>
      console.log(
        `Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`
      )
    );
   }
    
  })
  .catch(err => {
    
    console.log(err);
  });

