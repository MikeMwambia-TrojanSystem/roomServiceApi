//Worker Module
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

//Servers
const  servers = require('./loaders/cluster');

//Logger
const Logger = require('./loaders/logger');
const logger = new Logger();

async function initApp (){

  try{
    //Workers
    if (cluster.isMaster) {
      for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
      }
    }else{
      servers();
    }

  }catch(err){
    //Log error
    logger.log('Cluster Init Error','error',err)
  }
}

initApp();
