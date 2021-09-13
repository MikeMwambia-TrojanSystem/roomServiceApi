const config = require('../config').config;
const express = require('express');
const Logger = require('./logger');
const logger = new Logger();
const loaders = require('./index');

module.exports = async function startServer(){
    const app = express();
    await loaders.configLoaders(app).then(async (result)=>{
        if(result === true){

            app.listen(config.port,()=>{
                logger.log('Server Listening on '+config.port,'info','success');
            }).on('error',err=>{
                logger.log('Error','error',err);
                process.exit(1);
            })

        }else{
          logger.log('Express app not started','error',err);
        }
    })
}


